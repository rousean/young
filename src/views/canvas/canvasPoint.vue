<template>
  <div v-for="point in points" :key="point.id" :style="point.style" :class="['point', point.class]" @mousedown="(e: MouseEvent) => handleMouseDown(e, point)"></div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useDashboardStore } from '@/stores/dashboard'

const store = useDashboardStore()

interface Point {
  id: string
  class: string
  style: {
    top: string
    left: string
    cursor: string
  }
}

// 8个点坐标
const points = computed(() => {
  const offset: number = -3 // 偏移量
  const margin: number = 10 // 中间宽度
  const width: number = store.canvas.style?.width || 0
  const height: number = store.canvas.style?.height || 0
  const xOffset: string = `${offset}px`
  const yOffset: string = `${offset}px`
  const xOffsetWidth: string = `${offset + width}px`
  const yOffsetHeight: string = `${offset + height}px`
  const xHalfWidth: string = `${offset + width / 2 - margin}px`
  const yHalfHeigth: string = `${offset + height / 2 - margin}px`
  return [
    {
      id: 'left-top',
      class: 'point-circle',
      style: {
        top: yOffset,
        left: xOffset,
        cursor: 'nwse-resize'
      }
    },
    {
      id: 'right-top',
      class: 'point-circle',
      style: {
        top: yOffset,
        left: xOffsetWidth,
        cursor: 'nesw-resize'
      }
    },
    {
      id: 'left-bottom',
      class: 'point-circle',
      style: {
        top: yOffsetHeight,
        left: xOffset,
        cursor: 'nesw-resize'
      }
    },
    {
      id: 'right-bottom',
      class: 'point-circle',
      style: {
        top: yOffsetHeight,
        left: xOffsetWidth,
        cursor: 'nwse-resize'
      }
    },
    {
      id: 'top-middle',
      class: 'point-x',
      style: {
        top: yOffset,
        left: xHalfWidth,
        cursor: 'row-resize'
      }
    },
    {
      id: 'bottom-middle',
      class: 'point-x',
      style: {
        top: yOffsetHeight,
        left: xHalfWidth,
        cursor: 'row-resize'
      }
    },
    {
      id: 'left-middle',
      class: 'point-y',
      style: {
        top: yHalfHeigth,
        left: xOffset,
        cursor: 'col-resize'
      }
    },
    {
      id: 'right-middle',
      class: 'point-y',
      style: {
        top: yHalfHeigth,
        left: xOffsetWidth,
        cursor: 'col-resize'
      }
    }
  ]
})

// 鼠标事件
const handleMouseDown = (e: MouseEvent, point: Point) => {
  e.stopPropagation()
  e.preventDefault()
  const x: number = store.canvas.x || 0
  const y: number = store.canvas.y || 0
  const width: number = store.canvas.style?.width || 0
  const height: number = store.canvas.style?.height || 0
  const startX: number = e.clientX
  const startY: number = e.clientY
  const id: string = point.id
  const t: boolean = id.includes('top')
  const l: boolean = id.includes('left')
  const r: boolean = id.includes('right')
  const b: boolean = id.includes('bottom')
  const move = (e: MouseEvent) => {
    const currX: number = e.clientX
    const currY: number = e.clientY
    const disY: number = currY - startY
    const disX: number = currX - startX
    const _width: number = width + (l ? -disX : r ? disX : 0)
    const _height: number = height + (t ? -disY : b ? disY : 0)
    const _x: number = x + (l ? disX : 0)
    const _y: number = y + (t ? disY : 0)
    store.setPosition(_x, _y)
    store.setStyle({ width: _width < 0 ? width : _width, height: _height < 0 ? height : _height })
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
.point {
  position: absolute;
  border: 1px solid var(--el-color-primary);
  background: var(--el-fill-color-light);
  z-index: 10;
}
.point-circle {
  width: 4px;
  height: 4px;
}
.point-x {
  width: 20px;
  height: 4px;
  border-radius: 4px;
}
.point-y {
  width: 4px;
  height: 20px;
  border-radius: 4px;
}
</style>
