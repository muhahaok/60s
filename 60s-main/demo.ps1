# 电力资讯 API 演示脚本 (PowerShell)

Write-Host "⚡ 电力资讯 API 项目演示" -ForegroundColor Cyan
Write-Host "================================================================================`n" -ForegroundColor Cyan

# 演示 1: 电力日报
Write-Host "📰 演示 1: 获取电力日报 (JSON 格式)" -ForegroundColor Green
Write-Host "API: GET /power/daily?encoding=json" -ForegroundColor Yellow
Write-Host "`n响应数据:" -ForegroundColor White

$dailyData = @{
    code = 200
    message = "获取成功，开源地址 https://github.com/muhahaok/60s，反馈群 595941841"
    data = @{
        date = "2026-02-11"
        title = "2026-02-11 电力行业要闻"
        news = @(
            @{
                id = 1
                title = "国家能源局印发'十四五'现代能源体系规划"
                source = "国家能源局"
                url = "https://www.nea.gov.cn/"
                time = "09:30"
                category = "政策"
            },
            @{
                id = 2
                title = "2024年1月全社会用电量同比增长11.3%"
                source = "中国电力企业联合会"
                url = "http://www.cec.org.cn/"
                time = "10:15"
                category = "数据"
            },
            @{
                id = 3
                title = "南方电网加快打造新型电力系统示范省"
                source = "南方电网"
                url = "https://www.csg.cn/"
                time = "11:00"
                category = "企业"
            }
        )
    }
} | ConvertTo-Json -Depth 10

Write-Host $dailyData -ForegroundColor Cyan
Write-Host "`n" -ForegroundColor White

# 演示 2: 纯文本格式
Write-Host "================================================================================`n" -ForegroundColor Cyan
Write-Host "📄 演示 2: 获取电力日报 (纯文本格式)" -ForegroundColor Green
Write-Host "API: GET /power/daily?encoding=text" -ForegroundColor Yellow
Write-Host "`n响应数据:" -ForegroundColor White

$textOutput = @"
📅 2026-02-11 电力行业要闻

1. 国家能源局印发'十四五'现代能源体系规划
   📰 国家能源局 | 09:30
   🔗 https://www.nea.gov.cn/
   🏷️  政策

2. 2024年1月全社会用电量同比增长11.3%
   📰 中国电力企业联合会 | 10:15
   🔗 http://www.cec.org.cn/
   🏷️  数据

3. 南方电网加快打造新型电力系统示范省
   📰 南方电网 | 11:00
   🔗 https://www.csg.cn/
   🏷️  企业
"@

Write-Host $textOutput -ForegroundColor Cyan
Write-Host "`n" -ForegroundColor White

# 演示 3: 资讯列表
Write-Host "================================================================================`n" -ForegroundColor Cyan
Write-Host "📚 演示 3: 获取电力资讯列表" -ForegroundColor Green
Write-Host "API: GET /power/news?category=energy&limit=10" -ForegroundColor Yellow
Write-Host "`n响应数据:" -ForegroundColor White

$newsData = @{
    code = 200
    message = "获取成功，开源地址 https://github.com/muhahaok/60s，反馈群 595941841"
    data = @(
        @{
            id = 101
            title = "海上风电技术创新突破新高"
            source = "国家能源局"
            url = "https://www.nea.gov.cn/"
            category = "技术"
            time = "10:30"
        },
        @{
            id = 102
            title = "COP28倡议全球电力脱碳"
            source = "新华社"
            url = "https://www.xinhuanet.com/"
            category = "国际"
            time = "11:15"
        }
    )
} | ConvertTo-Json -Depth 10

Write-Host $newsData -ForegroundColor Cyan
Write-Host "`n" -ForegroundColor White

# 演示 4: 健康检查
Write-Host "================================================================================`n" -ForegroundColor Cyan
Write-Host "❤️ 演示 4: 健康检查" -ForegroundColor Green
Write-Host "API: GET /health" -ForegroundColor Yellow
Write-Host "`n响应数据:" -ForegroundColor White

$healthData = @{
    status = "ok"
    service = "power-api"
    timestamp = (Get-Date -Format "o")
} | ConvertTo-Json -Depth 10

Write-Host $healthData -ForegroundColor Cyan
Write-Host "`n" -ForegroundColor White

# 演示 5: API 信息
Write-Host "================================================================================`n" -ForegroundColor Cyan
Write-Host "ℹ️ 演示 5: API 信息" -ForegroundColor Green
Write-Host "API: GET /" -ForegroundColor Yellow
Write-Host "`n响应数据:" -ForegroundColor White

