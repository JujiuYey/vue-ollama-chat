import type { Message, ModelsResponse } from '../types';
import { toast } from 'vue-sonner';

// 默认ollama服务地址
const DEFAULT_OLLAMA_URL = 'http://localhost:11434';

/**
 * Ollama API客户端类
 */
export class OllamaClient {
  private baseUrl: string;

  constructor(baseUrl: string = DEFAULT_OLLAMA_URL) {
    this.baseUrl = baseUrl;
  }

  /**
   * 更新ollama服务地址
   */
  setBaseUrl(url: string) {
    this.baseUrl = url;
  }

  /**
   * 发送消息到ollama模型（流式）
   */
  async generateStreamResponse(
    prompt: string,
    model: string,
    onChunk: (chunk: string) => void,
    systemPrompt?: string,
    options?: { temperature?: number; num_predict?: number },
    onStart?: () => void,
  ): Promise<void> {
    try {
      const requestBody: any = {
        model,
        prompt,
        stream: true,
      };

      if (systemPrompt) {
        requestBody.system = systemPrompt;
      }

      if (options) {
        requestBody.options = options;
      }

      const response = await fetch(`${this.baseUrl}/api/generate`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const reader = response.body?.getReader();
      if (!reader) {
        throw new Error('Failed to get response reader');
      }

      const decoder = new TextDecoder();
      let buffer = '';
      let isFirstChunk = true;

      try {
        while (true) {
          const { done, value } = await reader.read();
          if (done) {
            break;
          }

          buffer += decoder.decode(value, { stream: true });
          const lines = buffer.split('\n');
          buffer = lines.pop() || '';

          for (const line of lines) {
            if (line.trim()) {
              const data = JSON.parse(line);
              if (data.response) {
                // 第一次接收到数据时调用 onStart 回调
                if (isFirstChunk && onStart) {
                  onStart();
                  isFirstChunk = false;
                }
                onChunk(data.response);
              }
            }
          }
        }
      } finally {
        reader.releaseLock();
      }
    } catch (error) {
      toast.error('流式响应处理失败');
      throw error;
    }
  }

  /**
   * 发送消息到ollama模型（聊天模式，流式）
   */
  async chatStreamResponse(
    messages: Message[],
    model: string,
    onChunk: (chunk: string) => void,
    systemPrompt?: string,
    options?: { temperature?: number; num_predict?: number },
    onStart?: () => void,
  ): Promise<void> {
    try {
      const requestBody: any = {
        model,
        messages: messages.map(msg => ({
          role: msg.role,
          content: msg.content,
        })),
        stream: true,
      };

      if (systemPrompt) {
        requestBody.system = systemPrompt;
      }

      if (options) {
        requestBody.options = options;
      }

      const response = await fetch(`${this.baseUrl}/api/chat`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const reader = response.body?.getReader();
      if (!reader) {
        throw new Error('Failed to get response reader');
      }

      const decoder = new TextDecoder();
      let buffer = '';
      let isFirstChunk = true;

      try {
        while (true) {
          const { done, value } = await reader.read();
          if (done) {
            break;
          }

          buffer += decoder.decode(value, { stream: true });
          const lines = buffer.split('\n');
          buffer = lines.pop() || '';

          for (const line of lines) {
            if (line.trim()) {
              const data = JSON.parse(line);
              if (data.message && data.message.content) {
                // 第一次接收到数据时调用 onStart 回调
                if (isFirstChunk && onStart) {
                  onStart();
                  isFirstChunk = false;
                }
                onChunk(data.message.content);
              }
            }
          }
        }
      } finally {
        reader.releaseLock();
      }
    } catch (error) {
      toast.error('聊天流式响应处理失败');
      throw error;
    }
  }

  /**
   * 获取可用模型列表
   */
  async getModels(): Promise<ModelsResponse> {
    try {
      const response = await fetch(`${this.baseUrl}/api/tags`);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return data as ModelsResponse;
    } catch {
      toast.error('获取模型列表失败');
      throw new Error('Failed to fetch models from ollama service.');
    }
  }

  /**
   * 测试ollama服务连接
   */
  async testConnection(): Promise<boolean> {
    try {
      const response = await fetch(`${this.baseUrl}/api/tags`, {
        method: 'GET',
        signal: AbortSignal.timeout(5000),
      });
      return response.ok;
    } catch {
      toast.error('测试Ollama连接失败');
      return false;
    }
  }
}

// 导出默认实例
export const ollamaClient = new OllamaClient();
