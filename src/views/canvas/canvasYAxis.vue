<template>
  <svg id="canvas-y-axis"></svg>
</template>

<script setup lang="ts">
import { onMounted, watch } from 'vue'
import { useDashboardStore } from '@/stores/dashboard'
import { debounce } from '@/util/index'
import type * as d3 from 'd3'
import { selectSvg, appendGroup, scaleLinear, axisLeft, appendYLineScale, appendYTextScale } from '@/hooks/axis'

const store = useDashboardStore()

onMounted(() => paintingYAxis(store.dashboard.height))

watch(
  () => store.dashboard.height,
  debounce((val) => rePainting(val), 1000)
)

let svg: d3.Selection<d3.BaseType, unknown, HTMLElement, any>
let lineScale: d3.Selection<SVGGElement, unknown, HTMLElement, any> // 刻度线
let textScale: d3.Selection<SVGGElement, unknown, HTMLElement, any> // 刻度值

// 初始化绘制
const paintingYAxis = (height: number): void => {
  svg = selectSvg('#canvas-y-axis', 20, height)
  const group = appendGroup(svg, 20, 0)
  lineScale = group.append('g')
  textScale = group.append('g')
  const yScale = scaleLinear(0, height)
  appendYLineScale(lineScale, axisLeft(yScale, height / 20))
  appendYTextScale(textScale, axisLeft(yScale, height / 200))
}

// 重绘
const rePainting = (height: number): void => {
  svg.attr('height', height)
  const yScale = scaleLinear(0, height)
  appendYLineScale(lineScale, axisLeft(yScale, height / 20))
  appendYTextScale(textScale, axisLeft(yScale, height / 200))
}
</script>
