<template>
  <div class="global-config">
    <div>
      <SvgIcon name="return" size="32"></SvgIcon>
    </div>
    <div class="btn">
      <ElButton>预览</ElButton>
      <ElButton type="primary" plain>保存</ElButton>
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineAsyncComponent } from 'vue'

import { ElButton } from 'element-plus'

const SvgIcon = defineAsyncComponent(() => import('@/components/svgIcon/index.vue'))
</script>

<style lang="scss" scoped>
.global-config {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 40px;
  border-bottom: 1px solid #dcdfe6;
  font-size: 14px;
  cursor: pointer;
  > :nth-child(1) {
    width: 64px;
    text-align: center;
  }
}
</style>
