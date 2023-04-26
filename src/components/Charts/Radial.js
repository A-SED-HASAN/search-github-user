import React from 'react'
import { RadialBar } from '@ant-design/plots'
import { useGlobalContext } from '../../context/context'

const Radial = ({ data }) => {
  const { isDarkMode, mainColor } = useGlobalContext()

  const config = {
    data,

    xField: 'label',
    yField: 'value',
    radius: 1,
    innerRadius: 0.4,
    startAngle: Math.PI * 0.5,
    endAngle: Math.PI * 2.5,

    type: 'square',
    color: `${mainColor.main}`,
    annotations: [
      {
        type: 'text',
        position: ['50%', '50%'],
        content: 'Most Forked',
        style: {
          textAlign: 'center',
          fontSize: 24,
          fill: isDarkMode ? '#fff' : '#222',
        },
      },
    ],
  }
  return <RadialBar {...config} />
}

export default Radial
