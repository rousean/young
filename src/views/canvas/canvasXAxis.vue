<template>
  <svg id="canvas-x-axis"></svg>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { useDashboardStore } from '@/stores/dashboard'
import * as d3 from 'd3'
const store = useDashboardStore()
const width = store.dashboard.width

store.$subscribe((mutation, state) => {
  console.log(state.dashboard)
})

onMounted(() => {
  paintingXAxis()
})
function paintingXAxis() {
  // 创建svg
  const svg = d3.select('#canvas-x-axis').attr('width', width).attr('height', 20).append('g').attr('transform', 'translate(0, 20)')
  // 绘制X轴
  const xScale = d3.scaleLinear().domain([0, width]).range([0, width])
  svg
    .append('g')
    .call(d3.axisBottom(xScale).ticks(width / 200))
    .call((g) => g.select('.domain').remove())
    .call((g) => g.selectAll('.tick line').attr('y2', -10).attr('stroke', '#b2b2b2'))
    .call((g) => g.selectAll('.tick text').attr('y', -10).attr('x', 1).attr('text-anchor', 'start').attr('fill', '#b2b2b2'))
  svg
    .append('g')
    .call(d3.axisBottom(xScale).ticks(width / 20))
    .call((g) => g.select('.domain').attr('stroke', '#b2b2b2'))
    .call((g) => g.selectAll('.tick line').attr('y2', -2).attr('stroke', '#b2b2b2'))
    .call((g) => g.selectAll('.tick text').remove())
}
</script>
