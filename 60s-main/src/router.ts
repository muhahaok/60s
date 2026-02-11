import { Router } from '../deps.ts'

import { servicePower } from './modules/power.module.ts'

const rootRouter = new Router()
const appRouter = new Router()

// ============ 电力资讯 API ============

// 电力日报
appRouter.get('/power/daily', servicePower.handleDaily())

// 电力资讯列表
appRouter.get('/power/news', servicePower.handleNews())

// ============ 健康检查和元信息 ============

// 健康检查
rootRouter.get('/health', (ctx) => {
  ctx.response.body = {
    status: 'ok',
    service: 'power-api',
    timestamp: new Date().toISOString(),
  }
})

// API 信息
rootRouter.get('/', (ctx) => {
  ctx.response.body = {
    name: '⚡ 电力资讯 API',
    version: '1.0.0',
    description: '专注电力行业的开源 API 服务，提供每日电力新闻、政策速递、市场动态等数据',
    endpoints: {
      '/power/daily': '获取今日电力日报',
      '/power/news': '获取电力资讯列表',
      '/health': '健康检查',
    },
    usage: {
      '/power/daily?encoding=json': 'JSON 格式（默认）',
      '/power/daily?encoding=text': '纯文本格式',
      '/power/daily?encoding=markdown': 'Markdown 格式',
      '/power/news?category=all&limit=20': '获取所有分类资讯',
      '/power/news?category=energy': '获取能源资讯',
      '/power/news?category=policy': '获取政策资讯',
      '/power/news?category=market': '获取市场资讯',
    },
    github: 'https://github.com/vikiboss/60s',
  }
})

export { rootRouter, appRouter }