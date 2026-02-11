#  Power API - 电力资讯服务

> 专注电力行业的开源 API 服务，提供每日电力新闻、政策速递、市场动态等数据。

##  功能特性

- **电力日报**: 每日精选电力行业重要新闻
- **资讯分类**: 支持能源、政策、市场等多个分类  
- **多格式支持**: JSON、纯文本和 Markdown 格式
- **开源免费**: MIT 许可证，欢迎 Fork 和贡献

##  API 使用

### 获取电力日报

\\\ash
# JSON 格式（默认）
curl "http://localhost:4399/power/daily"

# 纯文本格式
curl "http://localhost:4399/power/daily?encoding=text"

# Markdown 格式
curl "http://localhost:4399/power/daily?encoding=markdown"
\\\

### 获取分类资讯

\\\ash
curl "http://localhost:4399/power/news?category=all&limit=20"
curl "http://localhost:4399/power/news?category=energy"
curl "http://localhost:4399/power/news?category=policy"
curl "http://localhost:4399/power/news?category=market"
\\\

##  本地开发

### 安装依赖

\\\ash
pnpm install
\\\

### 开发模式

\\\ash
pnpm run dev
\\\

### 生产模式

\\\ash
pnpm run start
\\\

##  Docker 部署

\\\ash
docker run -d --name power-api -p 4399:4399 vikiboss/60s:latest
\\\

##  许可证

MIT License

---

**最后更新**: 2026-02-11
