import * as d3 from 'd3'

// 创建比例尺
export const scaleLinear = (start: number, end: number) => d3.scaleLinear().domain([start, end]).range([start, end])
// 坐标轴
export const axisTop = (scale: d3.ScaleLinear<number, number, never>, tick: number) => d3.axisTop(scale).ticks(tick)

export const axisLeft = (scale: d3.ScaleLinear<number, number, never>, tick: number) => d3.axisLeft(scale).ticks(tick)

// 获取dom
export const selectSvg = (select: string, width: number, height: number) => d3.select(select).attr('width', width).attr('height', height)

// 添加group
export const appendGroup = (svg: d3.Selection<d3.BaseType, unknown, HTMLElement, any>, x: number, y: number) => svg.append('g').attr('transform', `translate(${x}, ${y})`)

// 添加刻度
export const appendXLineScale = (g: d3.Selection<SVGGElement, unknown, HTMLElement, any>, scale: d3.Axis<d3.NumberValue>) => {
  g.call(scale)
    .call((g) => g.select('.domain').attr('stroke', '#b2b2b2'))
    .call((g) => g.selectAll('.tick line').attr('y2', -2).attr('stroke', '#b2b2b2'))
    .call((g) => g.selectAll('.tick text').remove())
}

// 添加坐标
export const appendXTextScale = (g: d3.Selection<SVGGElement, unknown, HTMLElement, any>, scale: d3.Axis<d3.NumberValue>) => {
  g.call(scale)
    .call((g) => g.select('.domain').remove())
    .call((g) => g.selectAll('.tick line').attr('y2', -5).attr('stroke', '#b2b2b2'))
    .call((g) => g.selectAll('.tick text').attr('y', -5).attr('x', 1).attr('text-anchor', 'start').attr('fill', '#b2b2b2'))
}

// 添加刻度
export const appendYLineScale = (g: d3.Selection<SVGGElement, unknown, HTMLElement, any>, scale: d3.Axis<d3.NumberValue>) => {
  g.call(scale)
    .call((g) => g.select('.domain').attr('stroke', '#b2b2b2'))
    .call((g) => g.selectAll('.tick line').attr('x2', -2).attr('stroke', '#b2b2b2'))
    .call((g) => g.selectAll('.tick text').remove())
}

// 添加坐标
export const appendYTextScale = (g: d3.Selection<SVGGElement, unknown, HTMLElement, any>, scale: d3.Axis<d3.NumberValue>) => {
  g.call(scale)
    .call((g) => g.select('.domain').remove())
    .call((g) => g.selectAll('.tick line').attr('x2', -5).attr('stroke', '#b2b2b2'))
    .call((g) => g.selectAll('.tick text').attr('x', -10).attr('y', 5).attr('fill', '#b2b2b2').attr('text-anchor', 'middle').attr('style', 'writing-mode: tb'))
}

export const appendXGrid = (g: d3.Selection<SVGGElement, unknown, HTMLElement, any>, scale: d3.Axis<d3.NumberValue>, y: number) => {
  g.call(scale)
    .call((g) => g.select('.domain').remove())
    .call((g) => g.selectAll('.tick text').remove())
    .call((g) => g.selectAll('.tick line').attr('y2', y).attr('fill', '#dcdfe6').attr('stroke-width', '0.2').attr('stroke-opacity', '0.2'))
}

export const appendYGrid = (g: d3.Selection<SVGGElement, unknown, HTMLElement, any>, scale: d3.Axis<d3.NumberValue>, x: number) => {
  g.call(scale)
    .call((g) => g.select('.domain').remove())
    .call((g) => g.selectAll('.tick text').remove())
    .call((g) => g.selectAll('.tick line').attr('x2', x).attr('fill', '#dcdfe6').attr('stroke-width', '0.2').attr('stroke-opacity', '0.2'))
}
