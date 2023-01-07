<template>
  <ElScrollbar>
    <div class="canvas-wrapper" :style="{ width: width, height: height }">
      <CanvasGrid></CanvasGrid>
      <div><CanvasXAxis></CanvasXAxis></div>
      <div>
        <div><CanvasYAxis></CanvasYAxis></div>
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

const ProxyPlot = defineAsyncComponent(() => import('@/components/plot/index.vue'))
const CanvasXAxis = defineAsyncComponent(() => import('@/views/canvas/canvasXAxis.vue'))
const CanvasYAxis = defineAsyncComponent(() => import('@/views/canvas/canvasYAxis.vue'))

const CanvasGrid = defineAsyncComponent(() => import('@/views/canvas/canvasGrid.vue'))

const store = useDashboardStore()
const width = computed(() => `${store.dashboard.width}px`)
const height = computed(() => `${store.dashboard.height}px`)
</script>

<style lang="scss" scoped>
.canvas-wrapper {
  position: relative;
  display: flex;
  flex-direction: column;
  padding-bottom: 50px;
  padding-right: 50px;
  > :nth-child(2) {
    position: sticky;
    top: 0;
    width: 100%;
    height: 20px;
    padding-left: 20px;
    background: #fff;
    z-index: 100;
  }
  > :nth-child(3) {
    display: flex;
    > :nth-child(1) {
      position: sticky;
      left: 0;
      width: 20px;
      height: 100%;
      background: #fff;
      z-index: 99;
    }
  }
}
</style>
