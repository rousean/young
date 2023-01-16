<template>
  <svg id="canvas-x-axis"></svg>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { useDashboardStore } from '@/stores/dashboard'
import { debounce } from '@/util/index'
import * as d3 from 'd3'

const store = useDashboardStore()

const t = d3.transition().duration(500)

store.$subscribe(
  debounce((muatation, state) => {
    if (muatation.events.key === 'width') {
      console.log(muatation, state)
      console.log(111)
      const width = store.dashboard.width
      svg.attr('width', width)
      const xScale = d3.scaleLinear().domain([0, width]).range([0, width])
      console.log(svg.select('.x-200'))
      svg
        .select('.x-200')
        .call(d3.axisBottom(xScale).ticks(width / 200))
        .call((g) => g.select('.domain').remove())
        .call((g) => g.selectAll('.tick line').attr('y2', -10).attr('stroke', '#b2b2b2'))
        .call((g) => g.selectAll('.tick text').attr('y', -10).attr('x', 1).attr('text-anchor', 'start').attr('fill', '#b2b2b2'))
      svg
        .select('.x-20')
        .call(d3.axisBottom(xScale).ticks(width / 20))
        .call((g) => g.select('.domain').attr('stroke', '#b2b2b2'))
        .call((g) => g.selectAll('.tick line').attr('y2', -2).attr('stroke', '#b2b2b2'))
        .call((g) => g.selectAll('.tick text').remove())
    }
  }, 500)
)

let svg: d3.Selection<d3.BaseType, unknown, HTMLElement, any>

onMounted(() => {
  const width = store.dashboard.width
  paintingXAxis(width)
})
function paintingXAxis(width: number): void {
  svg = d3.select('#canvas-x-axis').attr('width', width).attr('height', 20)
  const g = svg.append('g').attr('transform', 'translate(0, 20)')
  const xScale = d3.scaleLinear().domain([0, width]).range([0, width])
  g.append('g')
    .attr('class', 'x-200')
    .call(d3.axisBottom(xScale).ticks(width / 200))
    .call((g) => g.select('.domain').remove())
    .call((g) => g.selectAll('.tick line').attr('y2', -10).attr('stroke', '#b2b2b2'))
    .call((g) => g.selectAll('.tick text').attr('y', -10).attr('x', 1).attr('text-anchor', 'start').attr('fill', '#b2b2b2'))
  g.append('g')
    .attr('class', 'x-20')
    .call(d3.axisBottom(xScale).ticks(width / 20))
    .call((g) => g.select('.domain').attr('stroke', '#b2b2b2'))
    .call((g) => g.selectAll('.tick line').attr('y2', -2).attr('stroke', '#b2b2b2'))
    .call((g) => g.selectAll('.tick text').remove())
}
</script>
