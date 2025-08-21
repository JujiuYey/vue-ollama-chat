<script setup lang="ts">
import MessageInput from './message-input.vue';
import MessageList from './message-list.vue';
import { toast } from 'vue-sonner';
import { useConversationsStore } from '@/stores/conversations';
import { useAppStore } from '@/stores/app';
import { ollamaClient } from '@/services/ollama';
import { nanoid } from 'nanoid';

const settings = computed(() => {
  return useAppStore().settings;
});

const isLoading = ref(false);
const isStreaming = ref(false);
const abortController = shallowRef<AbortController | null>(null);
const streamingContent = ref('');

// 处理消息发送
async function handleSendMessage(message: string) {
  if (!message.trim() || isLoading.value) {
    return;
  }

  const { currentConversation, createConversation, createUserMessage, addPlaceholderMessage, updateMessageById } = useConversationsStore();
  if (!currentConversation) {
    createConversation();
  }

  // 添加用户消息
  createUserMessage(message);

  // 添加占位的assistant消息并获取ID
  const assistantMessageId = addPlaceholderMessage('assistant', '');

  // 初始化发送状态
  abortController.value = new AbortController();
  isLoading.value = true;
  isStreaming.value = false;
  streamingContent.value = '';

  try {
    const requestOptions = {
      temperature: settings.value.temperature,
      // eslint-disable-next-line camelcase
      num_predict: settings.value.maxTokens,
    };

    // 判断是否有历史消息来决定使用哪个API
    const hasMessages = currentConversation && currentConversation?.messages.length > 1;

    if (hasMessages) {
      // 有历史消息，使用chat API
      await ollamaClient.chatStreamResponse(
        [
          {
            id: nanoid(),
            role: 'system',
            content: settings.value.systemPrompt,
            timestamp: Date.now(),
          },
          ...currentConversation.messages,
        ],
        settings.value.selectedModel,
        chunk => {
          if (abortController.value?.signal.aborted) {
            return;
          }

          streamingContent.value += chunk;
          // 实时更新对话历史中的消息
          if (assistantMessageId) {
            updateMessageById(assistantMessageId, streamingContent.value);
          }
        },
        settings.value.systemPrompt,
        requestOptions,
        () => {
          isLoading.value = false;
          isStreaming.value = true;
        },
      );
    } else {
      // 没有历史消息，使用generate API
      await ollamaClient.generateStreamResponse(
        message,
        settings.value.selectedModel,
        chunk => {
          if (abortController.value?.signal.aborted) {
            return;
          }

          streamingContent.value += chunk;
          // 实时更新对话历史中的消息
          if (assistantMessageId) {
            updateMessageById(assistantMessageId, streamingContent.value);
          }
        },
        settings.value.systemPrompt,
        requestOptions,
        () => {
          isLoading.value = false;
          isStreaming.value = true;
        },
      );
    }

    // 流式响应完成，确保最终内容已保存
    if (assistantMessageId && streamingContent.value) {
      updateMessageById(assistantMessageId, streamingContent.value);
    }
  } catch {
    toast.error('发送消息失败，请重试');
    // 如果有部分内容，保存它
    if (assistantMessageId && streamingContent.value.trim()) {
      updateMessageById(assistantMessageId, streamingContent.value);
    }
  } finally {
    isLoading.value = false;
    isStreaming.value = false;
    streamingContent.value = '';
    abortController.value = null;
  }
}

// 处理停止生成
function handleStopGeneration() {
  abortController.value?.abort();
  abortController.value = null;
  isLoading.value = false;
}
</script>

<template>
  <div class="flex-1 flex flex-col min-w-0 h-full">
    <div class="flex-1 overflow-y-auto">
      <MessageList
        :is-loading="isLoading"
        :is-streaming="isStreaming"
        :streaming-content="streamingContent"
      />
    </div>

    <div class="flex-shrink-0">
      <MessageInput
        :is-loading="isLoading"
        :is-streaming="isStreaming"
        :disabled="isLoading"
        @send-message="handleSendMessage"
        @stop-generation="handleStopGeneration"
      />
    </div>
  </div>
</template>
