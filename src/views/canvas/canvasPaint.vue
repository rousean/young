<template>
  <div class="canvas-paint" @mousedown="handleMouseDown" @contextmenu="handleContextmenu">
    <CanvasContext></CanvasContext>
    <template v-for="plot in store.dashboard.canvas" :key="plot.id">
      <CanvasPoint v-if="plot.id === store.canvas.id" :plot="plot"></CanvasPoint>
      <ProxyYoung :plot="plot"></ProxyYoung>
    </template>
  </div>
</template>

<script setup lang="ts">
import { defineAsyncComponent } from 'vue'
import { useDashboardStore } from '@/stores/dashboard'
import emitter from '@/mitt/index'

const ProxyYoung = defineAsyncComponent(() => import('@/components/young/index.vue'))
const CanvasPoint = defineAsyncComponent(() => import('./canvasPoint.vue'))
const CanvasContext = defineAsyncComponent(() => import('./canvasContext.vue'))
const store = useDashboardStore()

const handleContextmenu = (e: MouseEvent) => {
  e.stopPropagation()
  e.preventDefault()
  if (!store.canvas.id) return
  emitter.emit('context-show', { show: true, x: `${(store.canvas.x || 0) + e.offsetX}px`, y: `${(store.canvas.y || 0) + e.offsetY}px` })
}

// 鼠标按下事件
const handleMouseDown = (e: MouseEvent): void => {
  e.stopPropagation() // 阻止捕获和冒泡阶段中当前事件的进一步传播
  const id: string = (e.target as HTMLElement).id
  console.log(id)
  if (!id) {
    store.setCanvas('')
    emitter.emit('context-show', { show: false })
    return
  }

  store.setCanvas(id)
  const { x, y } = store.getPosition()
  const startX: number = e.clientX
  const startY: number = e.clientY

  const move = (e: MouseEvent): void => {
    const currX: number = e.clientX
    const currY: number = e.clientY
    store.setPosition(currX - startX + x, currY - startY + y)
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
