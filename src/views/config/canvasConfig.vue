<template>
  <div class="canvas-config">
    <div class="canvas-item">
      <div>画布名称</div>
      <ElInput placeholder="未命名" v-model="store.dashboard.name"></ElInput>
    </div>
    <div class="canvas-item">
      <div>画布宽度</div>
      <ElInputNumber v-model="store.dashboard.width" controls-position="right"></ElInputNumber>
    </div>
    <div class="canvas-item">
      <div>画布高度</div>
      <ElInputNumber v-model="store.dashboard.height" controls-position="right"></ElInputNumber>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ElInput, ElInputNumber } from 'element-plus'
import { useDashboardStore } from '@/stores/dashboard'
const store = useDashboardStore()
</script>

<style lang="scss" scoped>
.canvas-config {
  .canvas-item {
    display: flex;
    align-items: center;
    margin-bottom: 10px;
    > :nth-child(1) {
      flex: 1;
      font-size: 13px;
    }
    > :nth-child(2) {
      flex: 2;
    }
  }
}
</style>
