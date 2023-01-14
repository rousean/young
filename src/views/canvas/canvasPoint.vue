<template>
  <div v-show="store.canvas.id">
    <div v-for="point in points" :key="point.id" :style="point.style" :class="['point', point.class]" @mousedown="(e: MouseEvent) => handleMouseDown(e, point)"></div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useDashboardStore } from '@/stores/dashboard'

const store = useDashboardStore()

const pos = computed(() => {
  const width = ((store.canvas.style?.width || 0) - 22 - 6) / 2
  const height = ((store.canvas.style?.height || 0) - 22 - 6) / 2
  return { width: `${width}px`, height: `${height}px`, x: `${-width}px`, y: `${-height}px` }
})

interface Point {
  id: string
  class: string
  style: {
    top: string
    left: string
    cursor: string
  }
}

// 误差
const error = (coordinate: number): number => {
  return (coordinate - 3) % 4 === 0 ? 0.5 : 0
}

// 点绕点旋转公式
function calcRotate(a, b, angle) {
  const x = (a.x - b.x) * Math.cos(angle) - (a.y - b.y) * Math.sin(angle) + b.x
  const y = (a.x - b.x) * Math.sin(angle) + (a.y - b.y) * Math.cos(angle) + b.y
  return { x: x, y: y }
}
interface Position {
  x: number
  y: number
}
// 角度转弧度
const angleToRadian = (angle: number): number => (angle * Math.PI) / 180

const xRotate = (p: Position, c: Position, rotate: number): string => `${(p.x - c.x) * Math.cos(rotate) - (p.y - c.y) * Math.sin(rotate) + c.x}px`

const yRotate = (p: Position, c: Position, rotate: number) => `${(p.x - c.x) * Math.sin(rotate) + (p.y - c.y) * Math.cos(rotate) + c.y}px`



// 8个点坐标
const points = computed(() => {
  const offset: number = 2 // 偏移量
  const margin: number = 11 // 中间宽度
  const x: number = store.canvas.x || 0
  const y: number = store.canvas.y || 0
  const width: number = store.canvas.style?.width || 0
  const height: number = store.canvas.style?.height || 0
  const center = {x: x + width / 2, y: y + height / 2}
  const xError: number = error(x)
  const yError: number = error(y)
  const xOffset: number = x - offset
  const yOffset: number = y - offset
  const xOffsetWidth: number = x - offset + width + xError
  const yOffsetHeight: number = y - offset + height + yError
  const xHalfWidth: number = x + width / 2 - margin
  const yHalfHeigth: number = y + height / 2 - margin
  return [
    {
      id: 'left-top',
      class: 'point-circle',
      style: {
        top: xRotate({ x: xOffset, y: yOffset }, {x}),
        left: `${t.x}px`,
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
      class: 'point-x-top',
      style: {
        top: yOffset,
        left: xHalfWidth,
        cursor: 'row-resize'
      }
    },
    {
      id: 'bottom-middle',
      class: 'point-x-bottom',
      style: {
        top: yOffsetHeight,
        left: xHalfWidth,
        cursor: 'row-resize'
      }
    },
    {
      id: 'left-middle',
      class: 'point-y-top',
      style: {
        top: yHalfHeigth,
        left: xOffset,
        cursor: 'col-resize'
      }
    },
    {
      id: 'right-middle',
      class: 'point-y-bottom',
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
.point-x-top,
.point-x-bottom {
  width: 20px;
  height: 4px;
  border-radius: 4px;
}
.point-x-top::before,
.point-x-top::after,
.point-x-bottom::before,
.point-x-bottom::after {
  content: '';
  position: absolute;
  width: v-bind('pos.width');
  height: 0;
  border-top: 1px dashed var(--el-color-primary);
}

.point-x-top::before {
  bottom: 2px;
  left: v-bind('pos.x');
}
.point-x-top::after {
  bottom: 2px;
  right: v-bind('pos.x');
}
.point-x-bottom::before {
  top: 2px;
  left: v-bind('pos.x');
}
.point-x-bottom::after {
  top: 2px;
  right: v-bind('pos.x');
}
.point-y-top,
.point-y-bottom {
  width: 4px;
  height: 20px;
  border-radius: 4px;
}
.point-y-top::before,
.point-y-bottom::before,
.point-y-top::after,
.point-y-bottom::after {
  content: '';
  position: absolute;
  height: v-bind('pos.height');
  width: 0;
  border-left: 1px dashed var(--el-color-primary);
}
.point-y-top::before {
  right: 2px;
  top: v-bind('pos.y');
}
.point-y-top::after {
  right: 2px;
  bottom: v-bind('pos.y');
}
.point-y-bottom::before {
  left: 2px;
  top: v-bind('pos.y');
}
.point-y-bottom::after {
  left: 2px;
  bottom: v-bind('pos.y');
}
</style>
