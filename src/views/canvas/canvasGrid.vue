<template>
  <svg id="canvas-grid"></svg>
</template>

<script setup lang="ts">
import { onMounted, watch } from 'vue'
import { useDashboardStore } from '@/stores/dashboard'
import { debounce } from '@/util/index'
import type * as d3 from 'd3'
import { selectSvg, scaleLinear, axisTop, axisLeft, appendXGrid, appendYGrid } from '@/hooks/axis'

const store = useDashboardStore()

onMounted(() => paintingGrid(store.dashboard.width, store.dashboard.height))

watch(
  [() => store.dashboard.width, () => store.dashboard.height],
  debounce((val) => rePainting(val[0], val[1]), 1000)
)

let svg: d3.Selection<d3.BaseType, unknown, HTMLElement, any>
let xGrid: d3.Selection<SVGGElement, unknown, HTMLElement, any>
let yGrid: d3.Selection<SVGGElement, unknown, HTMLElement, any>

// 初始化绘制
const paintingGrid = (width: number, height: number): void => {
  svg = selectSvg('#canvas-grid', width, height)
  xGrid = svg.append('g')
  yGrid = svg.append('g')
  const xScale = scaleLinear(0, width)
  const yScale = scaleLinear(0, height)
  appendXGrid(xGrid, axisTop(xScale, width / 20), height)
  appendYGrid(yGrid, axisLeft(yScale, height / 20), width)
}

// 重绘
const rePainting = (width: number, height: number): void => {
  svg.attr('width', width).attr('height', height)
  const xScale = scaleLinear(0, width)
  const yScale = scaleLinear(0, height)
  appendXGrid(xGrid, axisTop(xScale, width / 20), height)
  appendYGrid(yGrid, axisLeft(yScale, height / 20), width)
}
</script>
