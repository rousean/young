<template>
  <ElCollapse v-if="configure">
    <ElCollapseItem v-for="item in configure" :key="item.label" :title="item.label" :name="item.label">
      <ProxyAttribute v-for="child in item.children" :key="child.label" :config="child"></ProxyAttribute>
    </ElCollapseItem>
  </ElCollapse>
  <div class="no-config" v-else>暂无高级参数配置</div>
</template>

<script setup lang="ts">
import { defineAsyncComponent, ref } from 'vue'
import { ElCollapse, ElCollapseItem } from 'element-plus'
const ProxyAttribute = defineAsyncComponent(() => import('@/components/attribute/index.vue'))

const configure = ref([
  {
    label: '基础配置',
    children: [
      {
        label: '图表标题',
        type: 'text',
        name: 'titleName',
        value: '折线图示例'
      },
      {
        label: '图表宽度',
        type: 'number',
        name: 'width',
        value: 100
      }
    ]
  },
  {
    label: 'X轴',
    children: [
      {
        label: '显示X轴',
        type: 'boolean',
        children: [
          {
            label: 'X轴名称',
            type: 'text',
            name: 'xAxisName'
          }
        ]
      }
    ]
  }
])
</script>

<style lang="scss" scoped>
.no-config {
  padding: 0 15px;
  color: var(--el-fill-color-light);
  font-size: 12px;
}

:deep(.el-collapse-item__header) {
  padding: 0 10px;
}
</style>
