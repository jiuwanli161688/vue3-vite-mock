// src/api/user.ts
import request from '@/utils/request'

export interface LoginParams {
  username: string
  password: string
}

export interface UserInfo {
  name: string
  avatar: string
  roles: string[]
}

export const loginApi = (data: LoginParams) => {
  return request({
    url: '/api/login',
    // url: '/login',
    method: 'post',
    data
  })
}

export const getUserInfo = () => {
  return request({
    url: '/api/user/info',
    method: 'get'
  })
}

export const logout = () => {
  return request({
    url: '/api/logout',
    method: 'post'
  })
}