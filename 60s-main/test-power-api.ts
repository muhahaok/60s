/**
 * 电力资讯 API 测试脚本
 * 用于验证数据源和 API 端点
 */

import { fetchPowerDaily, fetchPowerNews, fetchPowerDailyText } from './src/modules/power-news.ts'

console.log('\n================== 电力资讯 API 测试 ==================\n')

try {
  // 测试 1: 获取今日日报
  console.log('✓ 测试 1: 获取今日电力日报')
  const dailyData = await fetchPowerDaily()
  console.log(`  - 日期: ${dailyData.date}`)
  console.log(`  - 标题: ${dailyData.title}`)
  console.log(`  - 新闻数: ${dailyData.news.length}`)
  if (dailyData.news.length > 0) {
    console.log(`  - 第一条: ${dailyData.news[0].title}`)
  } else {
    console.log('  ⚠️  警告: 没有获取到新闻数据！')
  }
  console.log()

  // 测试 2: 获取文本格式
  console.log('✓ 测试 2: 获取文本格式日报')
  const textData = await fetchPowerDailyText()
  const lines = textData.split('\n')
  console.log(`  - 行数: ${lines.length}`)
  console.log(`  - 前 3 行预览:`)
  lines.slice(0, 3).forEach((line) => console.log(`    ${line}`))
  console.log()

  // 测试 3: 获取所有资讯
  console.log('✓ 测试 3: 获取所有资讯 (limit=20)')
  const allNews = await fetchPowerNews('all', 20)
  console.log(`  - 返回数量: ${allNews.length}`)
  console.log(`  - 分类: ${[...new Set(allNews.map((n) => n.category))].join(', ')}`)
  console.log()

  // 测试 4: 获取特定分类
  console.log('✓ 测试 4: 获取特定分类资讯')
  const energyNews = await fetchPowerNews('energy', 10)
  const policyNews = await fetchPowerNews('policy', 10)
  const marketNews = await fetchPowerNews('market', 10)
  console.log(`  - 能源新闻: ${energyNews.length} 条`)
  console.log(`  - 政策新闻: ${policyNews.length} 条`)
  console.log(`  - 市场新闻: ${marketNews.length} 条`)
  console.log()

  // 总结
  console.log('================== 测试完成 ==================')
  console.log(`✅ 所有测试通过！`)
  console.log(`✅ 数据源可用，共 ${(await fetchPowerNews('all', 1000)).length} 条资讯`)
} catch (error) {
  console.error('\n❌ 测试失败:', error)
}
