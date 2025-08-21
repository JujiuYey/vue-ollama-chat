# Vue Ollama Chat

[中文](./README_CN.md) | **English**

A modern, responsive chat application built with Vue 3, TypeScript, and Vite that integrates with Ollama for local AI model interactions. Now available as a cross-platform desktop application powered by Tauri.

## ✨ Features

- 🤖 **Local AI Integration**: Connect to your local Ollama server for private AI conversations
- 💬 **Real-time Streaming**: Experience smooth, real-time message streaming
- 🎨 **Modern UI**: Beautiful, responsive interface built with Tailwind CSS and Reka UI
- 🌙 **Theme Support**: Light, dark, and system theme modes
- 💾 **Persistent Storage**: Conversations and settings are automatically saved
- ⚙️ **Configurable**: Customize model parameters, system prompts, and server settings
- 📱 **Responsive Design**: Works seamlessly on desktop and mobile devices
- 🔧 **TypeScript**: Full type safety and excellent developer experience

## 🖥️ Desktop Application Features

- 🖼️ **Native Desktop Experience**: Cross-platform desktop app built with Tauri
- 🔔 **System Tray**: Minimize to system tray for background operation
- ⚡ **High Performance**: Rust backend + Vue frontend with minimal memory footprint
- 🔒 **Security**: Sandboxed environment with local data processing
- 📦 **Small Bundle Size**: Significantly smaller than Electron alternatives
- 🌐 **Cross-Platform**: Windows, macOS, and Linux support

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ 
- pnpm (recommended) or npm
- [Ollama](https://ollama.ai/) installed and running locally
- Rust 1.77.2+ (for desktop app development)

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd vue-ollama-chat
```

2. Install dependencies:
```bash
pnpm install
```

3. Start the development server:

**Web Development:**
```bash
pnpm dev
```

**Desktop App Development:**
```bash
pnpm tauri:dev
```

4. For web version, open your browser and navigate to `http://localhost:5173`

### Ollama Setup

1. Install Ollama from [https://ollama.ai/](https://ollama.ai/)
2. Start Ollama service (usually runs on `http://localhost:11434`)
3. Pull a model (e.g., `ollama pull llama2`)
4. Configure the application settings to connect to your Ollama server

## 📦 Building and Distribution

### Development Mode
```bash
# Start Tauri development mode
pnpm tauri:dev
```

### Build Desktop Application
```bash
# Build production desktop app
pnpm tauri:build
```

After building, executable files and installers are located at:
- **Windows**: `src-tauri/target/release/bundle/msi/` (MSI installer)
- **Windows**: `src-tauri/target/release/bundle/nsis/` (NSIS installer)
- **macOS**: `src-tauri/target/release/bundle/dmg/` (DMG file)
- **Linux**: `src-tauri/target/release/bundle/deb/` (DEB package)

### System Requirements

**Development Environment:**
- Node.js 18+
- Rust 1.77.2+
- pnpm (recommended)

**Runtime Environment:**
- Windows 10+ / macOS 10.15+ / Linux (mainstream distributions)
- [Ollama](https://ollama.ai/) local service

## 🛠️ Tech Stack

- **Frontend Framework**: Vue 3 with Composition API
- **Language**: TypeScript
- **Build Tool**: Vite
- **Desktop Framework**: Tauri (Rust + WebView)
- **Styling**: Tailwind CSS
- **UI Components**: Reka UI
- **State Management**: Pinia with persistence
- **Routing**: Vue Router
- **Icons**: Lucide Vue Next
- **Markdown**: markdown-it with syntax highlighting
- **Notifications**: Vue Sonner
- **System Integration**: Native system tray, window management

## 📁 Project Structure

src/
├── components/          # Reusable UI components
│   ├── ui/             # Base UI components
│   └── custom-error.vue # Error handling component
├── composables/        # Vue composables
├── services/           # API services (Ollama client)
├── stores/             # Pinia stores
├── types/              # TypeScript type definitions
├── utils/              # Utility functions
└── views/              # Page components
├── chat/           # Chat interface
├── setting/        # Settings page
└── sider/          # Sidebar component


## ⚙️ Configuration

The application can be configured through the settings panel:

- **Ollama Server URL**: Default is `http://localhost:11434`
- **Model Selection**: Choose from available Ollama models
- **Temperature**: Control response creativity (0.0 - 2.0)
- **Max Tokens**: Set maximum response length
- **System Prompt**: Customize AI behavior
- **Theme**: Light, dark, or system preference

## 🔧 Available Scripts

```bash
# Development
pnpm dev          # Start development server
pnpm build        # Build for production
pnpm preview      # Preview production build

# Code Quality
pnpm lint:eslint  # Lint TypeScript and Vue files
pnpm lint:ui      # Lint UI components
```

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🙏 Acknowledgments

- [Ollama](https://ollama.ai/) for providing the local AI model infrastructure
- [Vue.js](https://vuejs.org/) team for the amazing framework
- [Reka UI](https://reka-ui.com/) for the beautiful UI components
- [Tailwind CSS](https://tailwindcss.com/) for the utility-first CSS framework