import { defineStore } from 'pinia';
import { ref } from 'vue';
import type { AppSettings } from '@/types';

const defaultSettings: AppSettings = {
  ollamaUrl: 'http://localhost:11434',
  selectedModel: '',
  temperature: 0.7,
  maxTokens: 2048,
  systemPrompt: '你是一个有用的AI助手。',
  autoSave: true,
  theme: 'system',
};

export const useAppStore = defineStore('app', () => {
  // 状态 (state)
  const settings = ref<AppSettings>(defaultSettings);

  const setSettings = (newSettings: AppSettings) => {
    settings.value = newSettings;
  };

  return {
    // 状态
    settings,
    setSettings,
  };
}, {
  persist: {
    key: 'vue-ollama-chat-app',
    storage: localStorage,
    pick: ['settings'],
  },
});
