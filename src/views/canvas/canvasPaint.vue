<template>
  <div class="canvas-paint" @mousedown="handleFather" @contextmenu="handleFather">
    <div class="canvas-wrapper" v-for="plot in store.dashboard.canvas" :key="plot.id" :style="{ transform: `translate3d(${plot.x}px, ${plot.y}px, 0px) rotate(${plot.rotate}deg)` }">
      <div class="young-container">
        <ProxyYoung :style="{ outline: `${plot.id === store.canvas.id ? '1px dashed var(--el-color-primary)' : ''}` }" :plot="plot" @mousedown="handleMouseDown" @contextmenu="handleContextmenu"></ProxyYoung>
        <div v-show="plot.id === store.canvas.id">
          <CanvasContext></CanvasContext>
          <CanvasRorate></CanvasRorate>
          <CanvasPoint></CanvasPoint>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineAsyncComponent } from 'vue'
import { useDashboardStore } from '@/stores/dashboard'
import emitter from '@/mitt/index'

const ProxyYoung = defineAsyncComponent(() => import('@/components/young/index.vue'))
const CanvasPoint = defineAsyncComponent(() => import('./canvasPoint.vue'))
const CanvasContext = defineAsyncComponent(() => import('./canvasContext.vue'))
const CanvasRorate = defineAsyncComponent(() => import('./canvasRorate.vue'))

const store = useDashboardStore()

const handleContextmenu = (e: MouseEvent) => {
  e.stopPropagation()
  e.preventDefault()
  emitter.emit('context-show', { x: `${e.offsetX}px`, y: `${e.offsetY}px` })
}

const handleFather = (e: MouseEvent) => {
  e.stopPropagation()
  store.setCanvas('')
}

// 鼠标按下事件
const handleMouseDown = (e: MouseEvent): void => {
  e.stopPropagation() // 阻止捕获和冒泡阶段中当前事件的进一步传播
  const id: string = (e.target as HTMLElement).id
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
  .canvas-wrapper {
    position: absolute;
    .young-container {
      position: relative;
    }
  }
}
</style>
