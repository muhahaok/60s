#!/usr/bin/env node
/**
 * 电力资讯 API 演示脚本
 * 展示各个 API 端点的输出效果
 */

// 模拟数据源
const mockPowerDaily = {
  date: "2026-02-11",
  title: "2026-02-11 电力行业要闻",
  news: [
    {
      id: 1,
      title: "国家能源局印发'十四五'现代能源体系规划",
      source: "国家能源局",
      url: "https://www.nea.gov.cn/",
      time: "09:30",
      category: "政策"
    },
    {
      id: 2,
      title: "2024年1月全社会用电量同比增长11.3%",
      source: "中国电力企业联合会",
      url: "http://www.cec.org.cn/",
      time: "10:15",
      category: "数据"
    },
    {
      id: 3,
      title: "南方电网加快打造新型电力系统示范省",
      source: "南方电网",
      url: "https://www.csg.cn/",
      time: "11:00",
      category: "企业"
    },
    {
      id: 4,
      title: "新能源大基地第二批项目陆续开工建设",
      source: "国家发改委",
      url: "https://www.ndrc.gov.cn/",
      time: "14:20",
      category: "新能源"
    },
    {
      id: 5,
      title: "电力现货市场建设取得重要进展",
      source: "中国电力报",
      url: "http://www.cpnn.com.cn/",
      time: "16:45",
      category: "市场"
    }
  ]
};

const mockPowerNews = [
  {
    id: 101,
    title: "海上风电技术创新突破新高",
    source: "国家能源局",
    url: "https://www.nea.gov.cn/",
    category: "技术",
    time: "10:30"
  },
  {
    id: 102,
    title: "COP28倡议全球电力脱碳",
    source: "新华社",
    url: "https://www.xinhuanet.com/",
    category: "国际",
    time: "11:15"
  },
  {
    id: 103,
    title: "核电在运装机容量再创新高",
    source: "中国核能行业协会",
    url: "https://www.cnia.org.cn/",
    category: "核能",
    time: "14:00"
  }
];

// 颜色输出
const colors = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  dim: '\x1b[2m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  cyan: '\x1b[36m',
  white: '\x1b[37m',
};

function log(color, ...args) {
  console.log(color, ...args, colors.reset);
}

function section(title) {
  console.log('\n');
  log(colors.bright + colors.cyan, '═'.repeat(60));
  log(colors.bright + colors.cyan, `║ ${title.padEnd(56)} ║`);
  log(colors.bright + colors.cyan, '═'.repeat(60));
}

function demoDaily() {
  section('📰 电力日报 (JSON 格式)');
  log(colors.green, '✓ GET /power/daily?encoding=json\n');
  
  const payload = {
    code: 200,
    message: "获取成功，开源地址 https://github.com/muhahaok/60s，反馈群 595941841",
    data: mockPowerDaily
  };
  
  console.log(JSON.stringify(payload, null, 2));
}

function demoDailyText() {
  section('📄 电力日报 (纯文本格式)');
  log(colors.green, '✓ GET /power/daily?encoding=text\n');
  
  let text = `📅 ${mockPowerDaily.title}\n\n`;
  mockPowerDaily.news.forEach((item, idx) => {
    text += `${idx + 1}. ${item.title}\n`;
    text += `   📰 ${item.source} | ${item.time}\n`;
    text += `   🔗 ${item.url}\n`;
    text += `   🏷️  ${item.category}\n\n`;
  });
  
  console.log(text);
}

function demoDailyMarkdown() {
  section('📋 电力日报 (Markdown 格式)');
  log(colors.green, '✓ GET /power/daily?encoding=markdown\n');
  
  let md = `# ⚡ ${mockPowerDaily.title}\n\n`;
  md += `**日期**: ${mockPowerDaily.date}\n\n`;
  mockPowerDaily.news.forEach((item, idx) => {
    md += `### ${idx + 1}. [${item.title}](${item.url})\n\n`;
    md += `**来源**: ${item.source} | **时间**: ${item.time}\n\n`;
    md += `**分类**: ${item.category}\n\n`;
    md += `---\n`;
  });
  
  console.log(md);
}

function demoNews() {
  section('📚 电力资讯列表 (按分类)');
  log(colors.green, '✓ GET /power/news?category=energy&limit=10\n');
  
  const payload = {
    code: 200,
    message: "获取成功，开源地址 https://github.com/muhahaok/60s，反馈群 595941841",
    data: mockPowerNews
  };
  
  console.log(JSON.stringify(payload, null, 2));
}

function demoHealth() {
  section('❤️ 健康检查');
  log(colors.green, '✓ GET /health\n');
  
  const response = {
    status: "ok",
    service: "power-api",
    timestamp: new Date().toISOString()
  };
  
  console.log(JSON.stringify(response, null, 2));
}

function demoApiInfo() {
  section('ℹ️ API 信息');
  log(colors.green, '✓ GET /\n');
  
  const response = {
    name: "⚡ 电力资讯 API",
    version: "1.0.0",
    description: "专注电力行业的开源 API 服务，提供每日电力新闻、政策速递、市场动态等数据",
    endpoints: {
      "/power/daily": "获取今日电力日报",
      "/power/news": "获取电力资讯列表",
      "/health": "健康检查"
    },
    usage: {
      "/power/daily?encoding=json": "JSON 格式（默认）",
      "/power/daily?encoding=text": "纯文本格式",
      "/power/daily?encoding=markdown": "Markdown 格式",
      "/power/news?category=all&limit=20": "获取所有分类资讯"
    },
    github: "https://github.com/muhahaok/60s"
  };
  
  console.log(JSON.stringify(response, null, 2));
}

// 主程序
function main() {
  console.clear();
  
  log(colors.bright + colors.yellow, '⚡ 电力资讯 API 演示脚本');
  log(colors.dim, '作者: GitHub Copilot');
  log(colors.dim, '项目: https://github.com/muhahaok/60s');
  
  demoDaily();
  demoDailyText();
  demoDailyMarkdown();
  demoNews();
  demoHealth();
  demoApiInfo();
  
  section('📊 演示完成');
  log(colors.green, '✓ 所有 API 端点演示已完成！');
  log(colors.bright + colors.blue, '\n💡 使用提示:');
  console.log(`
  1. 本地开发 (端口 4398):
     npm run dev
  
  2. 生产模式 (端口 4399):
     npm run start
  
  3. Docker 部署:
     docker build -t power-api:latest .
     docker run -p 4399:4399 power-api:latest
  
  4. 查看完整文档:
     - README.md: 项目介绍
     - API.md: API 完整文档
     - CONTRIBUTING.md: 贡献指南
  `);
  
  log(colors.bright + colors.green, '\n✅ 项目准备就绪，可以推送到 GitHub！\n');
}

main();
