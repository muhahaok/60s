#!/usr/bin/env node

/**
 * 电力行业资讯 API - 完整诊断工具
 * 
 * 用途: 诊断数据源和 API 问题，帮助找出"无法获取数据"的原因
 */

import { fetchPowerDaily, fetchPowerNews, fetchPowerDailyText } from './src/modules/power-news.ts'

const VERSION = '1.0.0'

// 颜色输出 (ANSI)
const colors = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  red: '\x1b[31m',
  cyan: '\x1b[36m',
  blue: '\x1b[34m',
}

function log(text, color = 'reset') {
  console.log(`${colors[color] || ''}${text}${colors.reset}`)
}

function section(title) {
  console.log()
  log(`${'='.repeat(60)}`, 'cyan')
  log(`${title}`, 'bright')
  log(`${'='.repeat(60)}`, 'cyan')
  console.log()
}

async function runDiagnostics() {
  section(`⚡ 电力资讯 API 诊断工具 v${VERSION}`)

  try {
    // ========== 第一步: 检查数据源 ==========
    section('第一步: 检查数据源')

    log('🔍 正在检查电力资讯数据源...', 'cyan')
    const dailyData = await fetchPowerDaily()

    if (!dailyData) {
      log('❌ 错误: fetchPowerDaily() 返回空值', 'red')
      return
    }

    log(`✅ 成功获取日报数据`, 'green')
    log(`   📅 日期: ${dailyData.date}`, 'blue')
    log(`   📝 标题: ${dailyData.title}`, 'blue')
    log(`   📊 新闻数: ${dailyData.news.length}`, 'blue')

    if (dailyData.news.length === 0) {
      log(`⚠️  警告: 没有获取到任何新闻数据！`, 'yellow')
      log(`   这是问题的第一个征兆。`, 'yellow')
    } else {
      log(`✅ 数据源包含 ${dailyData.news.length} 条新闻`, 'green')
    }

    console.log()

    // ========== 第二步: 检查数据完整性 ==========
    section('第二步: 检查数据完整性')

    log('🔍 正在检查每条新闻的完整性...', 'cyan')
    let validCount = 0
    let errorCount = 0

    for (let i = 0; i < Math.min(3, dailyData.news.length); i++) {
      const news = dailyData.news[i]
      const hasRequiredFields = news.id && news.title && news.source && news.time && news.category

      if (hasRequiredFields) {
        log(`✅ 新闻 ${i + 1} 完整`, 'green')
        log(`   - ID: ${news.id}`, 'blue')
        log(`   - 标题: ${news.title.substring(0, 40)}...`, 'blue')
        log(`   - 来源: ${news.source}`, 'blue')
        log(`   - 分类: ${news.category}`, 'blue')
        validCount++
      } else {
        log(`❌ 新闻 ${i + 1} 缺少字段`, 'red')
        errorCount++
      }
    }

    console.log()
    log(`检查结果: ${validCount} 条有效，${errorCount} 条无效`, 'blue')

    // ========== 第三步: 检查分类数据 ==========
    section('第三步: 检查分类数据')

    log('🔍 正在检查各分类数据...', 'cyan')

    const categories = ['all', 'energy', 'policy', 'market']
    const categoryResults = {}

    for (const category of categories) {
      const news = await fetchPowerNews(category, 100)
      categoryResults[category] = news.length
      const status = news.length > 0 ? '✅' : '⚠️ '
      const color = news.length > 0 ? 'green' : 'yellow'
      log(`${status} 分类 "${category}": ${news.length} 条新闻`, color)
    }

    console.log()

    // ========== 第四步: 检查文本格式 ==========
    section('第四步: 检查文本格式输出')

    log('🔍 正在检查文本格式...', 'cyan')
    const textOutput = await fetchPowerDailyText()

    if (!textOutput) {
      log('❌ 错误: fetchPowerDailyText() 返回空值', 'red')
    } else if (textOutput.length === 0) {
      log('⚠️  警告: 文本输出为空', 'yellow')
    } else {
      log(`✅ 文本输出正常`, 'green')
      log(`   - 字符数: ${textOutput.length}`, 'blue')
      log(`   - 行数: ${textOutput.split('\n').length}`, 'blue')
      log(`   - 首行预览: ${textOutput.split('\n')[0].substring(0, 50)}...`, 'blue')
    }

    console.log()

    // ========== 第五步: 最终诊断 ==========
    section('第五步: 最终诊断')

    const totalNews = categoryResults['all']
    const allEmpty = totalNews === 0

    if (allEmpty) {
      log('❌ 诊断结果: 无法获取数据', 'red')
      log('', 'red')
      log('可能的原因:', 'yellow')
      log('  1. 数据源定义为空', 'yellow')
      log('  2. 数据加载过程出错', 'yellow')
      log('  3. 模块导入问题', 'yellow')
      log('', 'yellow')
      log('🔧 建议的修复步骤:', 'cyan')
      log('  1. 检查 src/modules/power-news.ts 中的 powerDataSources', 'cyan')
      log('  2. 确保数据源正确定义', 'cyan')
      log('  3. 验证异步函数是否正常工作', 'cyan')
    } else {
      log('✅ 诊断结果: 数据源正常', 'green')
      log(`   - 总共 ${totalNews} 条新闻可用`, 'green')
      log('   - 所有数据源都在工作', 'green')
      log('', 'green')
      log('	如果仍然无法在 API 中看到数据，请检查:', 'cyan')
      log('  1. API 服务器是否正在运行', 'cyan')
      log('  2. 路由是否正确注册', 'cyan')
      log('  3. 响应格式是否正确', 'cyan')
      log('  4. 中间件是否正确处理了请求', 'cyan')
    }

    console.log()
    section('诊断完成')
    log('🎉 如需更多帮助，请查看 API.md 文档', 'cyan')
    console.log()
  } catch (error) {
    log(`❌ 诊断过程中出错: ${error.message}`, 'red')
    console.error(error)
  }
}

// 运行诊断
await runDiagnostics()
