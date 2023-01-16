<template>
  <ElScrollbar>
    <div class="canvas-wrapper">
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
import { cloneDeep } from 'lodash'

const CanvasXAxis = defineAsyncComponent(() => import('./canvasXAxis.vue'))
const CanvasYAxis = defineAsyncComponent(() => import('./canvasYAxis.vue'))
const CanvasGrid = defineAsyncComponent(() => import('./canvasGrid.vue'))
const CanvasPaint = defineAsyncComponent(() => import('./canvasPaint.vue'))

const store = useDashboardStore()

const width = computed(() => `${store.dashboard.width + 20}px`) // 盒子宽度加上坐标轴的宽度
const height = computed(() => `${store.dashboard.height + 20}px`)

const scale = computed(() => store.dashboard.scale)
const sticky = computed(() => (scale.value > 1 ? 'static' : 'sticky'))

// 拖拽经过事件
const handleDragOver = (e: DragEvent): void => e.preventDefault()

// 拖拽放置事件
const handleDrop = async (e: DragEvent): Promise<void> => {
  console.log(e)
  e.stopPropagation()
  const type = e.dataTransfer!.getData('type')
  const offsetX = e.offsetX - 40 <= 0 ? 0 : e.offsetX - 40
  const offsetY = e.offsetY - 40 <= 0 ? 0 : e.offsetY - 40
  const style = await import(`../../components/young/${type}/style.ts`)
  const data = await import(`../../components/young/${type}/data.ts`)
  const config = await import(`../../components/young/${type}/config.ts`)
  store.painting({
    id: UUID(),
    type,
    x: offsetX,
    y: offsetY,
    style: cloneDeep(style.default),
    data: cloneDeep(data.default),
    config: cloneDeep(config.default),
    zIndex: 1,
    rotate: 0,
    context: false
  })
}
</script>

<style lang="scss" scoped>
.canvas-wrapper {
  position: relative;
  display: flex;
  flex-direction: column;
  width: v-bind(width);
  height: v-bind(height);
  padding-bottom: 50px;
  padding-right: 50px;
  background: var(--el-fill-color-lighter);
  transform-origin: 0 0;
  transform: scale(v-bind(scale));
  > :nth-child(1) {
    position: absolute;
    top: 20px;
    left: 20px;
    display: flex;
  }

  > :nth-child(2) {
    position: v-bind(sticky);
    top: 0;
    padding-left: 20px;
    background: var(--el-fill-color-lighter);
    z-index: 11;
  }

  > :nth-child(3) {
    display: flex;

    > :nth-child(1) {
      position: v-bind(sticky);
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
