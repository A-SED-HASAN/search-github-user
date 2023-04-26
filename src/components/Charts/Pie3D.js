import React from 'react'

import { Pie } from '@ant-design/plots'
import { useGlobalContext } from '../../context/context'

const Pie3D = ({ data }) => {
  const { isDarkMode } = useGlobalContext()
  const config = {
    appendPadding: 10,
    data,
    angleField: 'value',
    colorField: 'label',
    color: [
      '#fd7f6f',
      '#7eb0d5',
      '#b2e061',
      '#bd7ebe',
      '#ffb55a',
      '#ffee65',
      '#beb9db',
      '#fdcce5',
      '#8bd3c7',
    ].sort(() => 0.5 - Math.random()),
    radius: 0.9,
    label: {
      type: 'inner',
      offset: '-50%',
      style: {
        textAlign: 'center',
      },
      autoRotate: true,
      content: '{name} : {value}',
    },

    legend: {
      title: {
        text: 'Most Used Languages',
        spacing: 15,
        style: {
          fill: isDarkMode ? '#fff' : '#222',
        },
      },

      layout: 'vertical',
      position: 'right-bottom',
    },

    interactions: [
      {
        type: 'element-selected',
      },
      {
        type: 'element-active',
      },
      {
        type: 'pie-statistic-active',
      },
    ],
  }

  return <Pie {...config} />
}

export default Pie3D
