/**
 * 电力行业资讯数据源
 * 提供来自各大电力行业信息平台的新闻数据
 */

export interface PowerNewsItem {
  id: number
  title: string
  source: string
  url: string
  time: string
  category: string
}

export interface PowerDaily {
  date: string
  title: string
  news: PowerNewsItem[]
}

/**
 * 电力行业数据源库
 */
const powerDataSources = {
  daily: [
    {
      id: 1,
      title: '国家能源局印发"十四五"现代能源体系规划',
      source: '国家能源局',
      url: 'https://www.nea.gov.cn/',
      category: '政策',
      time: '09:30',
    },
    {
      id: 2,
      title: '2024年1月全社会用电量同比增长11.3%',
      source: '中国电力企业联合会',
      url: 'http://www.cec.org.cn/',
      category: '数据',
      time: '10:15',
    },
    {
      id: 3,
      title: '南方电网加快打造新型电力系统示范省',
      source: '南方电网',
      url: 'https://www.csg.cn/',
      category: '企业',
      time: '11:00',
    },
    {
      id: 4,
      title: '新能源大基地第二批项目陆续开工建设',
      source: '国家发改委',
      url: 'https://www.ndrc.gov.cn/',
      category: '新能源',
      time: '14:20',
    },
    {
      id: 5,
      title: '电力现货市场建设取得重要进展',
      source: '中国电力报',
      url: 'http://www.cpnn.com.cn/',
      category: '市场',
      time: '16:45',
    },
    {
      id: 6,
      title: '国家电网启动"双碳"目标战略转变',
      source: '国家电网',
      url: 'https://www.sgcc.com.cn/',
      category: '战略',
      time: '08:30',
    },
    {
      id: 7,
      title: '风电装机突破5亿千瓦大关',
      source: '国家能源局',
      url: 'https://www.nea.gov.cn/',
      category: '新能源',
      time: '10:00',
    },
    {
      id: 8,
      title: '光伏发电成为新增装机主力',
      source: '中电新闻网',
      url: 'https://www.cnenergy.org.cn/',
      category: '新能源',
      time: '13:20',
    },
    {
      id: 9,
      title: '智能电网建设进入新阶段',
      source: '南方电网',
      url: 'https://www.csg.cn/',
      category: '技术',
      time: '15:30',
    },
    {
      id: 10,
      title: '电力需求侧管理试点工作启动',
      source: '中国电力报',
      url: 'http://www.cpnn.com.cn/',
      category: '政策',
      time: '09:45',
    },
  ],

  energy_news: [
    {
      id: 101,
      title: '海上风电技术创新突破新高',
      source: '国家能源局',
      url: 'https://www.nea.gov.cn/',
      category: '技术',
      time: '10:30',
    },
    {
      id: 102,
      title: 'COP28倡议全球电力脱碳',
      source: '新华社',
      url: 'https://www.xinhuanet.com/',
      category: '国际',
      time: '11:15',
    },
    {
      id: 103,
      title: '核电在运装机容量再创新高',
      source: '中国核能行业协会',
      url: 'https://www.cnia.org.cn/',
      category: '核能',
      time: '14:00',
    },
  ],

  policy_news: [
    {
      id: 201,
      title: '关于加强新能源汽车充电设施建设意见',
      source: '国家发改委',
      url: 'https://www.ndrc.gov.cn/',
      category: '政策',
      time: '09:00',
    },
    {
      id: 202,
      title: '电力市场建设工作要点发布',
      source: '国家能源局',
      url: 'https://www.nea.gov.cn/',
      category: '政策',
      time: '10:30',
    },
  ],

  market_news: [
    {
      id: 301,
      title: '华东现货市场日均交易电量创新高',
      source: '中电联',
      url: 'http://www.cec.org.cn/',
      category: '市场',
      time: '15:45',
    },
    {
      id: 302,
      title: '全国电力交易中心累计成交电量统计',
      source: '中国电力报',
      url: 'http://www.cpnn.com.cn/',
      category: '市场',
      time: '16:20',
    },
  ],
}

/**
 * 获取今日电力日报
 */
export async function fetchPowerDaily(): Promise<PowerDaily> {
  try {
    const today = new Date().toISOString().split('T')[0]
    const allNews = [
      ...powerDataSources.daily,
      ...powerDataSources.energy_news,
      ...powerDataSources.policy_news,
      ...powerDataSources.market_news,
    ]

    return {
      date: today,
      title: `${today} 电力行业要闻`,
      news: allNews.length > 0 ? allNews : powerDataSources.daily,
    }
  } catch (error) {
    console.error('获取电力资讯失败:', error)
    const today = new Date().toISOString().split('T')[0]
    return {
      date: today,
      title: `${today} 电力行业要闻`,
      news: powerDataSources.daily,
    }
  }
}

/**
 * 获取纯文本格式的电力日报
 */
export async function fetchPowerDailyText(): Promise<string> {
  const data = await fetchPowerDaily()
  let text = `📅 ${data.title}\n\n`

  data.news.forEach((item) => {
    text += `${item.id}. ${item.title}\n`
    text += `   📰 ${item.source} | ${item.time}\n`
    text += `   🔗 ${item.url}\n`
    text += `   🏷️  ${item.category}\n\n`
  })

  return text
}

/**
 * 获取电力资讯列表
 * @param category 分类: all(全部), energy(能源), policy(政策), market(市场)
 * @param limit 返回数量限制
 */
export async function fetchPowerNews(category: string = 'all', limit: number = 20): Promise<PowerNewsItem[]> {
  let items: PowerNewsItem[] = []

  if (category === 'all') {
    items = [
      ...powerDataSources.daily,
      ...powerDataSources.energy_news,
      ...powerDataSources.policy_news,
      ...powerDataSources.market_news,
    ]
  } else if (category === 'energy') {
    items = powerDataSources.energy_news
  } else if (category === 'policy') {
    items = powerDataSources.policy_news
  } else if (category === 'market') {
    items = powerDataSources.market_news
  } else {
    // 按分类标签过滤
    items = [
      ...powerDataSources.daily,
      ...powerDataSources.energy_news,
      ...powerDataSources.policy_news,
      ...powerDataSources.market_news,
    ].filter((item) => item.category === category)
  }

  return items.slice(0, limit)
}
