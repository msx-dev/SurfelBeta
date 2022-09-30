import React from 'react';
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

export default function GrowthChartNeg({absoluteValue, normalValue}) {
  return (
    <>
        <CircularProgressbar styles={{
    // Customize the root svg element
    root: {},
    // Customize the path, i.e. the "completed progress"
    path: {
      // Path color
      stroke: `rgba(171, 55, 55, ${absoluteValue * 30 / 100})`,
      // Customize transition animation
      transition: 'stroke-dashoffset 0.5s ease 0s',
      // Rotate the path
      transformOrigin: 'center center',
    },
    // Customize the circle behind the path, i.e. the "total progress"
    trail: {
      // Trail color
      stroke: 'transparent',
      // Rotate the trail
      transformOrigin: 'center center',
    },
    // Customize the text
    text: {
      // Text color
      fill: 'rgba(171, 55, 55, 1)',
      // Text size
      fontSize: '16px',
    },
    // Customize background - only used when the `background` prop is true
    background: {
      fill: '#aabfb0',
    },
  }} value={absoluteValue} text={`${normalValue}%`} strokeWidth={4}/>;
    </>
  )
}
