import { useState, useEffect } from 'react';
import '../styles/Wordcloud.css';
import 'd3-transition';
import ReactWordcloud from 'react-wordcloud';
// import words from './words';

export default function Wordcloud({ posts }) {
  const [words, setWords] = useState();
  const options = {
    colors: ['#1f77b4', '#ff7f0e', '#2ca02c', '#d62728', '#9467bd', '#8c564b'],
    enableTooltip: true,
    deterministic: false,
    fontFamily: 'impact',
    fontSizes: [15, 40],
    fontStyle: 'normal',
    fontWeight: 'normal',
    padding: 1,
    rotations: 3,
    rotationAngles: [-180, 360],
    scale: 'sqrt',
    spiral: 'archimedean',
    transitionDuration: 1000,
  };

  useEffect(() => {
    let entities = [];
    let entityValues = [];
    // let keyVal = [];
    !!posts.length && posts.map((post) => entities.push(...post.entity));
    entities.map((entity) => {
      for (let item of Object.keys(entity)) {
        entityValues.push(item);
      }
      // for (let [key, val] of Object.entries(entity)) {
      //   // console.log({ key, val });
      //   keyVal.push(key);
      //   keyVal.push(val);
      // }
    });
    // console.log(keyVal);
    const newStr = entityValues.reduce((acc, rec) => {
      return { ...acc, [rec]: (acc[rec] || 0) + 1 };
    }, {});
    // console.log(newStr);
    let textCountArr = [];
    for (let [key, value] of Object.entries(newStr)) {
      textCountArr.push({ text: key, value: value });
    }
    setWords(textCountArr);
  }, [posts]);

  return (
    <div className='widgetSm'>
      <div style={{ height: '350px', width: '100%', justifyContent: 'center' }}>
        <ReactWordcloud options={options} words={words} className='WordCloud' />
      </div>
    </div>
  );
}
