<template>
  <div v-for="point in points" :key="point.id" :style="point.style" :class="['point', point.class]" @mousedown="(e: MouseEvent) => handleMouseDown(e, point)"></div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useDashboardStore } from '@/stores/dashboard'
const props = defineProps({
  plot: {
    type: Object,
    required: true
  }
})
const store = useDashboardStore()
const margin: number = 10
const offset: number = 2

const width = computed(() => `${(props.plot.style.width - margin + offset) / 2}px`)
const height = computed(() => `${(props.plot.style.height - margin + offset) / 2}px`)
const x = computed(() => `${-(props.plot.style.width - margin + offset) / 2}px`)
const y = computed(() => `${-(props.plot.style.height - margin + offset) / 2}px`)
interface Point {
  id: string
  class: string
  style: {
    top: string
    left: string
    cursor: string
  }
}
const points = computed(() => {
  const x: number = props.plot.x
  const y: number = props.plot.y
  const width: number = props.plot.style.width
  const height: number = props.plot.style.height
  return [
    {
      id: 'left-top',
      class: 'point-circle',
      style: {
        top: `${y - margin - offset}px`,
        left: `${x - margin - offset}px`,
        cursor: 'nwse-resize'
      }
    },
    {
      id: 'top-middle',
      class: 'point-rect-x',
      style: {
        top: `${y - margin - offset}px`,
        left: `${x + width / 2 - margin}px`,
        cursor: 'row-resize'
      }
    },
    {
      id: 'right-top',
      class: 'point-circle',
      style: {
        top: `${y - margin - offset}px`,
        left: `${x + width + margin - offset}px`,
        cursor: 'nesw-resize'
      }
    },
    {
      id: 'left-middle',
      class: 'point-rect-y',
      style: {
        top: `${y + height / 2 - margin}px`,
        left: `${x - margin - offset}px`,
        cursor: 'col-resize'
      }
    },
    {
      id: 'right-middle',
      class: 'point-rect-y',
      style: {
        top: `${y + height / 2 - margin}px`,
        left: `${x + width + margin - offset}px`,
        cursor: 'col-resize'
      }
    },
    {
      id: 'left-bottom',
      class: 'point-circle',
      style: {
        top: `${y + height + margin - offset}px`,
        left: `${x - margin - offset}px`,
        cursor: 'nesw-resize'
      }
    },
    {
      id: 'bottom-middle',
      class: 'point-rect-x',
      style: {
        top: `${y + height + margin - offset}px`,
        left: `${x + width / 2 - margin}px`,
        cursor: 'row-resize'
      }
    },
    {
      id: 'right-bottom',
      class: 'point-circle',
      style: {
        top: `${y + height + margin - offset}px`,
        left: `${x + width + margin - offset}px`,
        cursor: 'nwse-resize'
      }
    }
  ]
})
const handleMouseDown = (e: MouseEvent, point: Point) => {
  e.stopPropagation()
  console.log(e)
  const x: number = props.plot.x
  const y: number = props.plot.y
  const width: number = props.plot.style.width
  const height: number = props.plot.style.height
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
  //z-index: 1;
}
.point-circle {
  width: 4px;
  height: 4px;
}
.point-rect-x {
  width: 20px;
  height: 4px;
  border-radius: 4px;
}
.point-rect-x::before,
.point-rect-x::after {
  content: '';
  position: absolute;
  top: 1px;
  width: v-bind(width);
  height: 0;
  border-top: 1px dashed var(--el-color-primary);
}
.point-rect-x::before {
  left: v-bind(x);
}
.point-rect-x::after {
  right: v-bind(x);
}
.point-rect-y {
  width: 4px;
  height: 20px;
  border-radius: 4px;
}
.point-rect-y::before,
.point-rect-y::after {
  content: '';
  position: absolute;
  left: 1px;
  height: v-bind(height);
  width: 0;
  border-left: 1px dashed var(--el-color-primary);
}
.point-rect-y::before {
  top: v-bind(y);
}
.point-rect-y::after {
  bottom: v-bind(y);
}
</style>
