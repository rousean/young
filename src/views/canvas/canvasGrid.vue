<template>
  <svg id="canvas-grid"></svg>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { useDashboardStore } from '@/stores/dashboard'
import { debounce } from '@/util/index'
import * as d3 from 'd3'
const store = useDashboardStore()

store.$subscribe(
  debounce(() => {
    d3.select('#canvas-grid g').remove()
    const width = store.dashboard.width
    const height = store.dashboard.height
    paintingGrid(width, height)
  }, 500)
)

onMounted(() => {
  const width = store.dashboard.width
  const height = store.dashboard.height
  paintingGrid(width, height)
})
function paintingGrid(width: number, height: number): void {
  const svg = d3.select('#canvas-grid').attr('width', width).attr('height', height).append('g')
  const xScale = d3.scaleLinear().domain([0, width]).range([0, width])
  svg
    .append('g')
    .call(d3.axisBottom(xScale).ticks(width / 20))
    .call((g) => g.select('.domain').remove())
    .call((g) => g.selectAll('.tick text').remove())
    .call((g) => g.selectAll('.tick line').attr('y2', height).attr('stroke', '#dcdfe6').attr('stroke-opacity', '0.6'))
  const yScale = d3.scaleLinear().domain([0, height]).range([0, height])
  svg
    .append('g')
    .call(d3.axisRight(yScale).ticks(height / 20))
    .call((g) => g.select('.domain').remove())
    .call((g) => g.selectAll('.tick text').remove())
    .call((g) => g.selectAll('.tick line').attr('x2', width).attr('stroke', '#dcdfe6').attr('stroke-opacity', '0.6'))
}
</script>
