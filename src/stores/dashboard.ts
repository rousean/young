import { defineStore } from 'pinia'
import { UUID } from '@/util/index'
import type { Canvas, Dashboard } from '@/types/global.type'
// 当前store
interface DashboardState {
  dashboard: Dashboard
  canvas: Partial<Canvas>
}

export const useDashboardStore = defineStore('dashboard', {
  state: (): DashboardState => ({
    dashboard: {
      id: UUID(),
      width: 1920,
      height: 1080,
      scale: 1,
      name: UUID(),
      canvas: []
    },
    canvas: {}
  }),
  actions: {
    // 初始化仪表盘
    initDashboard() {
      this.dashboard = {
        id: UUID(),
        width: 1920,
        height: 1080,
        scale: 1,
        name: UUID(),
        canvas: []
      }
      this.canvas = {}
    },
    // 绘制图表
    painting(payload: Canvas) {
      this.canvas = payload
      ;(this.dashboard.canvas as Canvas[]).push(payload)
    },
    setStyle(payload: { [prop: string]: any }) {
      for (const key in payload) {
        ;(this.canvas as Canvas).style[key] = payload[key]
      }
    },
    setPosition(x: number, y: number) {
      this.canvas.x = x
      this.canvas.y = y
    },
    getPosition() {
      const { x, y } = this.canvas as Canvas
      return { x, y }
    },
    setCanvas(id: string) {
      if (id) {
        this.canvas = this.dashboard.canvas.find((c) => c.id === id.replace('Young-', '')) as Canvas
      } else {
        this.canvas.context = false
        this.canvas = {}
      }
    }
  }
})
