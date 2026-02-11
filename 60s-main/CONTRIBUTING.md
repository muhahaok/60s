# 贡献指南

## 欢迎贡献！

感谢你有兴趣为电力资讯 API 项目做出贡献。以下是一些准则和说明。

## 贡献方式

### 1. 报告 Bug

如果你发现了 Bug，请：

1. 检查 [Issues](https://github.com/vikiboss/60s/issues) 中是否已有报告
2. 如果没有，请创建新的 Issue，并包括：
   - 清晰的标题和描述
   - 重现 Bug 的步骤
   - 预期行为和实际行为
   - 你的环境信息（OS、Node.js 版本等）

### 2. 功能建议

有新功能的想法？

1. 检查 [Discussions](https://github.com/vikiboss/60s/discussions) 或 Issues
2. 创建新的 Issue，描述：
   - 功能的用途
   - 预期的行为和 API
   - 可能的实现方式

### 3. 代码贡献

#### 准备工作

```bash
# Fork 项目
# Clone 你的 Fork
git clone https://github.com/YOUR_USERNAME/60s.git
cd 60s

# 添加 upstream
git remote add upstream https://github.com/vikiboss/60s.git

# 安装依赖
pnpm install
```

#### 开发流程

1. **创建特性分支**

```bash
git checkout -b feature/your-feature-name
```

2. **进行更改**

遵循以下规则：
- 使用 TypeScript
- 遵循项目的代码风格（参考现有模块）
- 为新功能添加注释
- 更新相关文档

3. **测试你的更改**

```bash
# 开发模式
pnpm run dev

# 验证代码格式
pnpm run format
```

4. **提交更改**

```bash
git add .
git commit -m "feat: 添加新功能描述"
```

提交消息格式：
- `feat:` 新功能
- `fix:` Bug 修复
- `docs:` 文档更新
- `style:` 代码格式（不影响代码含义）
- `refactor:` 代码重构
- `test:` 测试相关
- `chore:` 构建、依赖等变更

5. **推送到你的 Fork**

```bash
git push origin feature/your-feature-name
```

6. **创建 Pull Request**

- 推送后，GitHub 会提示创建 PR
- 提供清晰的标题和描述
- 关联相关的 Issue（使用 `#123` 格式）
- 等待审核

## 代码规范

### 模块开发

创建新模块时，参考 [src/modules/power.module.ts](./src/modules/power.module.ts)：

```typescript
import { Common } from '../common.ts'
import type { RouterMiddleware } from '@oak/oak'

class ServiceName {
  handle(): RouterMiddleware<'/path'> {
    return async (ctx) => {
      const data = await this.#fetch()
      
      switch (ctx.state.encoding) {
        case 'text':
          ctx.response.body = `text format`
          break
        case 'markdown':
          ctx.response.body = `# markdown format`
          break
        case 'json':
        default:
          ctx.response.body = Common.buildJson(data)
          break
      }
    }
  }
  
  async #fetch() {
    // 获取数据
    return []
  }
}

export const serviceName = new ServiceName()
```

### 路由注册

在 `src/router.ts` 中：

```typescript
appRouter.get('/path', serviceName.handle())
```

## 文档规范

- 使用 Markdown 格式
- 中文文档使用简体中文
- 包含代码示例
- 保持格式一致

## 许可证

通过贡献，你同意你的代码将按照 MIT 许可证发布。

## 需要帮助？

- 提出 Issue 或 Discussion
- 联系维护者：hi@viki.moe

---

感谢你的贡献！🎉

