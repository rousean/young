import { defineStore } from 'pinia'

interface DashboardState {
  dashboard: Dashboard
}

// 整个画布属性
interface Dashboard {
  width?: number
  height?: number
  name?: string
  canvas?: Canvas[]
}

// 单个图表组件属性
interface Canvas {
  id?: string
  type?: string
  data?: any
  style?: any
}

export const useDashboardStore = defineStore('dashboard', {
  state: (): DashboardState => ({
    dashboard: {}
  }),
  actions: {
    painting(payload: Canvas) {
      ;(this.dashboard.canvas as Canvas[]).push(payload)
    }
  }
})
