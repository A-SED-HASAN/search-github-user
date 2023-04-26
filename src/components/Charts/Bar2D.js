import React from 'react'

import { Bar } from '@ant-design/plots'
import { useGlobalContext } from '../../context/context'

const Bar2D = ({ data }) => {
  const { isDarkMode, mainColor } = useGlobalContext()
  const config = {
    data,
    xField: 'value',
    yField: 'label',

    pattern: {
      type: 'line',
      cfg: {
        size: 1,
        padding: 1,
        rotation: 0,
        fill: '#FFF',
        isStagger: true,
      },
    },
    color: `${mainColor.main}`,

    barBackground: {
      style: {
        fill: isDarkMode ? 'rgba(255,255,255,.3)' : 'rgba(0,0,0,.3)',
      },
    },
    interactions: [
      {
        type: 'active-region',
        enable: true,
      },
    ],
  }
  return <Bar {...config} />
}

export default Bar2D
