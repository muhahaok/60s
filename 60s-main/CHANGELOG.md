# 变更日志

所有明显的项目变更都将记录在此文件中。

## [1.0.0] - 2026-02-11

### 新增

- ✨ 完整的电力资讯获取模块
- 📰 电力日报 API 端点 (`/power/daily`)
- 📚 电力资讯列表 API 端点 (`/power/news`)
- 🏷️ 按分类过滤资讯功能（能源、政策、市场等）
- 📝 多格式支持：JSON、纯文本、Markdown
- 🔍 健康检查端点 (`/health`)
- 📋 完整的 API 文档和使用示例
- 🐳 Docker 部署支持
- 🔄 GitHub Actions CI/CD 工作流

### 改进

- 📖 更新 README 文档
- 🏗️ 标准化项目模块结构
- 📝 添加开发者指南 (CONTRIBUTING.md)
- 🔧 配置 GitHub Actions 自动化测试

### 相关资讯数据源

- 国家能源局
- 中国电力企业联合会
- 国家电网
- 南方电网
- 国家发改委
- 中国电力报

---

### 使用示例

#### 获取电力日报

```bash
curl "http://localhost:4399/power/daily"
curl "http://localhost:4399/power/daily?encoding=text"
curl "http://localhost:4399/power/daily?encoding=markdown"
```

#### 获取分类资讯

```bash
curl "http://localhost:4399/power/news?category=all"
curl "http://localhost:4399/power/news?category=energy&limit=10"
```

---

**完整变更**: 查看 [提交日志](https://github.com/vikiboss/60s/commits)

