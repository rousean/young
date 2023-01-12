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
const offset: number = 2.5

const width = computed(() => `${(props.plot.style.width - 20 - 4) / 2}px`)
const height = computed(() => `${(props.plot.style.height - 20 - 4) / 2}px`)
const x = computed(() => `${-(props.plot.style.width - 20 - 4) / 2}px`)
const y = computed(() => `${-(props.plot.style.height - 20 - 4) / 2}px`)

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
        top: `${y - offset}px`,
        left: `${x - offset}px`,
        cursor: 'nwse-resize'
      }
    },
    {
      id: 'top-middle',
      class: 'point-x-top',
      style: {
        top: `${y - offset}px`,
        left: `${x + width / 2 - 10}px`,
        cursor: 'row-resize'
      }
    },
    {
      id: 'right-top',
      class: 'point-circle',
      style: {
        top: `${y - offset}px`,
        left: `${x + width + 1 - offset}px`,
        cursor: 'nesw-resize'
      }
    },
    {
      id: 'left-middle',
      class: 'point-y-top',
      style: {
        top: `${y + height / 2 - 10}px`,
        left: `${x - offset}px`,
        cursor: 'col-resize'
      }
    },
    {
      id: 'right-middle',
      class: 'point-y-bottom',
      style: {
        top: `${y + height / 2 - 10}px`,
        left: `${x + width + 1 - offset}px`,
        cursor: 'col-resize'
      }
    },
    {
      id: 'left-bottom',
      class: 'point-circle',
      style: {
        top: `${y + height - offset}px`,
        left: `${x - offset}px`,
        cursor: 'nesw-resize'
      }
    },
    {
      id: 'bottom-middle',
      class: 'point-x-bottom',
      style: {
        top: `${y + height + 1 - offset}px`,
        left: `${x + width / 2 - 10}px`,
        cursor: 'row-resize'
      }
    },
    {
      id: 'right-bottom',
      class: 'point-circle',
      style: {
        top: `${y + height + 1 - offset}px`,
        left: `${x + width + 1 - offset}px`,
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
  width: v-bind(width);
  height: 0;
  border-top: 1px dashed var(--el-color-primary);
}

.point-x-top::before {
  bottom: 2px;
  left: v-bind(x);
}
.point-x-top::after {
  bottom: 2px;
  right: v-bind(x);
}
.point-x-bottom::before {
  top: 2px;
  left: v-bind(x);
}
.point-x-bottom::after {
  top: 2px;
  right: v-bind(x);
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
  height: v-bind(height);
  width: 0;
  border-left: 1px dashed var(--el-color-primary);
}
.point-y-top::before {
  right: 2px;
  top: v-bind(y);
}
.point-y-top::after {
  right: 2px;
  bottom: v-bind(y);
}
.point-y-bottom::before {
  left: 2px;
  top: v-bind(y);
}
.point-y-bottom::after {
  left: 2px;
  bottom: v-bind(y);
}
</style>