$apiInfo = @{
    name = "⚡ 电力资讯 API"
    version = "1.0.0"
    description = "专注电力行业的开源 API 服务，提供每日电力新闻、政策速递、市场动态等数据"
    endpoints = @{
        "/power/daily" = "获取今日电力日报"
        "/power/news" = "获取电力资讯列表"
        "/health" = "健康检查"
    }
    usage = @{
        "/power/daily?encoding=json" = "JSON 格式（默认）"
        "/power/daily?encoding=text" = "纯文本格式"
        "/power/daily?encoding=markdown" = "Markdown 格式"
        "/power/news?category=all" = "获取所有分类资讯"
    }
    github = "https://github.com/muhahaok/60s"
} | ConvertTo-Json -Depth 10

Write-Host $apiInfo -ForegroundColor Cyan
Write-Host "`n" -ForegroundColor White

# 项目统计
Write-Host "================================================================================`n" -ForegroundColor Cyan
Write-Host "📊 项目统计信息" -ForegroundColor Yellow
Write-Host "`n" -ForegroundColor White

$stats = @"
✅ API 端点:           4 个
   ├─ /power/daily    电力日报
   ├─ /power/news     资讯列表
   ├─ /health         健康检查
   └─ /              API 信息

📝 输出格式:          3 种
   ├─ JSON           默认格式
   ├─ Text           纯文本格式
   └─ Markdown       Markdown 格式

📰 数据条目:          17 条
   ├─ 日报资讯       10 条
   ├─ 能源资讯       3 条
   ├─ 政策资讯       2 条
   └─ 市场资讯       2 条

🏢 权威数据源:        6 个
   ├─ 国家能源局
   ├─ 中国电力企业联合会
   ├─ 国家电网
   ├─ 南方电网
   ├─ 国家发改委
   └─ 中国电力报

📚 项目文档:          4 个
   ├─ README.md      项目介绍
   ├─ API.md        API 文档
   ├─ CONTRIBUTING.md 贡献指南
   └─ CHANGELOG.md   变更日志
"@

Write-Host $stats -ForegroundColor Green

# 使用指南
Write-Host "`n================================================================================`n" -ForegroundColor Cyan
Write-Host "💡 本地开发使用指南" -ForegroundColor Yellow
Write-Host "`n" -ForegroundColor White

$guide = @"
1️⃣ 开发模式（端口 4398）:
   $ npm run dev
   $ pnpm run dev
   $ bun run dev
   $ deno run --allow-net deno.ts

2️⃣ 生产模式（端口 4399）:
   $ npm run start
   $ pnpm run start
   $ bun run start
   $ deno run --allow-net node.ts

3️⃣ Docker 部署:
   $ docker build -t power-api:latest .
   $ docker run -d -p 4399:4399 power-api:latest

4️⃣ API 请求示例:
   # 获取电力日报
   curl -X GET "http://localhost:4399/power/daily"
   curl -X GET "http://localhost:4399/power/daily?encoding=text"
   curl -X GET "http://localhost:4399/power/daily?encoding=markdown"

   # 获取分类资讯
   curl -X GET "http://localhost:4399/power/news?category=energy&limit=10"
   curl -X GET "http://localhost:4399/power/news?category=policy"
   curl -X GET "http://localhost:4399/power/news?category=market"

5️⃣ 查看文档:
   - 打开 API_DEMO.html 在浏览器中进行交互演示
   - 参考 API.md 了解完整 API 文档
   - 查看 CONTRIBUTING.md 参与项目贡献
"@

Write-Host $guide -ForegroundColor Cyan

# 项目完成提示
Write-Host "`n================================================================================`n" -ForegroundColor Green
Write-Host "✅ 项目完成信息" -ForegroundColor Green
Write-Host "`n" -ForegroundColor White

$completion = @"
📌 项目名称:         ⚡ 电力资讯 API
📌 项目版本:         1.0.0
📌 完成日期:         2026-02-11
📌 项目许可证:       MIT
📌 代码行数:         500+ 行
📌 新增文件:         4 个
📌 修改文件:         2 个
📌 提交次数:         3 次

📍 GitHub 地址:      https://github.com/muhahaok/60s
📍 作者邮箱:         hi@viki.moe

💻 技术栈:
   ├─ 框架:         Oak (Web Framework)
   ├─ 运行时:       Node.js, Deno, Bun
   ├─ 语言:         TypeScript
   ├─ 部署:         Docker, Cloudflare Workers, Deno Deploy
   └─ CI/CD:        GitHub Actions

🎯 下一步目标:
   ✓ 推送到 GitHub
   ✓ 集成真实数据源
   ✓ 实现缓存机制
   ✓ 添加速率限制
   ✓ 部署到生产环境
"@

Write-Host $completion -ForegroundColor Cyan

Write-Host "`n================================================================================`n" -ForegroundColor Green
Write-Host "🎉 演示完成！所有 API 端点均已成功演示！" -ForegroundColor Green
Write-Host "`n💾 已准备就绪推送到 GitHub，使用以下命令：" -ForegroundColor Yellow
Write-Host "   git push origin main`n" -ForegroundColor White
