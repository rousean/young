<template>
  <ElTabs>
    <ElTabPane label="画布配置">
      <CanvasConfig class="config-wrapper"></CanvasConfig>
    </ElTabPane>
    <ElTabPane label="高级参数">
      <ParamConfig></ParamConfig>
    </ElTabPane>
    <ElTabPane label="数据管理">
      <DataConfig class="config-wrapper"></DataConfig>
    </ElTabPane>
  </ElTabs>
</template>

<script setup lang="ts">
import { defineAsyncComponent } from 'vue'
import { ElTabs, ElTabPane } from 'element-plus'

const CanvasConfig = defineAsyncComponent(() => import('./canvasConfig.vue'))
const ParamConfig = defineAsyncComponent(() => import('./paramConfig.vue'))
const DataConfig = defineAsyncComponent(() => import('./dataConfig.vue'))
</script>

<style lang="scss" scoped>
:deep(.el-tabs__item.is-top:nth-child(2)) {
  padding-left: 20px;
}
.config-wrapper {
  padding: 0 10px;
}
</style>
