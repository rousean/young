<template>
  <div class="config-container" :style="{ width: width }">
    <SvgIcon class="config-icon" :name="collapseIcon" size="32" @click="changeCollapse"></SvgIcon>
    <ElTabs>
      <ElTabPane label="画布配置">
        <CanvasConfig class="config-pane"></CanvasConfig>
      </ElTabPane>
      <ElTabPane label="高级参数">
        <ParamConfig></ParamConfig>
      </ElTabPane>
      <ElTabPane label="数据管理">
        <DataConfig class="config-pane"></DataConfig>
      </ElTabPane>
    </ElTabs>
  </div>
</template>

<script setup lang="ts">
import { computed, defineAsyncComponent, ref } from 'vue'
import { ElTabs, ElTabPane } from 'element-plus'

const CanvasConfig = defineAsyncComponent(() => import('./canvasConfig.vue'))
const ParamConfig = defineAsyncComponent(() => import('./paramConfig.vue'))
const DataConfig = defineAsyncComponent(() => import('./dataConfig.vue'))
const SvgIcon = defineAsyncComponent(() => import('@/components/svgIcon/index.vue'))

const isCollapse = ref<boolean>(false)
const width = ref<string>('360px')
const collapseIcon = computed<string>(() => (isCollapse.value ? 'indentation-right' : 'indentation-left'))

const changeCollapse = () => {
  isCollapse.value = !isCollapse.value
  width.value = isCollapse.value ? '0px' : '360px'
}
</script>

<style lang="scss" scoped>
.config-container {
  position: relative;
  width: 360px;
  border-left: 1px solid #dcdfe6;
  transition: all 0.5s ease-in-out;
  box-shadow: var(--el-box-shadow);
  .config-icon {
    position: absolute;
    top: 50%;
    left: -34px;
    transform: translateY(-50%);
    border: 1px solid #dcdfe6;
    cursor: pointer;
    background: #b3b3b3;
    opacity: 0.8;
  }
  .config-pane {
    padding: 0 10px;
  }

  :deep(.el-tabs__item.is-top:nth-child(2)) {
    padding-left: 20px;
  }
}
</style>
