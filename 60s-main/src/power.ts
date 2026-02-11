/**
 * 电力资讯服务主模块
 * 这个文件用于向后兼容，实际实现在 modules/power-news.ts 中
 */

export { fetchPowerDaily, fetchPowerNews, fetchPowerDailyText } from './modules/power-news.ts'

export type { PowerDaily, PowerNewsItem } from './modules/power-news.ts'

// 不再使用，请使用模块中的导出
export const deprecatedNote =
  '此文件已弃用，请使用 modules/power-news.ts 中的导出。电力资讯模块见 modules/power.module.ts'
