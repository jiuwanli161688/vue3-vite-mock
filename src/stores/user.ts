import { defineStore } from 'pinia'
import { loginApi, logout, getUserInfo } from '@/api/user'
import { removeToken, setToken, getToken } from '@/utils/auth'
import type { UserInfo } from '@/api/user'

interface UserState {
  token: string
  userInfo: UserInfo
}

export const useUserStore = defineStore('user', {
  state: (): UserState => ({
    token: getToken() || '',
    userInfo: {
      name: '',
      avatar: '',
      roles: []
    }
  }),
  
  actions: {
    async login(userInfo: { username: string; password: string }) {
      try {
        const { data } = await loginApi(userInfo)
        this.token = data.token
        setToken(data.token)
        return Promise.resolve()
      } catch (error) {
      // console.log('login接口===', error)

        return Promise.reject(error)
      }
    },
    
    async getUserInfo() {
      try {
        const { data } = await getUserInfo()
        this.userInfo = data
        return Promise.resolve(data)
      } catch (error) {
        return Promise.reject(error)
      }
    },
    
    async logout() {
      try {
        await logout()
        this.token = ''
        this.userInfo = {
          name: '',
          avatar: '',
          roles: []
        }
        removeToken()
        return Promise.resolve()
      } catch (error) {
        return Promise.reject(error)
      }
    }
  }
})