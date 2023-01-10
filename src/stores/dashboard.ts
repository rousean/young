import { defineStore } from 'pinia'
import { UUID } from '@/util/index'
// 当前store
interface DashboardState {
  dashboard: Dashboard
  id: string
}

// 仪表盘属性
interface Dashboard {
  id?: string
  width: number
  height: number
  name: string
  canvas: Canvas[]
}

interface Style {
  width: number
  height: number
  [prop: string]: any
}

// 画布属性
interface Canvas {
  id: string
  type: string
  x: number
  y: number
  data: any
  style: Style
}

export const useDashboardStore = defineStore('dashboard', {
  state: (): DashboardState => ({
    dashboard: {
      id: UUID(),
      width: 1920,
      height: 1080,
      name: '',
      canvas: []
    },
    id: ''
  }),
  actions: {
    // 初始化仪表盘
    initDashboard() {
      this.dashboard = {
        id: UUID(),
        width: 1920,
        height: 1080,
        name: UUID(),
        canvas: []
      }
    },
    // 绘制图表
    painting(payload: Canvas) {
      ;(this.dashboard.canvas as Canvas[]).push(payload)
    },
    setStyle(payload: { [prop: string]: any }) {
      const canvas = this.dashboard.canvas.find((c) => c.id === this.id) as Canvas
      for (const key in payload) {
        canvas.style[key] = payload[key]
      }
    },
    setPosition(x: number, y: number) {
      const canvas = this.dashboard.canvas.find((c) => c.id === this.id) as Canvas
      canvas.x = x
      canvas.y = y
    },
    getPosition() {
      const { x, y } = this.dashboard.canvas.find((c) => c.id === this.id) as Canvas
      return { x, y }
    },
    setId(id: string) {
      this.id = id.replace('Young-', '')
    }
  }
})
