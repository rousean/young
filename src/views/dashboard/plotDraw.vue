<template>
  <div class="plot-wrapper">
    <div class="painting-container">
      <div id="painting-bg"></div>
      <ProxyPlot v-for="plot in store.dashboard" :key="plot.UUID" :plot="plot"></ProxyPlot>
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineAsyncComponent } from 'vue'
import { useDashboardStore } from '@/stores/dashboard'
import { onMounted } from 'vue'
import * as d3 from 'd3'

const store = useDashboardStore()

const ProxyPlot = defineAsyncComponent(() => import('@/components/plot/index.vue'))
onMounted(() => {
  const width = 3840
  const height = 2100
  // 创建svg
  const svg = d3.select('#painting-bg').append('svg').attr('width', width).attr('height', height).append('g').attr('transform', 'translate(20, 20)')
  // 绘制X轴
  const xScale = d3.scaleLinear().domain([0, width]).range([0, width])
  svg
    .append('g')
    .call(d3.axisBottom(xScale).ticks(width / 20))
    .call((g) => g.select('.domain').remove())
    .call((g) => g.selectAll('.tick line').attr('y2', -2).attr('stroke', '#b2b2b2'))
    .call((g) => g.selectAll('.tick line').clone().attr('y2', height).attr('stroke', '#dcdfe6'))
    .call((g) => g.selectAll('.tick text').remove())
  svg
    .append('g')
    .call(d3.axisBottom(xScale).ticks(width / 200))
    .call((g) => g.select('.domain').remove())
    .call((g) => g.selectAll('.tick line').attr('y2', -10).attr('stroke', '#b2b2b2'))
    .call((g) => g.selectAll('.tick text').attr('y', -10).attr('x', 1).attr('text-anchor', 'start').attr('fill', '#b2b2b2'))
  const yScale = d3
    .scaleLinear()
    .domain([0, height])
    .range([0, height - 20])
  svg
    .append('g')
    .call(d3.axisRight(yScale).ticks(height / 200))
    .call((g) => g.select('.domain').remove())
    .call((g) => g.selectAll('.tick line').attr('x2', -10).attr('stroke', '#b2b2b2'))
    .call((g) => g.selectAll('.tick text').attr('x', -10).attr('style', 'writing-mode: tb').attr('fill', '#b2b2b2'))
  svg
    .append('g')
    .call(d3.axisRight(yScale).ticks(height / 20))
    .call((g) => g.select('.domain').remove())
    .call((g) => g.selectAll('.tick line').attr('x2', -2).attr('stroke', '#b2b2b2'))
    .call((g) => g.selectAll('.tick line').clone().attr('x2', width).attr('stroke', '#dcdfe6'))
    .call((g) => g.selectAll('.tick text').remove())
})
</script>

<style lang="scss" scoped>
.plot-wrapper {
  .painting-container {
    position: relative;
    width: 3840px;
    height: 2110px;
    padding: 20px;
    background: #fff;
    > :nth-child(1) {
      position: absolute;
      top: 0;
      left: 0;
      z-index: 0;
    }
  }
}
</style>
