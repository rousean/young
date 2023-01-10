<template>
  <ElScrollbar>
    <div class="canvas-wrapper" :style="{ width: width, height: height }">
      <CanvasGrid></CanvasGrid>
      <CanvasXAxis></CanvasXAxis>
      <div @drop="handleDrop" @dragover="handleDragOver">
        <CanvasYAxis></CanvasYAxis>
        <CanvasPaint></CanvasPaint>
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
const CanvasPaint = defineAsyncComponent(() => import('./canvasPaint.vue'))

const store = useDashboardStore()

const width = computed(() => `${store.dashboard.width + 20}px`) // 盒子宽度加上坐标轴的宽度
const height = computed(() => `${store.dashboard.height + 20}px`)

// 拖拽经过事件
const handleDragOver = (e: DragEvent): void => e.preventDefault()

// 拖拽放置事件
const handleDrop = async (e: DragEvent): Promise<void> => {
  console.log(e)
  e.stopPropagation()
  const type = e.dataTransfer!.getData('type')
  const offsetX = e.offsetX - 40 <= 0 ? 0 : e.offsetX - 40
  const offsetY = e.offsetY - 40 <= 0 ? 0 : e.offsetY - 40
  const style = await import(`../../components/plot/${type}/style.ts`)
  const data = await import(`../../components/plot/${type}/data.ts`)
  store.painting({
    id: UUID(),
    type,
    x: offsetX,
    y: offsetY,
    style: JSON.parse(JSON.stringify(style.default)),
    data: data.default,
    zIndex: 1
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
  background: var(--el-fill-color-lighter);
  > :nth-child(1) {
    position: absolute;
    top: 20px;
    left: 20px;
    display: flex;
  }

  > :nth-child(2) {
    position: sticky;
    top: 0;
    padding-left: 20px;
    background: var(--el-fill-color-lighter);
    z-index: 11;
  }

  > :nth-child(3) {
    display: flex;

    > :nth-child(1) {
      position: sticky;
      left: 0;
      background: var(--el-fill-color-lighter);
      z-index: 11;
    }

    > :nth-child(2) {
      flex: 1;
    }
  }
}
</style>
