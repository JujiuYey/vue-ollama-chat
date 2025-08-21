<script setup lang="ts">
import { Plus, Settings } from 'lucide-vue-next';
import ThemeToggle from '@/components/theme/theme-toggle.vue';
import Conversations from './conversations.vue';
import { useConversationsStore } from '@/stores/conversations';

const emit = defineEmits<{
  (e: 'openSetting', value: boolean): void;
}>();

// 只需要获取新建对话的方法
const { clearCurrentConversation } = useConversationsStore();

function handleSettingOpen() {
  emit('openSetting', true);
}

function handleNewConversation() {
  clearCurrentConversation();
}
</script>

<template>
  <Sidebar collapsible="icon">
    <SidebarHeader>
      <div class="flex flex-col gap-2 pb-2 border-b">
        <div className="px-2 flex items-center justify-between">
          <h2 className="text-lg font-semibold">
            AI 对话
          </h2>
          <ThemeToggle />
        </div>

        <Button class="w-full" size="sm" @click="handleNewConversation">
          <Plus class="h-4 w-4 mr-2" />
          新建对话
        </Button>
      </div>
    </SidebarHeader>

    <SidebarContent>
      <!-- 不再需要传递 props 和监听事件 -->
      <Conversations />
    </SidebarContent>

    <SidebarFooter>
      <div class="flex flex-col gap-2 pt-2 border-t">
        <Button variant="outline" class="w-full" size="sm" @click="handleSettingOpen">
          <Settings class="h-4 w-4 mr-2" />
          设置
        </Button>
      </div>
    </SidebarFooter>
  </Sidebar>
</template>
