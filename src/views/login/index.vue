<template>
  <div class="login-container">
    <div class="login-box">
      <div class="login-title" v-if="false">
        <img src="@/assets/logo.png" alt="logo">
        <h2>{{ title }}</h2>
      </div>

      <a-form :model="loginForm" @finish="handleSubmit">
        <a-form-item name="username" :rules="[{ required: true, message: '请输入用户名' }]">
          <a-input v-model:value="loginForm.username" placeholder="用户名" size="large">
            <template #prefix>
              <UserOutlined />
            </template>
          </a-input>
        </a-form-item>

        <a-form-item name="password" :rules="[{ required: true, message: '请输入密码' }]">
          <a-input-password v-model:value="loginForm.password" placeholder="密码" size="large">
            <template #prefix>
              <LockOutlined />
            </template>
          </a-input-password>
        </a-form-item>

        <a-form-item>
          <a-button type="primary" html-type="submit" size="large" :loading="loading" block>
            登录
          </a-button>
        </a-form-item>
      </a-form>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, reactive } from 'vue'
import { useRouter } from 'vue-router'
import { UserOutlined, LockOutlined } from '@ant-design/icons-vue'
import { message } from 'ant-design-vue'
import { useUserStore } from '@/stores/user'
import type { LoginParams } from '@/api/user'
import config from '@/utils/config'

const title = config.title
const router = useRouter()
const userStore = useUserStore()
const loading = ref(false)

const loginForm = reactive<LoginParams>({
  username: '',
  password: ''
})

const handleSubmit = async () => {
  try {
    loading.value = true
    await userStore.login(loginForm)
    await userStore.getUserInfo()
    message.success('登录成功')
    router.push('/')
  } catch (error: any) {
    console.log('错误',error)
  } finally {
    loading.value = false
  }
}
</script>

<style lang="scss" scoped>
.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background: #f0f2f5;

  .login-box {
    width: 368px;
    padding: 24px;
    background: #fff;
    border-radius: 4px;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);

    .login-title {
      text-align: center;
      margin-bottom: 40px;

      img {
        width: 44px;
        height: 44px;
        margin-bottom: 16px;
      }

      h2 {
        font-size: 24px;
        color: rgba(0, 0, 0, 0.85);
        margin: 0;
      }
    }
  }
}
</style>