<template>
  <a-menu
    v-model:selectedKeys="selectedKeys"
    v-model:openKeys="openKeys"
    mode="inline"
    theme="dark"
  >
    <template v-for="item in routes" :key="item.path">
      <template v-if="!item.meta?.hidden">
        <template v-if="item.children && item.children.length === 1">
          <a-menu-item :key="item.children[0].path" @click="handleClick(item.children[0])">
            <template #icon>
              <component :is="item.children[0].meta?.icon || 'FolderOutlined'" />
            </template>
            <span>{{ item.children[0].meta?.title }}</span>
          </a-menu-item>
        </template>
        
        <template v-else-if="item.children && item.children.length > 1">
          <a-sub-menu :key="item.path">
            <template #icon>
              <component :is="item.meta?.icon || 'FolderOutlined'" />
            </template>
            <template #title>{{ item.meta?.title }}</template>
            
            <template v-for="child in item.children" :key="child.path">
              <a-menu-item 
                v-if="!child.meta?.hidden" 
                :key="child.path"
                @click="handleClick(child)"
              >
                {{ child.meta?.title }}
              </a-menu-item>
            </template>
          </a-sub-menu>
        </template>
      </template>
    </template>
  </a-menu>
</template>

<script lang="ts" setup>
import { ref, computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import * as Icons from '@ant-design/icons-vue'
import { useTabStore } from '@/stores/tab'

const router = useRouter()
const route = useRoute()
const tabStore = useTabStore()

const routes = computed(() => {
  return router.options.routes
})

const selectedKeys = ref<string[]>([route.path])
const openKeys = ref<string[]>([])

const handleClick = (item: any) => {
  router.push(item.path)
  tabStore.addTab({
    path: item.path,
    title: item.meta?.title,
    name: item.name
  })
}
</script>