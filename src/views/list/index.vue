<template>
  <div class="plot-list-wrapper">
    <ElMenu class="list-container" :collapse="isCollapse" :default-openeds="defaultOpeneds">
      <ElSubMenu v-for="plot in plotList" :key="plot.label" :index="plot.label">
        <template #title>
          <div class="icon-wrapper">
            <SvgIcon :name="plot.icon" size="22"></SvgIcon>
          </div>
          <span>{{ plot.label }}</span>
        </template>
        <div class="plot-container" @dragstart="handleDragStart">
          <div class="plot-child" v-for="child in plot.children" :key="child.label" :data-type="child.type" draggable="true">
            <SvgIcon :name="child.icon" size="64"></SvgIcon>
            <div>{{ child.label }}</div>
          </div>
        </div>
      </ElSubMenu>
    </ElMenu>
    <div>
      <SvgIcon :name="collapseIcon" size="32" @click="changeCollapse"></SvgIcon>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, defineAsyncComponent, ref } from 'vue'
import { ElMenu, ElSubMenu } from 'element-plus'
import { plotList } from './list'

const SvgIcon = defineAsyncComponent(() => import('@/components/svgIcon/index.vue'))

const isCollapse = ref<boolean>(true)

const defaultOpeneds = computed<string[]>(() => plotList.map((list) => list.label))
const collapseIcon = computed<string>(() => (isCollapse.value ? 'indentation-right' : 'indentation-left'))

const changeCollapse = (): boolean => (isCollapse.value = !isCollapse.value)

function handleDragStart(e: DragEvent): void {
  e.dataTransfer!.setData('type', (e.target as HTMLElement).dataset.type as string)
}
</script>

<style lang="scss" scoped>
.plot-list-wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100%;
  background: var(--el-fill-color-lighter);
  border-right: 1px solid var(--el-border-color);
  > :nth-child(1) {
    flex: 1;
    overflow: auto;
  }

  > :nth-child(2) {
    width: 100%;
    text-align: center;
    background: var(--el-fill-color-light);
    cursor: pointer;
  }

  .list-container:not(.el-menu--collapse) {
    width: 240px;
  }

  .icon-wrapper {
    display: flex;
    margin-right: 10px;
  }

  :deep(.el-menu) {
    background: var(--el-fill-color-light);
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
  width: 240px;
  margin-top: 5px;
  overflow: auto;
  // background: var(--el-fill-color-light);

  .plot-child {
    display: inline-block;
    width: 80px;
    height: 80px;
    margin-bottom: 10px;
    text-align: center;
    cursor: pointer;

    > :nth-child(1) {
      border: 1px solid var(--el-border-color);
    }

    > :nth-child(2) {
      font-size: 12px;
    }
  }
}
</style>
