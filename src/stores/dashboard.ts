import { defineStore } from 'pinia'

interface DashboardState {
  dashboard: Dashboard[]
}

interface Dashboard {
  type: string
  UUID: string
  data?: []
  config?: {}
  style?: {}
}

export const useDashboardStore = defineStore('dashboard', {
  state: (): DashboardState => ({
    dashboard: []
  }),
  actions: {
    painting(payload: Dashboard) {
      this.dashboard.push(payload)
    }
  }
})
