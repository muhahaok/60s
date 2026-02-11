# 🔧 电力资讯 API 故障排除指南

## 问题: 获取不了电力行业资讯

如果您遇到无法获取电力行业资讯的问题，请按照以下步骤进行诊断。

---

## ✅ 快速诊断清单

### 1️⃣ 服务器是否正在运行？

```bash
# 尝试启动服务器
npm run start

# 或者使用 Deno
deno run -A node.ts

# 或者使用 Bun
bun run start
```

**预期输出:**
```
service is running at http://localhost:4399
```

✅ **绿色信号**: 看到"service is running"消息
❌ **红色信号**: 命令失败或无法启动

---

### 2️⃣ API 端点是否可访问？

在浏览器中访问或使用 curl:

```bash
# 测试健康检查端点
curl http://localhost:4399/health

# 测试 API 信息端点
curl http://localhost:4399/

# 测试电力数据端点
curl http://localhost:4399/power/daily
```

**预期响应** (JSON 格式):
```json
{
  "code": 200,
  "message": "获取成功,开源地址 https://github.com/vikiboss/60s,反馈群 595941841",
  "data": {
    "date": "2026-02-11",
    "title": "2026-02-11 电力行业要闻",
    "news": [
      {
        "id": 1,
        "title": "国家能源局印发\"十四五\"现代能源体系规划",
        "source": "国家能源局",
        "url": "https://www.nea.gov.cn/",
        "category": "政策",
        "time": "09:30"
      }
      // ... 更多新闻项
    ]
  }
}
```

---

## 🔍 常见问题诊断

### 问题 1: "无法连接" / "连接被拒绝"

**原因**: 服务器未运行或端口不正确

**解决方案**:
1. 确认在项目目录中:
   ```bash
   cd d:\Fwork\Git\60s-main\60s-main
   ```

2. 启动服务器:
   ```bash
   npm run start
   ```

3. 等待看到: `service is running at http://localhost:4399`

4. 在浏览器中访问: http://localhost:4399

---

### 问题 2: "获取到响应但数据为空"

**可能原因**: 
- 数据源未正确加载
- 模块导入有问题
- 函数返回空数组

**诊断步骤**:

1. 检查数据源定义:
   ```bash
   cat src/modules/power-news.ts | grep -A 5 "const powerDataSources"
   ```

2. 查看数据源是否有内容:
   ```bash
   # 使用 Deno 运行诊断脚本
   deno run diagnose-power-api.ts
   ```

3. 验证 API 响应:
   ```bash
   curl http://localhost:4399/power/daily | jq '.data.news | length'
   # 应该显示数字 17 或更多
   ```

---

### 问题 3: "TypeScript 或模块错误"

**错误信息示例**:
```
error: Failed to load import map
Cannot find module 'xyz'
```

**解决方案**:

1. 检查依赖是否已安装:
   ```bash
   npm install
   # 或
   pnpm install
   ```

2. 验证 TypeScript 配置:
   ```bash
   cat tsconfig.json
   ```

3. 清除缓存后重试:
   ```bash
   rm -rf .deno_dir  # 如果使用 Deno
   npm install --force  # 如果使用 npm
   ```

---

### 问题 4: "CORS 错误" (在浏览器中)

**错误信息**:
```
Access to XMLHttpRequest has been blocked by CORS policy
```

**解决方案**:
1. CORS 中间件应该已启用，检查:
   ```bash
   cat src/app.ts | grep -i cors
   ```

2. 确保使用正确的 URL (不是 localhost 而是 127.0.0.1 等)

3. 如果问题持续，检查 CORS 中间件配置:
   ```bash
   cat src/middlewares/cors.ts
   ```

---

## 📋 数据源验证

### 检查数据是否存在

```typescript
// 在 power-news.ts 中查看数据源结构
const powerDataSources = {
  daily: [
    // 应该有 10 条新闻
  ],
  energy_news: [
    // 应该有 3 条新闻
  ],
  policy_news: [
    // 应该有 2 条新闻
  ],
  market_news: [
    // 应该有 2 条新闻
  ]
}
```

**总计**: 应该至少有 17 条新闻项

### 验证字段结构

