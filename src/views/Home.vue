<script lang="ts" setup>
import { ref } from 'vue';
import AppSidebar from './sider/index.vue';
import Setting from './setting/index.vue';
import { useAppStore } from '@/stores/app';
import Chat from './chat/index.vue';

const appStore = useAppStore();
const isOllamaConfigured = computed(() => {
  return appStore.settings.ollamaUrl && appStore.settings.selectedModel;
});

const settingOpen = ref(false);
function handleSettingOpen(value: boolean) {
  settingOpen.value = value;
}
</script>

<template>
  <SidebarProvider>
    <div class="w-full flex h-screen">
      <AppSidebar @open-setting="handleSettingOpen" />

      <div v-if="!isOllamaConfigured" class="flex-1 flex items-center justify-center">
        <div class="text-center">
          <h2 class="text-xl font-semibold mb-2">
            配置 Ollama
          </h2>
          <p class="text-muted-foreground mb-4">
            请先在设置中配置 Ollama 服务器地址和模型
          </p>
          <Button @click="handleSettingOpen(true)">
            打开设置
          </Button>
        </div>
      </div>

      <Chat v-else />
    </div>

    <Setting :open="settingOpen" @update:open="handleSettingOpen" />
  </SidebarProvider>
</template>
