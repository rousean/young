interface Style {
  width: number
  height: number
  [prop: string]: any
}

const style: Style = {
  width: 200,
  height: 200,
  nightingaleRose: false,
  outerRadius: 0.8,
  innerRadius: 0.6,
  cornerRadius: 10,
  padAngel: 0.01
}
export default style
