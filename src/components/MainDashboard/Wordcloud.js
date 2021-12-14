import React from 'react';
import '../styles/Wordcloud.css';
import 'd3-transition';
import ReactWordcloud from 'react-wordcloud';
import words from './words';

export default function Wordcloud() {
  const options = {
    colors: ['#1f77b4', '#ff7f0e', '#2ca02c', '#d62728', '#9467bd', '#8c564b'],
    enableTooltip: true,
    deterministic: false,
    fontFamily: 'impact',
    fontSizes: [5, 60],
    fontStyle: 'normal',
    fontWeight: 'normal',
    padding: 1,
    rotations: 3,
    rotationAngles: [0, 90],
    scale: 'sqrt',
    spiral: 'archimedean',
    transitionDuration: 1000,
  };

  return (
    <div className='widgetSm'>
      <div
        style={{ height: '350px', width: '750px', justifyContent: 'center' }}
      >
        <ReactWordcloud options={options} words={words} className='WordCloud' />
      </div>
    </div>
  );
}
