# API 文档

## 基础 URL

```
http://localhost:4399
```

## 端点列表

### 1. 获取电力日报

**端点**: `GET /power/daily`

**描述**: 获取今日电力行业要闻

**查询参数**:

| 参数 | 类型 | 默认值 | 描述 |
|------|------|--------|------|
| `encoding` | string | `json` | 响应格式：`json`、`text`、`markdown` |

**响应示例**（JSON）:

```json
{
  "code": 200,
  "message": "获取成功，开源地址 https://github.com/vikiboss/60s，反馈群 595941841",
  "data": {
    "date": "2026-02-11",
    "title": "2026-02-11 电力行业要闻",
    "news": [
      {
        "id": 1,
        "title": "国家能源局印发'十四五'现代能源体系规划",
        "source": "国家能源局",
        "url": "https://www.nea.gov.cn/",
        "time": "09:30",
        "category": "政策"
      },
      {
        "id": 2,
        "title": "2024年1月全社会用电量同比增长11.3%",
        "source": "中国电力企业联合会",
        "url": "http://www.cec.org.cn/",
        "time": "10:15",
        "category": "数据"
      }
    ]
  }
}
```

**响应示例**（Text）:

```
📅 2026-02-11 电力行业要闻

1. 国家能源局印发'十四五'现代能源体系规划
   📰 国家能源局 | 09:30
   🔗 https://www.nea.gov.cn/
   🏷️  政策

2. 2024年1月全社会用电量同比增长11.3%
   📰 中国电力企业联合会 | 10:15
   🔗 http://www.cec.org.cn/
   🏷️  数据
```

---

### 2. 获取电力资讯列表

**端点**: `GET /power/news`

**描述**: 获取电力资讯列表，支持分类和数量限制

**查询参数**:

| 参数 | 类型 | 默认值 | 描述 |
|------|------|--------|------|
| `category` | string | `all` | 分类：`all`、`energy`、`policy`、`market` 或具体标签 |
| `limit` | number | `20` | 返回数量限制，最大 50 |
| `encoding` | string | `json` | 响应格式：`json`、`text`、`markdown` |

**分类说明**:

- `all` - 所有资讯（默认）
- `energy` - 能源相关资讯
- `policy` - 政策相关资讯
- `market` - 市场相关资讯
- 或任何具体标签（如 `新能源`、`技术` 等）

**请求示例**:

```bash
# 获取所有分类的资讯（默认 20 条）
curl "http://localhost:4399/power/news"

# 获取能源类资讯（限制 10 条）
curl "http://localhost:4399/power/news?category=energy&limit=10"

# 获取政策类资讯
curl "http://localhost:4399/power/news?category=policy"

# 获取 Markdown 格式的市场资讯
curl "http://localhost:4399/power/news?category=market&encoding=markdown"
```

**响应示例**:

```json
{
  "code": 200,
  "message": "获取成功，开源地址 https://github.com/vikiboss/60s，反馈群 595941841",
  "data": [
    {
      "id": 1,
      "title": "国家能源局印发规划",
      "source": "国家能源局",
      "url": "https://www.nea.gov.cn/",
      "time": "09:30",
      "category": "政策"
    },
    {
      "id": 2,
      "title": "用电量同比增长",
      "source": "中电联",
      "url": "http://www.cec.org.cn/",
      "time": "10:15",
      "category": "数据"
    }
  ]
}
```

---

### 3. 健康检查

**端点**: `GET /health`

**描述**: 检查服务健康状态

**响应示例**:

```json
{
  "status": "ok",
  "service": "power-api",
  "timestamp": "2026-02-11T10:30:00.000Z"
}
```

---

### 4. API 信息

**端点**: `GET /`

**描述**: 获取 API 服务信息和端点列表

**响应示例**:

```json
{
  "name": "⚡ 电力资讯 API",
  "version": "1.0.0",
  "description": "专注电力行业的开源 API 服务...",
  "endpoints": {
    "/power/daily": "获取今日电力日报",
    "/power/news": "获取电力资讯列表",
    "/health": "健康检查"
  },
  "usage": {
    "/power/daily?encoding=json": "JSON 格式（默认）",
    "/power/daily?encoding=text": "纯文本格式",
    "/power/daily?encoding=markdown": "Markdown 格式"
  },
  "github": "https://github.com/vikiboss/60s"
}
```

---

## 常见问题

### Q: 数据是否实时？

A: 当前使用高质量的模拟数据。未来计划集成真实的电力行业数据源。

### Q: 是否有速率限制？

A: 目前没有速率限制。生产环境建议自行配置。

### Q: 支持 JSONP 吗？

A: 不支持。建议使用 CORS。

### Q: 如何获取历史数据？

A: 当前 API 仅提供当日数据。

---

**更新时间**: 2026-02-11

