<template>
  <div class="feature-wrapper">
    <div @click="back">
      <SvgIcon name="return" size="32"></SvgIcon>
    </div>
    <div>
      <div class="input-wrapper" v-show="store.canvas.id">
        <div>X坐标</div>
        <ElInputNumber v-model="store.canvas.x" :value-on-clear="0" controls-position="right" :min="0" :max="maxX"></ElInputNumber>
      </div>
      <div class="input-wrapper" v-show="store.canvas.id">
        <div>Y坐标</div>
        <ElInputNumber v-model="store.canvas.y" :value-on-clear="0" controls-position="right" :min="0" :max="maxY"></ElInputNumber>
      </div>
      <div class="input-wrapper" v-show="store.canvas.id">
        <div>图层</div>
        <ElInputNumber v-model="store.canvas.zIndex" :value-on-clear="1" controls-position="right" :min="1" :max="10"></ElInputNumber>
      </div>
      <div class="input-wrapper">
        <div>缩放</div>
        <ElInputNumber v-model="store.dashboard.scale" :value-on-clear="1" controls-position="right" :step="0.1" :min="0.4"></ElInputNumber>
      </div>
    </div>
    <div>
      <ElTooltip content="撤销" placement="bottom" effect="light">
        <ElButton><SvgIcon name="revoke" size="20"></SvgIcon></ElButton>
      </ElTooltip>
      <ElTooltip content="重做" placement="bottom" effect="light">
        <ElButton><SvgIcon name="unrevoke" size="20"></SvgIcon></ElButton>
      </ElTooltip>
      <ElDivider direction="vertical" border-style="dashed"></ElDivider>
      <ElTooltip content="锁定" placement="bottom" effect="light">
        <ElButton><SvgIcon name="lock" size="20"></SvgIcon></ElButton>
      </ElTooltip>
      <ElTooltip content="解锁" placement="bottom" effect="light">
        <ElButton><SvgIcon name="unlock" size="20"></SvgIcon></ElButton>
      </ElTooltip>
      <ElTooltip content="编组" placement="bottom" effect="light">
        <ElButton><SvgIcon name="combination" size="20"></SvgIcon></ElButton>
      </ElTooltip>
      <ElTooltip content="解组" placement="bottom" effect="light">
        <ElButton><SvgIcon name="uncombination" size="20"></SvgIcon></ElButton>
      </ElTooltip>
      <ElTooltip content="预览" placement="bottom" effect="light">
        <ElButton><SvgIcon name="view" size="20"></SvgIcon></ElButton>
      </ElTooltip>
      <ElTooltip content="保存" placement="bottom" effect="light">
        <ElButton><SvgIcon name="save" size="20"></SvgIcon></ElButton>
      </ElTooltip>
      <!-- <ElTooltip content="缩小" placement="bottom" effect="light">
        <ElButton><SvgIcon name="zoomout" size="20"></SvgIcon></ElButton>
      </ElTooltip>
      <ElTooltip content="放大" placement="bottom" effect="light">
        <ElButton><SvgIcon name="zoomin" size="20"></SvgIcon></ElButton>
      </ElTooltip> -->
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, defineAsyncComponent } from 'vue'
import { useRouter } from 'vue-router'
import { ElButton, ElInputNumber, ElTooltip, ElDivider } from 'element-plus'

import { useDashboardStore } from '@/stores/dashboard'
const SvgIcon = defineAsyncComponent(() => import('@/components/svgIcon/index.vue'))

const store = useDashboardStore()

const maxX = computed(() => (store.dashboard.width || 0) - (store.canvas.style?.width || 0))

const maxY = computed(() => (store.dashboard.height || 0) - (store.canvas.style?.height || 0))

const router = useRouter()
const back = () => router.push('/layout')
</script>

<style lang="scss" scoped>
.feature-wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 40px;
  border-bottom: 1px solid var(--el-border-color);
  font-size: 14px;
  cursor: pointer;
  > :nth-child(1) {
    width: 64px;
    text-align: center;
  }
  > :nth-child(2) {
    display: flex;
    flex: 1;
    .input-wrapper {
      display: flex;
      align-items: center;
      font-size: 12px;
      width: 130px;
      margin: 0 10px;
      > :nth-child(1) {
        width: 50%;
      }
    }
  }
  > :nth-child(3) {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    padding-right: 5px;
    flex: 1;
  }
}
</style>
