const config = [
  {
    label: '基础配置',
    children: [
      {
        label: '外半径',
        type: 'slide',
        name: 'outerRadius'
      },
      {
        label: '内半径',
        type: 'slide',
        name: 'innerRadius'
      },
      {
        label: '边角半径',
        type: 'number',
        name: 'cornerRadius'
      },
      {
        label: '区间间隙',
        type: 'slide',
        nmae: 'padAngel'
      }
    ]
  },
  {
    label: 'X轴',
    children: [
      {
        label: '显示X轴',
        type: 'boolean',
        name: 'showX',
        children: [
          {
            label: '字体大小',
            type: 'number',
            name: 'xFontSize'
          },
          {
            label: '字体颜色',
            type: 'number',
            name: 'xFontColor'
          }
        ]
      }
    ]
  }
]
export default config
