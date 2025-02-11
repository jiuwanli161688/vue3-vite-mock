import { useUserStore } from '@/stores/user'

export function usePermission() {
  const userStore = useUserStore()
  
  const hasPermission = (permission: string) => {
    const roles = userStore.userInfo.roles || []
    return roles.includes('admin') || roles.includes(permission)
  }
  
  return {
    hasPermission
  }
}