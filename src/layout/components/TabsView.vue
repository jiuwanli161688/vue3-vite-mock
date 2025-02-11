<template>
  <div class="tabs-view-container">
    <a-tabs
      v-model:activeKey="activeKey"
      type="editable-card"
      :hide-add="true"
      @edit="onEdit"
      @change="onChange"
    >
      <a-tab-pane
        v-for="tab in tabStore.tabs"
        :key="tab.path"
        :tab="tab.title"
        :closable="tabStore.tabs.length > 1"
      />
    </a-tabs>
  </div>
</template>

<script lang="ts" setup>
import { ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useTabStore } from '@/stores/tab'

const route = useRoute()
const router = useRouter()
const tabStore = useTabStore()
const activeKey = ref(route.path)

watch(
  () => route.path,
  (newPath) => {
    activeKey.value = newPath
  }
)

const onChange = (key: string) => {
  router.push(key)
}

const onEdit = (targetKey: string) => {
  tabStore.removeTab(targetKey)
  if (route.path === targetKey) {
    const lastTab = tabStore.tabs[tabStore.tabs.length - 1]
    router.push(lastTab.path)
  }
}
</script>

<style lang="scss" scoped>
.tabs-view-container {
  background: #fff;
  padding: 6px 16px 0;
  
  :deep(.ant-tabs-nav) {
    margin-bottom: 0;
  }
}
</style>