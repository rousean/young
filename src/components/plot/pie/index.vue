<template>
  <div :id="ID" style="width: 400px; height: 400px"></div>
</template>

<script setup lang="ts">
import * as d3 from 'd3'
import { computed, onMounted } from 'vue'

import config from './config'
import data from './data'
import style from './style'

const props = defineProps({
  plot: {
    type: Object,
    required: true
  }
})

const ID = computed(() => `Young-${props.plot.id}`)

// interface Option {
//   id: any
//   data: any
//   width?: any
//   height?: any
//   NightingaleRose?: any
//   outerRadius?: any
//   innerRadius?: any
//   cornerRadius?: any
//   padAngle?: any
// }

interface PieData {
  name: string
  value: number
}

class Pie {
  id: string
  data: PieData[]
  constructor(option) {
    const { id, width, height, data, nightingaleRose, outerRadius, innerRadius, cornerRadius, padAngle } = option
    this.id = id
    this.data = data
    this.width = width || 200
    this.height = height || 200
    this.nightingaleRose = nightingaleRose || false // 南丁格尔玫瑰图模式
    this.outerRadius = outerRadius || this.width / 3 // 外半径
    this.innerRadius = innerRadius || this.width / 4 // 内半径
    this.cornerRadius = cornerRadius || 10 // 边角半径
    this.padAngle = padAngle || 0.01 // 饼图间隙
    this.svg = null
    this.init()
  }

  init() {
    this.createElement()
    this.createPie()
  }

  createElement() {
    this.svg = d3
      .select(`#${this.id}`)
      .append('svg')
      .attr('width', this.width)
      .attr('height', this.height)
      .append('g')
      .attr('transform', `translate(${this.width / 2}, ${this.height / 2})`)
  }

  createPie() {
    // 构建比例尺 南丁格尔模式使用
    const lineScale = d3
      .scaleLinear()
      .domain([0, d3.max(this.data.map((item) => item.value))])
      .range([this.innerRadius, this.outerRadius])
    const arc = d3
      .arc()
      .innerRadius(this.innerRadius)
      .outerRadius((d) => (this.NightingaleRose ? lineScale(d.value) : this.outerRadius))
      .cornerRadius(this.cornerRadius)
    const pie = d3
      .pie()
      .padAngle(this.padAngle)
      .value((d) => d.value)(this.data)
    pie.forEach((item) => {
      item.color = d3.interpolateRainbow(item.index / pie.length)
    })
    const pieGroup = this.svg
      .selectAll('g')
      .data(pie)
      .enter()
      .append('g')
      .on('mouseover', (event, d) => {
        d3.select(event.currentTarget).transition().duration(250).attr('transform', this.calcTranslate(d, 6))
        d3.select(event.currentTarget)
          .select('path')
          .attr('stroke', (d) => d3.hsl(d.color).darker(1))
      })
      .on('mouseout', (event, d) => {
        d3.select(event.currentTarget).transition().duration(250).attr('transform', 'translate(0, 0)')
        d3.select(event.currentTarget)
          .select('path')
          .attr('stroke', (d) => d.color)
      })
    pieGroup
      .append('path')
      .attr('d', arc)
      .attr('fill', (d) => d.color)
      .attr('stroke', (d) => d.color)
      .attr('opacity', 0.9)
    pieGroup
      .append('text')
      .attr('transform', (d) => `translate(${arc.centroid(d)})`)
      .text((d) => d.data.name)
      .attr('text-anchor', 'middle')
      .attr('font-size', 12)
      .style('display', (d) => (d.endAngle - d.startAngle > Math.PI / 8 ? 'inline' : 'none'))
  }

  calcTranslate(d, move) {
    const moveAngle = d.startAngle + (d.endAngle - d.startAngle) / 2
    return `translate(${-move * Math.cos(moveAngle + Math.PI / 2)}, ${-move * Math.sin(moveAngle + Math.PI / 2)})`
  }
}
onMounted(() => {
  new Pie({
    id: ID.value,
    data
  })
})
</script>
