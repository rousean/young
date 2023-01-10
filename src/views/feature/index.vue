<template>
  <div class="global-config">
    <div @click="back">
      <SvgIcon name="return" size="32"></SvgIcon>
    </div>
    <ElButton>撤销</ElButton>
    <ElButton>重做</ElButton>
    <ElButton>锁定</ElButton>
    <ElButton>解锁</ElButton>
    <ElButton>编组</ElButton>
    <ElButton>解组</ElButton>
    <ElButton>预览</ElButton>
    <div style="display:flex">
      <span>图层</span>
      <ElInput></ElInput>
    </div>
    <ElButton type="primary" plain>保存</ElButton>
  </div>
</template>

<script setup lang="ts">
import { defineAsyncComponent } from 'vue'
import { useRouter } from 'vue-router'
import { ElButton, ElInput } from 'element-plus'

const SvgIcon = defineAsyncComponent(() => import('@/components/svgIcon/index.vue'))
const router = useRouter()
const back = () => router.push('/layout')
</script>

<style lang="scss" scoped>
.global-config {
  display: flex;
  // justify-content: space-between;
  align-items: center;
  height: 40px;
  border-bottom: 1px solid var(--el-border-color);
  font-size: 14px;
  cursor: pointer;
  > :nth-child(1) {
    width: 64px;
    text-align: center;
  }
}
</style>
