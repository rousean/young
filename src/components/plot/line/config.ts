export default {
  configure: [
    {
      label: '基础配置',
      children: [
        {
          label: '图表标题',
          type: 'text',
          name: 'titleName',
          value: '折线图示例'
        },
        {
          label: '图表宽度',
          type: 'number',
          name: 'width',
          value: 100
        }
      ]
    },
    {
      label: 'X轴',
      children: [
        {
          label: '显示X轴',
          type: 'boolean',
          children: [
            {
              label: 'X轴名称',
              type: 'text',
              name: 'xAxisName'
            }
          ]
        }
      ]
    }
  ]
}
