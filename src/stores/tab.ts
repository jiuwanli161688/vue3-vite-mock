import { defineStore } from 'pinia'

interface TabItem {
  title: string
  path: string
  name: string
}

interface TabState {
  tabs: TabItem[]
}

export const useTabStore = defineStore('tab', {
  state: (): TabState => ({
    tabs: []
  }),
  
  actions: {
    addTab(tab: TabItem) {
      if (!this.tabs.some(item => item.path === tab.path)) {
        this.tabs.push(tab)
      }
    },
    
    removeTab(path: string) {
      const index = this.tabs.findIndex(item => item.path === path)
      if (index !== -1) {
        this.tabs.splice(index, 1)
      }
    },
    
    clearTabs() {
      this.tabs = []
    }
  },
  
  persist: {
    enabled: true,
    strategies: [
      {
        key: 'tabs',
        storage: localStorage
      }
    ]
  }
})