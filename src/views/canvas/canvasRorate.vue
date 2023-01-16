<template>
  <SvgIcon className="rotate-icon" name="rotate" size="16" @mousedown="handleRotate"></SvgIcon>
</template>

<script setup lang="ts">
import { computed, defineAsyncComponent } from 'vue'
import { useDashboardStore } from '@/stores/dashboard'

const store = useDashboardStore()
const SvgIcon = defineAsyncComponent(() => import('@/components/svgIcon/index.vue'))

const pos = computed(() => {
  const width: number = store.canvas.style?.width || 0
  return { top: '-30px', left: `${width / 2 - 11}px` }
})
const handleRotate = (e: MouseEvent) => {
  e.stopPropagation()
  e.preventDefault()
  const startY = e.clientY
  const startX = e.clientX
  const startRotate = store.canvas.rotate || 0
  const centerX = (store.canvas.x || 0) + (store.canvas.style?.width || 0) / 2
  const centerY = (store.canvas.y || 0) + (store.canvas.style?.height || 0) / 2
  // 旋转前的角度
  const rotateDegreeBefore = Math.atan2(startY - centerY, startX - centerX) / (Math.PI / 180)

  const move = (e: MouseEvent) => {
    const currentX = e.clientX
    const currrentY = e.clientY
    // 旋转后的角度
    const rotateDegreeAfter = Math.atan2(currrentY - centerY, currentX - centerX) / (Math.PI / 180)
    // 获取旋转的角度值
    store.canvas.rotate = startRotate + rotateDegreeAfter - rotateDegreeBefore
  }

  const up = () => {
    document.removeEventListener('mousemove', move)
    document.removeEventListener('mouseup', up)
  }

  document.addEventListener('mousemove', move)
  document.addEventListener('mouseup', up)
}
</script>

<style lang="scss" scoped>
.rotate-icon {
  position: absolute;
  color: var(--el-color-primary);
  top: v-bind('pos.top');
  left: v-bind('pos.left');
  cursor: pointer;
}
</style>
