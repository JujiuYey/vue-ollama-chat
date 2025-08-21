# Vue Ollama Chat

**中文** | [English](./README.md)

一个基于 Vue 3、TypeScript 和 Vite 构建的现代化响应式聊天应用，集成 Ollama 实现本地 AI 模型交互。现已支持基于 Tauri 的跨平台桌面应用。

## ✨ 特性

- 🤖 **本地 AI 集成**: 连接本地 Ollama 服务器进行私密 AI 对话
- 💬 **实时流式传输**: 体验流畅的实时消息流传输
- 🎨 **现代化界面**: 使用 Tailwind CSS 和 Reka UI 构建的美观响应式界面
- 🌙 **主题支持**: 支持浅色、深色和系统主题模式
- 💾 **持久化存储**: 对话和设置自动保存
- ⚙️ **可配置**: 自定义模型参数、系统提示和服务器设置
- 📱 **响应式设计**: 在桌面和移动设备上无缝工作
- 🔧 **TypeScript**: 完整的类型安全和优秀的开发体验

## 🖥️ 桌面应用特性

- 🖼️ **原生桌面体验**: 基于 Tauri 构建的跨平台桌面应用
- 🔔 **系统托盘**: 最小化到系统托盘，后台运行
- ⚡ **高性能**: Rust 后端 + Vue 前端，内存占用小
- 🔒 **安全性**: 沙盒环境，本地数据处理
- 📦 **小体积**: 相比 Electron 应用体积更小
- 🌐 **跨平台**: 支持 Windows、macOS 和 Linux

## 🚀 快速开始

### 前置要求

- Node.js 18+ 
- pnpm (推荐) 或 npm
- 已安装并运行的 [Ollama](https://ollama.ai/)
- Rust 1.77.2+ (桌面应用开发需要)

### 安装

1. 克隆仓库:
```bash
git clone <repository-url>
cd vue-ollama-chat
```

2. 安装依赖:
```bash
pnpm install
```

3. 启动开发服务器:

**Web 开发:**
```bash
pnpm dev
```

**桌面应用开发:**
```bash
pnpm tauri:dev
```

4. Web 版本请打开浏览器访问 `http://localhost:5173`

### Ollama 设置

1. 从 [https://ollama.ai/](https://ollama.ai/) 安装 Ollama
2. 启动 Ollama 服务 (通常运行在 `http://localhost:11434`)
3. 拉取模型 (例如: `ollama pull llama2`)
4. 在应用设置中配置连接到你的 Ollama 服务器

## 📦 构建和分发

### 开发模式
```bash
# 启动 Tauri 开发模式
pnpm tauri:dev
```

### 构建桌面应用
```bash
# 构建生产版本桌面应用
pnpm tauri:build
```

构建完成后，可执行文件和安装包位于：
- **Windows**: `src-tauri/target/release/bundle/msi/` (MSI 安装包)
- **Windows**: `src-tauri/target/release/bundle/nsis/` (NSIS 安装程序)
- **macOS**: `src-tauri/target/release/bundle/dmg/` (DMG 文件)
- **Linux**: `src-tauri/target/release/bundle/deb/` (DEB 包)

### 系统要求

**开发环境:**
- Node.js 18+
- Rust 1.77.2+
- pnpm (推荐)

**运行环境:**
- Windows 10+ / macOS 10.15+ / Linux (主流发行版)
- [Ollama](https://ollama.ai/) 本地服务

## 🛠️ 技术栈

- **前端框架**: Vue 3 with Composition API
- **开发语言**: TypeScript
- **构建工具**: Vite
- **桌面框架**: Tauri (Rust + WebView)
- **样式框架**: Tailwind CSS
- **UI 组件**: Reka UI
- **状态管理**: Pinia with persistence
- **路由**: Vue Router
- **图标**: Lucide Vue Next
- **Markdown**: markdown-it with syntax highlighting
- **通知**: Vue Sonner
- **系统集成**: 原生系统托盘、窗口管理

## 📁 项目结构

src/
├── components/          # 可复用 UI 组件
│   ├── ui/             # 基础 UI 组件
│   └── custom-error.vue # 错误处理组件
├── composables/        # Vue 组合式函数
├── services/           # API 服务 (Ollama 客户端)
├── stores/             # Pinia 状态管理
├── types/              # TypeScript 类型定义
├── utils/              # 工具函数
└── views/              # 页面组件
├── chat/           # 聊天界面
├── setting/        # 设置页面
└── sider/          # 侧边栏组件


## ⚙️ 配置

应用可以通过设置面板进行配置:

- **Ollama 服务器 URL**: 默认为 `http://localhost:11434`
- **模型选择**: 从可用的 Ollama 模型中选择
- **温度**: 控制响应创造性 (0.0 - 2.0)
- **最大令牌数**: 设置最大响应长度
- **系统提示**: 自定义 AI 行为
- **主题**: 浅色、深色或系统偏好

## 🔧 可用脚本

```bash
# 开发
pnpm dev          # 启动开发服务器
pnpm build        # 构建生产版本
pnpm preview      # 预览生产构建

# 代码质量
pnpm lint:eslint  # 检查 TypeScript 和 Vue 文件
pnpm lint:ui      # 检查 UI 组件
```

## 🤝 贡献

1. Fork 仓库
2. 创建你的功能分支 (`git checkout -b feature/amazing-feature`)
3. 提交你的更改 (`git commit -m 'Add some amazing feature'`)
4. 推送到分支 (`git push origin feature/amazing-feature`)
5. 打开一个 Pull Request

## 📄 许可证

此项目是开源的，遵循 [MIT 许可证](LICENSE)。

## 🙏 致谢

- [Ollama](https://ollama.ai/) 提供本地 AI 模型基础设施
- [Vue.js](https://vuejs.org/) 团队提供出色的框架
- [Reka UI](https://reka-ui.com/) 提供美观的 UI 组件
- [Tailwind CSS](https://tailwindcss.com/) 提供实用优先的 CSS 框架