<template>
  <div v-for="(point, index) in points" :key="index" :style="point" :class="point.class"></div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
const props = defineProps({
  plot: {
    type: Object,
    required: true
  }
})
const margin: number = 10
const offset: number = 2

const width = computed(() => `${(props.plot.style.width - margin + offset) / 2}px`)
const height = computed(() => `${(props.plot.style.height - margin + offset) / 2}px`)
const x = computed(() => `${-(props.plot.style.width - margin + offset) / 2}px`)
const y = computed(() => `${-(props.plot.style.height - margin + offset) / 2}px`)

const points = computed(() => {
  const x: number = props.plot.x
  const y: number = props.plot.y
  const width: number = props.plot.style.width
  const height: number = props.plot.style.height
  return [
    {
      top: `${y - margin - offset}px`,
      left: `${x - margin - offset}px`,
      class: 'point-circle'
    },
    {
      top: `${y - margin - offset}px`,
      left: `${x + width / 2 - margin}px`,
      class: 'point-rect-x'
    },
    {
      top: `${y - margin - offset}px`,
      left: `${x + width + margin - offset}px`,
      class: 'point-circle'
    },
    {
      top: `${y + height / 2 - margin}px`,
      left: `${x - margin - offset}px`,
      class: 'point-rect-y'
    },
    {
      top: `${y + height / 2 - margin}px`,
      left: `${x + width + margin - offset}px`,
      class: 'point-rect-y'
    },
    {
      top: `${y + height + margin - offset}px`,
      left: `${x - margin - offset}px`,
      class: 'point-circle'
    },
    {
      top: `${y + height + margin - offset}px`,
      left: `${x + width / 2 - margin}px`,
      class: 'point-rect-x'
    },
    {
      top: `${y + height + margin - offset}px`,
      left: `${x + width + margin - offset}px`,
      class: 'point-circle'
    }
  ]
})
</script>

<style lang="scss" scoped>
.point-circle {
  position: absolute;
  width: 4px;
  height: 4px;
  border: 1px solid var(--el-color-primary);
}
.point-rect-x {
  position: absolute;
  width: 20px;
  height: 4px;
  border-radius: 4px;
  border: 1px solid var(--el-color-primary);
}
.point-rect-x::before {
  content: '';
  position: absolute;
  top: 1px;
  left: v-bind(x);
  width: v-bind(width);
  height: 0;
  border-top: 1px dashed var(--el-color-primary);
}
.point-rect-x::after {
  content: '';
  position: absolute;
  top: 1px;
  right: v-bind(x);
  width: v-bind(width);
  height: 0;
  border-top: 1px dashed var(--el-color-primary);
}
.point-rect-y {
  position: absolute;
  width: 4px;
  height: 20px;
  border-radius: 4px;
  border: 1px solid var(--el-color-primary);
}
.point-rect-y::before {
  content: '';
  position: absolute;
  left: 1px;
  top: v-bind(y);
  height: v-bind(height);
  width: 0;
  border-left: 1px dashed var(--el-color-primary);
}
.point-rect-y::after {
  content: '';
  position: absolute;
  left: 1px;
  bottom: v-bind(y);
  width: 0;
  height: v-bind(height);
  border-left: 1px dashed var(--el-color-primary);
}
</style>