每条新闻应该包含:
- ✅ `id` (数字)
- ✅ `title` (字符串)
- ✅ `source` (字符串)
- ✅ `url` (字符串)
- ✅ `category` (字符串)
- ✅ `time` (字符串)

---

## 🧪 测试 API 响应

### 使用 PowerShell 测试

```powershell
# 测试 /power/daily
$response = Invoke-WebRequest -Uri "http://localhost:4399/power/daily" -UseBasicParsing
$response.Content | ConvertFrom-Json | Format-Table

# 测试 /power/news
$response = Invoke-WebRequest -Uri "http://localhost:4399/power/news?category=all" -UseBasicParsing
($response.Content | ConvertFrom-Json).data | Format-Table
```

### 使用 Node.js 测试

```javascript
// test-api.js
async function testAPI() {
  try {
    const response = await fetch('http://localhost:4399/power/daily')
    const data = await response.json()
    console.log('✅ 成功获取数据')
    console.log(`📊 新闻数: ${data.data.news.length}`)
    console.log('📝 第一条新闻:', data.data.news[0])
  } catch (error) {
    console.error('❌ 失败:', error.message)
  }
}

testAPI()
```

运行:
```bash
node test-api.js
```

---

## 🎯 分类查询测试

测试各个分类是否都有数据:

```bash
# 能源资讯
curl http://localhost:4399/power/news?category=energy

# 政策资讯
curl http://localhost:4399/power/news?category=policy

# 市场资讯
curl http://localhost:4399/power/news?category=market

# 所有资讯
curl http://localhost:4399/power/news?category=all

# 按标签过滤
curl http://localhost:4399/power/news?category=%E6%96%B0%E8%83%BD%E6%BA%90  # 新能源
```

---

## 📱 格式转换测试

API 支持 3 种输出格式:

```bash
# JSON 格式 (默认)
curl http://localhost:4399/power/daily?encoding=json

# 纯文本格式
curl http://localhost:4399/power/daily?encoding=text

# Markdown 格式
curl http://localhost:4399/power/daily?encoding=markdown
```

---

## 🐛 调试模式

启用调试模式查看更多信息:

```bash
# 使用调试模式启动
DEBUG=1 npm run start

# 或
DEBUG=1 deno run -A node.ts
```

调试响应会包含额外的 `__debug__` 字段，显示:
- API 版本
- 执行时间
- 请求信息
- 环境信息

---

## 📊 完整的诊断步骤

如果上述方法都不工作，请按顺序执行:

### Step 1: 验证环境
```bash
node --version          # 应该是 18+ 或 20+
npm --version           # 应该是 8+
# 或
deno --version          # 应该是 2.0+
```

### Step 2: 验证项目结构
```bash
# 检查关键文件是否存在
ls -la src/modules/power.module.ts
ls -la src/modules/power-news.ts
ls -la src/router.ts
```

### Step 3: 验证依赖
```bash
npm install  # 或 pnpm install

# 检查 @oak/oak 是否安装
npm ls @oak/oak
```

### Step 4: 启动测试服务
```bash
npm run dev  # 或 npm run start

# 如果失败，查看错误信息
```

### Step 5: 测试 API
```bash
curl http://localhost:4399/health

# 如果成功，看到:
# {"status":"ok","service":"power-api","timestamp":"..."}
```

---

## 🆘 仍然无法解决？

请收集以下信息并提交 Issue:

1. **操作系统**: Windows / macOS / Linux
2. **Node.js 版本**: `node --version`
3. **错误日志**: 完整的错误信息
4. **启动命令**: 您使用的启动命令
5. **网络**: 是否在防火墙/代理后面

---

## ✅ 验证成功的标志

当一切工作正常时，您应该能够:

✅ 看到服务器启动消息  
✅ 访问 http://localhost:4399 在浏览器中  
✅ 获取 JSON 响应包含至少 17 条新闻  
✅ 不同分类都有对应的新闻  
✅ 支持 JSON、文本、Markdown 三种格式  
✅ 使用 curl、浏览器、Node.js 都能获取数据  

---

需要帮助? 查看:
- 📖 [API.md](API.md) - 详细 API 文档
- 🔗 [GitHub](https://github.com/muhahaok/60s) - 项目仓库
- 💬 [QQ 群](https://qm.qq.com/q/9e0hNhFfqq) - 技术支持
