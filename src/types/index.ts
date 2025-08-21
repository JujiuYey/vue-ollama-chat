// 消息接口
export interface Message {
  id: string;
  content: string;
  role: 'user' | 'assistant' | 'system';
  timestamp: number;
}

// 对话接口
export interface Conversation {
  id: string;
  title: string;
  messages: Message[];
  createdAt: number;
  updatedAt: number;
  loading?: boolean;
}

// 应用设置接口
export interface AppSettings {
  ollamaUrl: string;
  selectedModel: string;
  temperature: number;
  maxTokens: number;
  systemPrompt: string;
  autoSave: boolean;
  theme: 'light' | 'dark' | 'system';
}

// API响应接口
export interface OllamaResponse {
  response: string;
  done: boolean;
  context?: number[];
}

// 模型信息接口
export interface ModelInfo {
  name: string;
  size: number;
  digest: string;
  modified_at: string;
}

// API请求接口
export interface OllamaRequest {
  model: string;
  prompt: string;
  stream?: boolean;
  system?: string;
  temperature?: number;
  options?: {
    temperature?: number;
    num_predict?: number;
  };
}

// 模型列表响应接口
export interface ModelsResponse {
  models: ModelInfo[];
}
