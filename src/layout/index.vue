<template>
  <a-layout class="layout-container">
    <a-layout-sider 
      v-model:collapsed="collapsed"
      :trigger="null"
      collapsible
      class="layout-sider"
    >
      <div class="logo">
        <img src="@/assets/logo.png" alt="logo">
        <span v-show="!collapsed">{{ title }}</span>
      </div>
      <Menu />
      <!-- menu下载 -->
    </a-layout-sider>
    
    <a-layout>
      <a-layout-header class="layout-header">
        <div class="header-left">
          <menu-unfold-outlined
            v-if="collapsed"
            class="trigger"
            @click="() => (collapsed = !collapsed)"
          />
          <menu-fold-outlined
            v-else
            class="trigger"
            @click="() => (collapsed = !collapsed)"
          />
        </div>
        
        <div class="header-right">
          <a-dropdown>
            <div class="user-info">
              <a-avatar :src="userStore.userInfo.avatar" />
              <span class="username">{{ userStore.userInfo.name }}</span>
            </div>
            <template #overlay>
              <a-menu>
                <a-menu-item key="0" @click="handleUserCenter">
                  <user-outlined />
                  用户中心
                </a-menu-item>
                <a-menu-divider />
                <a-menu-item key="1" @click="handleLogout">
                  <logout-outlined />
                  退出登录
                </a-menu-item>
              </a-menu>
            </template>
          </a-dropdown>
        </div>
      </a-layout-header>
      
      <TabsView />
      
      <a-layout-content class="layout-content">
        <router-view v-slot="{ Component }">
          <transition name="fade-transform" mode="out-in">
            <component :is="Component" />
          </transition>
        </router-view>
      </a-layout-content>
    </a-layout>
  </a-layout>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { MenuFoldOutlined, MenuUnfoldOutlined, UserOutlined, LogoutOutlined } from '@ant-design/icons-vue'
import { useUserStore } from '@/stores/user'
import Menu from './components/Menu.vue'
import TabsView from './components/TabsView.vue'

const title = 'Vue Admin'
const collapsed = ref(false)
const router = useRouter()
const userStore = useUserStore()

const handleUserCenter = () => {
  router.push('/user/center')
}

const handleLogout = async () => {
  await userStore.logout()
  router.push('/login')
}
</script>

<style lang="scss" scoped>
.layout-container {
  height: 100vh;
  
  .layout-sider {
    .logo {
      height: 64px;
      padding: 16px;
      display: flex;
      align-items: center;
      background: #002140;
      
      img {
        width: 32px;
        height: 32px;
      }
      
      span {
        margin-left: 12px;
        color: white;
        font-size: 18px;
        font-weight: 600;
      }
    }
  }
  
  .layout-header {
    background: #fff;
    padding: 0;
    display: flex;
    justify-content: space-between;
    align-items: center;
    box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);
    
    .header-left {
      .trigger {
        font-size: 18px;
        padding: 0 24px;
        cursor: pointer;
        transition: color 0.3s;
        
        &:hover {
          color: #1890ff;
        }
      }
    }
    
    .header-right {
      padding-right: 24px;
      
      .user-info {
        cursor: pointer;
        display: flex;
        align-items: center;
        
        .username {
          margin-left: 8px;
        }
      }
    }
  }
  
  .layout-content {
    margin: 24px;
    padding: 24px;
    background: #fff;
    min-height: 280px;
  }
}

.fade-transform-enter-active,
.fade-transform-leave-active {
  transition: all 0.5s;
}

.fade-transform-enter-from {
  opacity: 0;
  transform: translateX(-30px);
}

.fade-transform-leave-to {
  opacity: 0;
  transform: translateX(30px);
}
</style>