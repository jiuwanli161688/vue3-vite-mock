import axios from 'axios'
import type { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios'
import { message } from 'ant-design-vue'
import { getToken } from '@/utils/auth'
import { useUserStore } from '@/stores/user'

const service: AxiosInstance = axios.create({
  // baseURL: "https://xxxxxxxx.com/", // 已在 vite.config.js 中配置
  timeout: 5000,
  headers: {
    "Content-Type": "application/json;charset=UTF-8",
  },
})

service.interceptors.request.use(
  (config: AxiosRequestConfig) => {
    const token = getToken()
    console.log(import.meta.env.VITE_API_BASE_URL,"进入封装的axios===",token, config )

    if (token) {
      config.headers = {
        ...config.headers,
        Authorization: `Bearer ${token}`
      }
    }
    return config
  },
  (error) => {
    console.log("error创建错误===", error )

    return Promise.reject(error)
  }
)

service.interceptors.response.use(
  (response: AxiosResponse) => {
    console.log('请求返回===成功=res==', response)
    
    const { code, msg, data } = response.data
    
    if (code === 0) {
      return { data }
    }
    
    message.error(msg || '请求失败')
    return Promise.reject(new Error(msg || '请求失败'))
  },
  (error) => {
    console.log('请求返回===错误=error==', error)
    if (error.response?.status === 401) {
      const userStore = useUserStore()
      userStore.logout()
      window.location.href = '/login'
    }
    
    message.error(error.message || '请求失败')
    return Promise.reject(error)
  }
)

export default service