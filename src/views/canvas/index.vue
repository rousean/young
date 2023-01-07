<template>
  <ElScrollbar>
    <div class="canvas-wrapper" :style="{ width: width, height: height }">
      <CanvasGrid></CanvasGrid>
      <CanvasXAxis></CanvasXAxis>
      <div @drop="handleDrop" @dragover="handleDragOver">
        <CanvasYAxis></CanvasYAxis>
        <div>
          <ProxyPlot v-for="plot in store.dashboard.canvas" :key="plot.id" :plot="plot"></ProxyPlot>
        </div>
      </div>
    </div>
  </ElScrollbar>
</template>

<script setup lang="ts">
import { computed, defineAsyncComponent } from 'vue'
import { useDashboardStore } from '@/stores/dashboard'
import { ElScrollbar } from 'element-plus'
import { UUID } from '@/util/index'

const CanvasXAxis = defineAsyncComponent(() => import('./canvasXAxis.vue'))
const CanvasYAxis = defineAsyncComponent(() => import('./canvasYAxis.vue'))
const CanvasGrid = defineAsyncComponent(() => import('./canvasGrid.vue'))

const ProxyPlot = defineAsyncComponent(() => import('@/components/plot/index.vue'))

const store = useDashboardStore()
const width = computed(() => `${store.dashboard.width + 20}px`)
const height = computed(() => `${store.dashboard.height + 20}px`)

const handleDragOver = (e: DragEvent): void => {
  e.preventDefault()
}
async function handleDrop(e: DragEvent) {
  console.log(e)
  e.preventDefault()
  e.stopPropagation()
  const type = e.dataTransfer!.getData('type')
  const offsetX = e.offsetX
  const offsetY = e.offsetY
  const style = await import(`../../components/plot/${type}/style.ts`)
  store.painting({
    type,
    id: UUID(),
    x: offsetX,
    y: offsetY,
    style: style.default
  })
}
</script>

<style lang="scss" scoped>
.canvas-wrapper {
  position: relative;
  display: flex;
  flex-direction: column;
  padding-bottom: 50px;
  padding-right: 50px;
  > :nth-child(1) {
    position: absolute;
    top: 20px;
    left: 20px;
    display: flex;
  }

  > :nth-child(2) {
    position: sticky;
    top: 0;
    display: flex;
    padding-left: 20px;
    background: #fff;
    z-index: 100;
  }

  > :nth-child(3) {
    display: flex;

    > :nth-child(1) {
      position: sticky;
      display: flex;
      left: 0;
      background: #fff;
      z-index: 99;
    }
    > :nth-child(2) {
      position: relative;
      flex: 1;
      z-index: 101;
    }
  }
}
</style>
