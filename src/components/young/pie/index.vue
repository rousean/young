<template>
  <svg :id="id"></svg>
</template>

<script setup lang="ts">
import { computed, onMounted, watch } from 'vue'
import * as d3 from 'd3'

const props = defineProps({
  plot: {
    type: Object,
    required: true
  }
})

const id = computed(() => `Young-${props.plot.id}`)

watch(
  [() => props.plot.style, () => props.plot.data],
  (val) => {
    d3.select(`#${id.value} g`).remove()
    console.log(val)
    new Pie({
      id: id.value,
      data: props.plot.data,
      width: props.plot.style.width,
      height: props.plot.style.height,
      nightingaleRose: props.plot.style.nightingaleRose,
      outerRadius: props.plot.style.outerRadius,
      innerRadius: props.plot.style.innerRadius,
      cornerRadius: props.plot.style.cornerRadius,
      padAngle: props.plot.style.padAngle
    })
  },
  {
    deep: true
  }
)

interface Option {
  id: string
  data: PieData[]
  width: number
  height: number
  nightingaleRose: boolean
  outerRadius: number
  innerRadius: number
  cornerRadius: number
  padAngle: number
}

interface PieData {
  name: string
  value: number
}

class Pie {
  id: string
  data: PieData[]
  width: number
  height: number
  nightingaleRose: boolean
  outerRadius: number
  innerRadius: number
  cornerRadius: number
  padAngle: number
  svg: any
  constructor(option: Option) {
    const { id, width, height, data, nightingaleRose, outerRadius, innerRadius, cornerRadius, padAngle } = option
    this.id = id
    this.data = data
    this.width = width
    this.height = height
    this.nightingaleRose = nightingaleRose // 南丁格尔玫瑰图模式
    this.outerRadius = outerRadius * this.width // 外半径
    this.innerRadius = innerRadius * this.width // 内半径
    this.cornerRadius = cornerRadius // 边角半径
    this.padAngle = padAngle // 饼图间隙
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
      .attr('width', this.width)
      .attr('height', this.height)
      .append('g')
      .attr('transform', `translate(${this.width / 2}, ${this.height / 2})`)
  }

  createPie() {
    const values = this.data.map((item) => item.value)
    const max: number = d3.max(values) as number
    // 构建比例尺 南丁格尔模式使用
    const lineScale = d3.scaleLinear().domain([0, max]).range([this.innerRadius, this.outerRadius])
    const arc = d3
      .arc()
      .innerRadius(this.innerRadius)
      .outerRadius((d: any) => (this.nightingaleRose ? lineScale(d.value) : this.outerRadius))
      .cornerRadius(this.cornerRadius)
    const pie = d3
      .pie()
      .padAngle(this.padAngle)
      .value((d: any) => d.value)(this.data as unknown as (number | { valueOf(): number })[])
    pie.forEach((item: any) => {
      item.color = d3.interpolateRainbow(item.index / pie.length)
    })
    const pieGroup = this.svg
      .selectAll('g')
      .data(pie)
      .enter()
      .append('g')
      .on('mouseover', (e: any, d: any) => {
        d3.select(e.currentTarget).transition().duration(250).attr('transform', this.calcTranslate(d, 6))
        d3.select(e.currentTarget)
          .select('path')
          .attr('stroke', (d: any): any => d3.hsl(d.color).darker(1))
      })
      .on('mouseout', (e: any) => {
        d3.select(e.currentTarget).transition().duration(250).attr('transform', 'translate(0, 0)')
        d3.select(e.currentTarget)
          .select('path')
          .attr('stroke', (d: any) => d.color)
      })
    pieGroup
      .append('path')
      .attr('d', arc)
      .attr('fill', (d: any) => d.color)
      .attr('stroke', (d: any) => d.color)
      .attr('opacity', 0.9)
    pieGroup
      .append('text')
      .attr('transform', (d: any) => `translate(${arc.centroid(d)})`)
      .text((d: any) => d.data.name)
      .attr('text-anchor', 'middle')
      .attr('font-size', 12)
      .style('display', (d: any) => (d.endAngle - d.startAngle > Math.PI / 8 ? 'inline' : 'none'))
  }

  calcTranslate(d: any, move: number) {
    const moveAngle = d.startAngle + (d.endAngle - d.startAngle) / 2
    return `translate(${-move * Math.cos(moveAngle + Math.PI / 2)}, ${-move * Math.sin(moveAngle + Math.PI / 2)})`
  }
}
onMounted(() => {
  new Pie({
    id: id.value,
    data: props.plot.data,
    width: props.plot.style.width,
    height: props.plot.style.height,
    nightingaleRose: props.plot.style.nightingaleRose,
    outerRadius: props.plot.style.outerRadius,
    innerRadius: props.plot.style.innerRadius,
    cornerRadius: props.plot.style.cornerRadius,
    padAngle: props.plot.style.padAngle
  })
})
</script>
