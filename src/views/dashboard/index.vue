<template>
  <div class="dashboard-wrapper">
    <PlotGlobal></PlotGlobal>
    <div class="operate-wrapper">
      <PlotList></PlotList>
      <PlotCanvas></PlotCanvas>
      <PlotConfig></PlotConfig>
    </div>
  </div>
</template>

<script setup lang="ts" name="dashboard">
import { defineAsyncComponent } from 'vue'
const PlotGlobal = defineAsyncComponent(() => import('./plotGlobal.vue'))
const PlotList = defineAsyncComponent(() => import('./plotList.vue'))

const PlotCanvas = defineAsyncComponent(() => import('@/views/canvas/index.vue'))
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
      overflow: hidden;
    }
  }
}
</style>
