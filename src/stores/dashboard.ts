import { defineStore } from 'pinia'
import { UUID } from '@/util/index'
// 当前store
interface DashboardState {
  dashboard: Dashboard
  currentId: string
}

// 仪表盘属性
interface Dashboard {
  readonly id?: string
  width: string
  height: string
  name: string
  canvas: Canvas[]
}

// 画布属性
interface Canvas {
  id?: string
  type?: string
  data?: any
  style?: any
}

export const useDashboardStore = defineStore('dashboard', {
  state: (): DashboardState => ({
    dashboard: {
      width: '1920',
      height: '1080',
      name: '',
      canvas: []
    },
    currentId: ''
  }),
  actions: {
    initDashboard() {
      this.dashboard = {
        id: UUID(),
        width: '1920',
        height: '1080',
        name: UUID(),
        canvas: []
      }
    },
    painting(payload: Canvas) {
      ;(this.dashboard.canvas as Canvas[]).push(payload)
    }
  }
})
