import { ref, computed } from 'vue';
import { useAppStore } from '@/stores/app';
import type { AppSettings } from '@/types';
import { toast } from 'vue-sonner';

const DEFAULT_SETTINGS: AppSettings = {
  ollamaUrl: 'http://localhost:11434',
  selectedModel: 'deepseek-r1:8b',
  temperature: 0.7,
  maxTokens: 2048,
  systemPrompt: '你是一个有用的AI助手。',
  autoSave: true,
  theme: 'system',
};

export function useSettings() {
  const store = useAppStore();

  // 响应式数据
  const settings = computed(() => store.settings);
  const defaultSettings = ref(DEFAULT_SETTINGS);

  // 加载设置
  const loadSettings = async () => {
    try {
      const mergedSettings = { ...DEFAULT_SETTINGS };
      store.setSettings(mergedSettings);
      return mergedSettings;
    } catch {
      toast.error('加载设置失败，使用默认设置');
      // 使用默认设置
      store.setSettings(DEFAULT_SETTINGS);
      return DEFAULT_SETTINGS;
    }
  };

  // 保存设置
  const saveSettings = async (newSettings: Partial<AppSettings>) => {
    try {
      const updatedSettings = { ...settings.value, ...newSettings };
      store.setSettings(updatedSettings);
      return updatedSettings;
    } catch (error) {
      toast.error('保存设置失败');
      throw error;
    }
  };

  // 重置设置为默认值
  const resetSettings = async () => {
    try {
      store.setSettings(DEFAULT_SETTINGS);
      toast.success('设置已重置为默认值');
      return DEFAULT_SETTINGS;
    } catch (error) {
      toast.error('重置设置失败');
      throw error;
    }
  };

  // 验证设置
  const validateSettings = (settingsToValidate: Partial<AppSettings>) => {
    const errors: string[] = [];

    // 验证 Ollama URL
    if (settingsToValidate.ollamaUrl) {
      const urlPattern = /^https?:\/\/.+/;
      if (!urlPattern.test(settingsToValidate.ollamaUrl)) {
        errors.push('Ollama 服务器地址格式不正确');
      }
    }

    // 验证温度值
    if (settingsToValidate.temperature !== undefined) {
      if (settingsToValidate.temperature < 0 || settingsToValidate.temperature > 2) {
        errors.push('温度值必须在 0-2 之间');
      }
    }

    // 验证最大令牌数
    if (settingsToValidate.maxTokens !== undefined) {
      if (settingsToValidate.maxTokens < 1 || settingsToValidate.maxTokens > 8192) {
        errors.push('最大令牌数必须在 1-8192 之间');
      }
    }

    return {
      isValid: errors.length === 0,
      errors,
    };
  };

  return {
    settings,
    defaultSettings,
    loadSettings,
    saveSettings,
    updateSettings: saveSettings,
    resetSettings,
    validateSettings,
  };
}
