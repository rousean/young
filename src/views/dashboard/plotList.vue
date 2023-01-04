<template>
  <div class="plot-list-wrapper">
    <div>
      <el-menu class="list-container" :collapse="isCollapse" :default-openeds="defaultOpeneds">
        <el-sub-menu v-for="plot in plotList" :key="plot.label" :index="plot.label">
          <template #title>
            <div class="icon-wrapper">
              <SvgIcon :name="plot.icon" size="22"></SvgIcon>
            </div>
            <span>{{ plot.label }}</span>
          </template>
          <div class="plot-container">
            <div class="plot-child" v-for="child in plot.children" :key="child.label" @click="createPlot(child.type)">
              <SvgIcon :name="child.icon" size="64"></SvgIcon>
              <div>{{ child.label }}</div>
            </div>
          </div>
        </el-sub-menu>
      </el-menu>
    </div>
    <div @click="changeCollapse">
      <SvgIcon :name="collapseIcon" size="32"></SvgIcon>
    </div>
  </div>
</template>

<script setup lang="ts">
import { plotList } from './list'
import { computed, defineAsyncComponent, ref } from 'vue'
import { ElMenu, ElSubMenu } from 'element-plus'
import { useDashboardStore } from '@/stores/dashboard'
const SvgIcon = defineAsyncComponent(() => import('@/components/svgIcon/index.vue'))

const isCollapse = ref<boolean>(false)

const defaultOpeneds = computed<string[]>(() => plotList.map((list) => list.label))
const collapseIcon = computed<string>(() => (isCollapse.value ? 'indentation-right' : 'indentation-left'))

const changeCollapse = (): boolean => (isCollapse.value = !isCollapse.value)

const store = useDashboardStore()
const createPlot = (type: string): void => store.painting({ type, UUID: crypto.randomUUID() })
</script>

<style lang="scss" scoped>
.plot-list-wrapper {
  display: flex;
  flex-direction: column;
  height: 100%;
  border-right: 1px solid #dcdfe6;

  > :nth-child(1) {
    flex: 1;
    overflow: auto;
  }

  > :nth-child(2) {
    height: 40px;
    text-align: center;
    cursor: pointer;
  }

  .list-container:not(.el-menu--collapse) {
    width: 230px;
  }

  .icon-wrapper {
    display: flex;
    margin-right: 10px;
  }
  :deep(.el-menu) {
    border-right: 0;
  }

  :deep(.el-menu:not(.el-menu--collapse)) {
    .el-sub-menu__icon-arrow {
      display: none;
    }

    .el-sub-menu__title:hover {
      .el-sub-menu__icon-arrow {
        display: block;
      }
    }
  }
}

.plot-container {
  display: flex;
  flex-wrap: wrap;
  width: 230px;
  margin-top: 5px;
  overflow: auto;

  .plot-child {
    display: inline-block;
    width: 75px;
    margin-bottom: 10px;
    text-align: center;
    cursor: pointer;

    > :nth-child(1) {
      border: 1px solid #eee;
    }

    > :nth-child(2) {
      margin-top: 5px;
      font-size: 12px;
    }
  }
}
</style>
