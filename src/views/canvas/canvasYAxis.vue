<template>
  <svg id="canvas-y-axis"></svg>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { useDashboardStore } from '@/stores/dashboard'
import { debounce } from '@/util/index'
import * as d3 from 'd3'
const store = useDashboardStore()

store.$subscribe(
  debounce(() => {
    d3.select('#canvas-y-axis g').remove()
    const height = store.dashboard.height
    paintingYAxis(height)
  }, 500)
)

onMounted(() => {
  const height = store.dashboard.height
  paintingYAxis(height)
})
function paintingYAxis(height: number) {
  const svg = d3.select('#canvas-y-axis').attr('width', 20).attr('height', height).append('g').attr('transform', 'translate(20, 0)')
  const yScale = d3.scaleLinear().domain([0, height]).range([0, height])
  svg
    .append('g')
    .call(d3.axisRight(yScale).ticks(height / 200))
    .call((g) => g.select('.domain').remove())
    .call((g) => g.selectAll('.tick line').attr('x2', -10).attr('stroke', '#b2b2b2'))
    .call((g) => g.selectAll('.tick text').attr('x', -10).attr('style', 'writing-mode: tb').attr('fill', '#b2b2b2'))
  svg
    .append('g')
    .call(d3.axisRight(yScale).ticks(height / 20))
    .call((g) => g.select('.domain').attr('stroke', '#b2b2b2'))
    .call((g) => g.selectAll('.tick line').attr('x2', -2).attr('stroke', '#b2b2b2'))
    .call((g) => g.selectAll('.tick text').remove())
}
</script>
