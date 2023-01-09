<template>
  <div class="canvas-paint" @mousedown="handleMouseDown">
    <template v-for="plot in store.dashboard.canvas" :key="plot.id">
      <CanvasPoint v-if="plot.id === store.id" :plot="plot"></CanvasPoint>
      <ProxyPlot :plot="plot"></ProxyPlot>
    </template>
  </div>
</template>

<script setup lang="ts">
import { defineAsyncComponent } from 'vue'
import { useDashboardStore } from '@/stores/dashboard'
const ProxyPlot = defineAsyncComponent(() => import('@/components/plot/index.vue'))
const CanvasPoint = defineAsyncComponent(() => import('./canvasPoint.vue'))
const store = useDashboardStore()

// 鼠标按下事件
const handleMouseDown = (e: MouseEvent): void => {
  e.stopPropagation() // 阻止捕获和冒泡阶段中当前事件的进一步传播
  console.log(e)
  const id: string = (e.target as HTMLElement).id
  if (!id) return
  store.setId(id)
  const { x, y } = store.getStyle()
  const clientX: number = e.clientX
  const clientY: number = e.clientY
  const move = (e: MouseEvent): void => {
    const currX: number = e.clientX
    const currY: number = e.clientY
    store.setStyle(currX - clientX + x, currY - clientY + y)
  }
  const up = (): void => {
    document.removeEventListener('mousemove', move)
    document.removeEventListener('mouseup', up)
  }

  document.addEventListener('mousemove', move)
  document.addEventListener('mouseup', up)
}
</script>

<style lang="scss" scoped>
.canvas-paint {
  position: relative;
}
</style>
