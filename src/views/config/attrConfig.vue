<template>
  <ElCollapse v-if="config">
    <ElCollapseItem v-for="item in config" :key="item.label" :title="item.label" :name="item.label">
      <ProxyAttribute v-for="child in item.children" :key="child.label" :config="child"></ProxyAttribute>
    </ElCollapseItem>
  </ElCollapse>
  <div class="no-config" v-else>暂无高级参数配置</div>
</template>

<script setup lang="ts">
import { computed, defineAsyncComponent, ref, watch } from 'vue'
import { ElCollapse, ElCollapseItem } from 'element-plus'
import { useDashboardStore } from '@/stores/dashboard'
import { debounce } from 'lodash'
const store = useDashboardStore()

const ProxyAttribute = defineAsyncComponent(() => import('@/components/attribute/index.vue'))

const config = ref(store.canvas.config)

watch(config, (val) => {
  console.log(val)
})

watch(
  () => store.canvas.id,
  () => {
    config.value = store.canvas.config
  },
  {
    immediate: true
  }
)
</script>

<style lang="scss" scoped>
.no-config {
  padding: 0 15px;
  color: var(--el-color-info-light-3);
  font-size: 12px;
}

:deep(.el-collapse-item__header) {
  background: var(--el-fill-color-light);
  padding: 0 10px;
}
:deep(.el-collapse-item__wrap, ) {
  background: var(--el-fill-color-light);
}
</style>
