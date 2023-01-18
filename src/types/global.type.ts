export interface Style {
  width: number
  height: number
  [prop: string]: any
}

export interface Children {
  label: string
  type: string
  name: string
  children?: Children[] | Array<Children[]>
  [prop: string]: any
}

export interface Attrs {
  label: string
  children: Children[] | Array<Children[]>
}

// 仪表盘属性
export interface Dashboard {
  id: string
  width: number
  height: number
  name: string
  scale: number
  canvas: Canvas[]
}

// 画布属性
export interface Canvas {
  id: string
  type: string
  x: number
  y: number
  zIndex: number
  rotate: number
  context: boolean
  data: any
  style: Style
  attrs: any
}
