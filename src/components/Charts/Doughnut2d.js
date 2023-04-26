import React from 'react'
import { Pie, measureTextWidth } from '@ant-design/plots'
import { useGlobalContext } from '../../context/context'

const Doughnut2d = ({ data }) => {
  const { isDarkMode } = useGlobalContext()

  function renderStatistic(containerWidth, text, style) {
    const { width: textWidth, height: textHeight } = measureTextWidth(
      text,
      style
    )
    const R = containerWidth / 2 // r^2 = (w / 2)^2 + (h - offsetY)^2

    let scale = 1

    if (containerWidth < textWidth) {
      scale = Math.min(
        Math.sqrt(
          Math.abs(
            Math.pow(R, 2) /
              (Math.pow(textWidth / 2, 2) + Math.pow(textHeight, 2))
          )
        ),
        1
      )
    }

    const textStyleStr = `width:${containerWidth}px;`
    return `<div style="${textStyleStr};color:${
      isDarkMode ? '#fff' : '#222'
    };font-size:${scale}em;line-height:${
      scale < 1 ? 1 : 'inherit'
    };">${text}</div>`
  }

  const config = {
    appendPadding: 10,
    data,
    angleField: 'value',
    colorField: 'label',
    radius: 1,
    innerRadius: 0.64,
    color: [
      '#ea5545',
      '#f46a9b',
      '#ef9b20',
      '#edbf33',
      '#ede15b',
      '#bdcf32',
      '#87bc45',
      '#27aeef',
      '#b33dc6',
    ].sort(() => 0.5 - Math.random()),
    label: {
      type: 'inner',
      offset: '-50%',
      style: {
        textAlign: 'center',
      },
      autoRotate: true,
      content: '{value}',
    },
    legend: {
      title: {
        text: 'Stars Per Languages',
        spacing: 15,
        style: {
          fill: isDarkMode ? '#fff' : '#222',
        },
      },
      layout: 'vertical',
      position: 'right-bottom',
    },
    statistic: {
      title: {
        offsetY: -4,
        customHtml: (container, view, datum) => {
          const { width, height } = container.getBoundingClientRect()
          const d = Math.sqrt(Math.pow(width / 2, 2) + Math.pow(height / 2, 2))
          const text = datum ? datum.label : 'All Stars'
          return renderStatistic(d, text, {
            fontSize: 28,
          })
        },
      },
      content: {
        offsetY: 4,
        style: {
          fontSize: '32px',
        },
        customHtml: (container, view, datum, data) => {
          const { width } = container.getBoundingClientRect()
          const text = datum
            ? `${datum.value}`
            : `${data.reduce((r, d) => r + d.value, 0)}`
          return renderStatistic(width, text, {
            fontSize: 32,
          })
        },
      },
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

export default Doughnut2d
