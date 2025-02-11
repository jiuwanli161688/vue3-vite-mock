<template>
  <div class="user-center">
    <a-card :bordered="false">
      <template #title>个人信息</template>
      
      <a-descriptions>
        <a-descriptions-item label="用户名">
          {{ userStore.userInfo.name }}
        </a-descriptions-item>
        <a-descriptions-item label="角色">
          {{ userStore.userInfo.roles?.join(', ') }}
        </a-descriptions-item>
      </a-descriptions>
      
      <a-divider />
      
      <div class="avatar-wrapper">
        <a-avatar
          :size="104"
          :src="userStore.userInfo.avatar"
        />
        <div class="avatar-title">头像</div>
      </div>
    </a-card>
  </div>
</template>

<script lang="ts" setup>
import { useUserStore } from '@/stores/user'

const userStore = useUserStore()
</script>

<style lang="scss" scoped>
.user-center {
  .avatar-wrapper {
    text-align: center;
    margin-top: 24px;
    
    .avatar-title {
      margin-top: 12px;
      color: rgba(0, 0, 0, 0.45);
    }
  }
}
</style>