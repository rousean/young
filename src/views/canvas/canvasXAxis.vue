<template>
  <svg id="canvas-x-axis"></svg>
</template>

<script setup lang="ts">
import { onMounted, watch } from 'vue'
import { useDashboardStore } from '@/stores/dashboard'
import { debounce } from '@/util/index'
import type d3 from 'd3'
import { selectSvg, appendGroup, scaleLinear, axisTop, appendXLineScale, appendXTextScale } from '@/hooks/axis'

const store = useDashboardStore()

onMounted(() => paintingXAxis(store.dashboard.width))

watch(
  () => store.dashboard.width,
  debounce((val) => rePainting(val), 1000)
)

let svg: d3.Selection<d3.BaseType, unknown, HTMLElement, any>
let lineScale: d3.Selection<SVGGElement, unknown, HTMLElement, any> // 刻度线
let textScale: d3.Selection<SVGGElement, unknown, HTMLElement, any> // 刻度值

// 初始化绘制
const paintingXAxis = (width: number): void => {
  svg = selectSvg('#canvas-x-axis', width, 20)
  const group = appendGroup(svg, 0, 20)
  lineScale = group.append('g')
  textScale = group.append('g')
  const xScale = scaleLinear(0, width)
  appendXLineScale(lineScale, axisTop(xScale, width / 20))
  appendXTextScale(textScale, axisTop(xScale, width / 200))
}

// 重绘
const rePainting = (width: number): void => {
  svg.attr('width', width)
  const xScale = scaleLinear(0, width)
  appendXLineScale(lineScale, axisTop(xScale, width / 20))
  appendXTextScale(textScale, axisTop(xScale, width / 200))
}
</script>
