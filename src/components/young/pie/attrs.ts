import type { Attrs } from '@/types/global.type'

const attrs: Attrs[] = [
  {
    label: '基础配置',
    children: [
      {
        label: '外半径',
        type: 'text',
        name: 'outerRadius',
        row: true
      },
      {
        label: '内半径',
        type: 'text',
        name: 'innerRadius'
      },
      {
        label: '边角半径测试',
        type: 'text',
        name: 'cornerRadius',
        row: true
      },
      {
        label: '区间间隙',
        type: 'text',
        name: 'padAngle',
        row: true
      }
    ]
  },
  {
    label: 'X轴',
    children: [
      {
        label: '显示X轴',
        type: 'switch',
        name: 'showX',
        children: [
          {
            label: '字体大小',
            type: 'number',
            name: 'xFontSize',
            row: true
          },
          {
            label: '字体颜色',
            type: 'number',
            name: 'xFontColor',
            row: true
          }
        ]
      }
    ]
  }
]
export default attrs
