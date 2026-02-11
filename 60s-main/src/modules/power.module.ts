import { Common } from '../common.ts'
import { fetchPowerDaily, fetchPowerDailyText, fetchPowerNews } from './power-news.ts'

import type { RouterMiddleware } from '@oak/oak'

class ServicePower {
  handleDaily(): RouterMiddleware<'/power/daily'> {
    return async (ctx) => {
      const data = await fetchPowerDaily()

      switch (ctx.state.encoding) {
        case 'text':
          ctx.response.body = await fetchPowerDailyText()
          break

        case 'markdown':
          ctx.response.body = this.#formatMarkdown(data)
          break

        case 'json':
        default:
          ctx.response.body = Common.buildJson(data)
          break
      }
    }
  }

  handleNews(): RouterMiddleware<'/power/news'> {
    return async (ctx) => {
      const category = ctx.request.url.searchParams.get('category') || 'all'
      const limit = Math.min(parseInt(ctx.request.url.searchParams.get('limit') || '20', 10), 50)

      const data = await fetchPowerNews(category, limit)

      switch (ctx.state.encoding) {
        case 'text':
          ctx.response.body = `电力行业资讯 (${category})\n\n${data
            .map((e, idx) => `${idx + 1}. ${e.title}\n   📰 ${e.source} | ${e.time}\n`)
            .join('\n')}`
          break

        case 'markdown':
          ctx.response.body = `# 电力行业资讯${category !== 'all' ? ` - ${category}` : ''}\n\n${data
            .map(
              (e, idx) =>
                `### ${idx + 1}. [${e.title}](${e.url})\n\n**来源**: ${e.source} | **时间**: ${e.time}\n\n**分类**: ${e.category}\n\n---\n`,
            )
            .join('\n')}`
          break

        case 'json':
        default:
          ctx.response.body = Common.buildJson(data)
          break
      }
    }
  }

  #formatMarkdown(data: ReturnType<typeof fetchPowerDaily>) {
    return `# ⚡ ${data.title}\n\n**日期**: ${data.date}\n\n${data.news
      .map(
        (e, idx) =>
          `### ${idx + 1}. [${e.title}](${e.url})\n\n**来源**: ${e.source} | **时间**: ${e.time}\n\n---\n`,
      )
      .join('\n')}`
  }
}

export const servicePower = new ServicePower()
