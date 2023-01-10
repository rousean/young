<template>
  <div class="dashboard-wrapper">
    <!-- 顶部功能区 -->
    <Feature></Feature>
    <div class="operate-wrapper">
      <!-- 图表列表 -->
      <List></List>
      <!-- 画布 -->
      <Canvas></Canvas>
      <!-- 配置 -->
      <Config></Config>
    </div>
  </div>
</template>

<script setup lang="ts" name="dashboard">
import { defineAsyncComponent } from 'vue'
const Feature = defineAsyncComponent(() => import('@/views/feature/index.vue'))
const List = defineAsyncComponent(() => import('@/views/list/index.vue'))
const Canvas = defineAsyncComponent(() => import('@/views/canvas/index.vue'))
const Config = defineAsyncComponent(() => import('@/views/config/index.vue'))
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
      display: flex;
      justify-content: center;
      flex: 1;
      overflow: hidden;
    }
  }
}
</style>
