export const plotList = [
  {
    label: '线形图',
    icon: 'line-small',
    children: [
      {
        label: '折线图',
        type: 'pie',
        icon: 'line'
      },
      {
        label: '面积图',
        type: 'pie',
        icon: 'area'
      }
    ]
  },
  {
    label: '柱状图',
    icon: 'histogram-small',
    children: [
      {
        label: '柱状图',
        type: 'line',
        icon: 'histogram'
      },
      {
        label: '条形图',
        type: 'line',
        icon: 'bar'
      },
      {
        label: '柱状堆叠图',
        type: 'line',
        icon: 'stacked-bar'
      },
      {
        label: '面积图',
        type: 'line',
        icon: 'area'
      }
    ]
  }
]
