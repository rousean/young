<template>
  <div class="config-container" :style="{ width: width }">
    <SvgIcon class="config-icon" :name="collapseIcon" size="32" @click="changeCollapse"></SvgIcon>
    <ElTabs>
      <ElTabPane label="画布配置">
        <CanvasConfig class="config-pane"></CanvasConfig>
      </ElTabPane>
      <ElTabPane label="属性配置">
        <AttrConfig></AttrConfig>
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
const AttrConfig = defineAsyncComponent(() => import('./attrConfig.vue'))
const DataConfig = defineAsyncComponent(() => import('./dataConfig.vue'))
const SvgIcon = defineAsyncComponent(() => import('@/components/svgIcon/index.vue'))

const isCollapse = ref<boolean>(false)
const width = computed<string>(() => (isCollapse.value ? '0px' : '360px'))
const collapseIcon = computed<string>(() => (isCollapse.value ? 'indentation-left' : 'indentation-right'))

const changeCollapse = (): boolean => (isCollapse.value = !isCollapse.value)
</script>

<style lang="scss" scoped>
.config-container {
  position: relative;
  width: 360px;
  border-left: 1px solid var(--el-border-color);
  transition: all 0.5s ease-in-out;
  box-shadow: var(--el-box-shadow);
  z-index: 200;
  .config-icon {
    position: absolute;
    top: 50%;
    left: -34px;
    transform: translateY(-50%);
    border-top: 1px solid var(--el-border-color);
    border-right: 1px solid var(--el-fill-color-blank);
    border-bottom: 1px solid var(--el-border-color);
    border-left: 1px solid var(--el-border-color);
    background: var(--el-fill-color-light);
    opacity: 0.8;
    cursor: pointer;
  }
  .config-pane {
    padding: 0 10px;
  }

  :deep(.el-tabs__item.is-top:nth-child(2)) {
    padding-left: 20px;
  }
}
</style>
