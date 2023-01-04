<template>
  <div class="dashboard-wrapper">
    <PlotGlobal></PlotGlobal>
    <div class="operate-wrapper">
      <PlotList></PlotList>
      <PlotDraw></PlotDraw>
      <PlotConfig></PlotConfig>
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineAsyncComponent } from 'vue'
const PlotGlobal = defineAsyncComponent(() => import('./plotGlobal.vue'))

const PlotList = defineAsyncComponent(() => import('./plotList.vue'))
const PlotDraw = defineAsyncComponent(() => import('./plotDraw.vue'))
const PlotConfig = defineAsyncComponent(() => import('@/views/config/index.vue'))
</script>

<style lang="scss" scoped>
.dashboard-wrapper {
  display: flex;
  flex-direction: column;
  width: 100vw;
  height: 100vh;
  .operate-wrapper {
    display: flex;
    flex: 1;
    overflow: hidden;
    > :nth-child(2) {
      flex: 1;
    }
    > :nth-child(3) {
      width: 360px;
      border-left: 1px solid #dcdfe6;
    }
  }
}
</style>
