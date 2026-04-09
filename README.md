# Seal MVP

一个可落地的数字印章 / 品牌章 / 包装章 / invoice stamp 生成器 MVP。

## 技术栈
- Next.js App Router
- TypeScript
- Tailwind CSS
- Prisma + PostgreSQL
- Stripe Checkout
- Sharp / pdf-lib

## 功能
- 模板选择
- 实时编辑
- logo 上传
- 免费预览
- 付费导出 PNG / SVG / PDF
- 邮箱查询历史订单
- Stripe 支付 + Webhook
- 本地 mock 支付兜底

## 运行方式

### 1. 安装依赖
```bash
npm install
```

### 2. 复制环境变量
```bash
cp .env.example .env
```

### 3. 初始化数据库
```bash
npm run db:push
npm run db:seed
```

### 4. 启动开发环境
```bash
npm run dev
```

## 核心页面
- `/` 首页
- `/pricing` 定价页
- `/editor/[templateId]` 编辑器
- `/success?orderId=xxx` 支付成功页
- `/history` 历史订单页

## 支付说明
### Stripe 模式
配置：
- `STRIPE_SECRET_KEY`
- `STRIPE_WEBHOOK_SECRET`
- `NEXT_PUBLIC_APP_URL`

### 开发模式
如果没有 Stripe key，系统会自动走 mock 支付页，便于本地联调。

## Webhook 本地调试
```bash
stripe listen --forward-to localhost:3000/api/stripe/webhook
```

## 上线建议
- 前端 / API：Vercel
- 数据库：Neon 或 Supabase Postgres
- 文件：先走即时生成下载，后续可扩展到 S3 / R2

## 备注
这是一个有意保持轻量的 MVP：
- 没有复杂权限后台
- 没有订阅系统
- 没有团队协作
- 没有 A/B 实验框架

先验证需求与付费，再做第二阶段。
