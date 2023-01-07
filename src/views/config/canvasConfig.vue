<template>
  <div class="canvas-config">
    <div class="canvas-item">
      <div>画布名称</div>
      <ElInput placeholder="未命名" v-model="store.dashboard.name"></ElInput>
    </div>
    <div class="canvas-item">
      <div>分辨率</div>
      <div>
        <ElInput v-model="store.dashboard.width"></ElInput>
        <div>*</div>
        <ElInput v-model="store.dashboard.height"></ElInput>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ElInput } from 'element-plus'
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
      display: flex;
      align-items: center;
    }
  }
}
</style>
