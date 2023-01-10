<template>
  <ElTabs v-model="activeName" @tab-click="handleClick">
    <el-tab-pane label="仪表盘管理" name="1">
      <ElButton @click="createDashboard">新建仪表盘</ElButton>
    </el-tab-pane>
  </ElTabs>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'

import { useDashboardStore } from '@/stores/dashboard'

import { ElTabs, ElTabPane, ElButton } from 'element-plus'
import type { TabsPaneContext } from 'element-plus'

const activeName = ref<string>('1')

const handleClick = (tab: TabsPaneContext, event: Event) => {
  console.log(tab, event)
}
const router = useRouter()
const store = useDashboardStore()
const createDashboard = () => {
  store.initDashboard()
  router.push('/dashboard')
}
</script>
