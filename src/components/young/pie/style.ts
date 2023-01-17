interface Style {
  width: number
  height: number
  [prop: string]: any
}

const style: Style = {
  width: 200,
  height: 200,
  nightingaleRose: false,
  outerRadius: 0.4,
  innerRadius: 0.2,
  cornerRadius: 10,
  padAngle: 0.01,
  showX: true,
  xFontSize: 12,
  xFontColor: '#000'
}
export default style
