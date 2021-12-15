import { useState, useEffect } from 'react';
import StackedBarGraph from './StackedBarGraph';

const D3BarGraph = ({ posts }) => {
  const [keys, setKeys] = useState(['Positive', 'Negative']);
  const [selectedYear, setSelectedYear] = useState(2021);
  const [data, setData] = useState([
    {
      name: 'Jan',
      Positive: 0,
      Negative: 0,
    },
    {
      name: 'Feb',
      Positive: 0,
      Negative: 0,
    },
    {
      name: 'Mar',
      Positive: 0,
      Negative: 0,
    },
    {
      name: 'Apr',
      Positive: 0,
      Negative: 0,
    },
    {
      name: 'May',
      Positive: 0,
      Negative: 0,
    },

    {
      name: 'Jun',
      Positive: 0,
      Negative: 0,
    },
    {
      name: 'Jul',
      Positive: 0,
      Negative: 0,
    },
    {
      name: 'Aug',
      Positive: 0,
      Negative: 0,
    },
    {
      name: 'Sep',
      Positive: 0,
      Negative: 0,
    },
    {
      name: 'Oct',
      Positive: 0,
      Negative: 0,
    },
    {
      name: 'Nov',
      Positive: 0,
      Negative: 0,
    },

    {
      name: 'Dec',
      Positive: 0,
      Negative: 0,
    },
  ]);
  const colors = {
    Positive: '#32D583',
    Negative: '#FF6868',
  };

  useEffect(() => {
    console.log('---d3 effect---', data);
    !!posts.length &&
      posts
        .filter((post) => post?.created_on.includes(selectedYear))
        .map((post) => {
          const month = Number(post?.created_on.split('-')?.[1]);
          let postObj = data[month - 1];
          post.sentiment === 'POSITIVE'
            ? (postObj['Positive'] = postObj['Positive'] + 1)
            : (postObj['Negative'] = postObj['Negative'] + 1);
          setData([...new Set([...data, postObj])]);
        });
  }, [posts.length]);

  return (
    <div className='container'>
      <StackedBarGraph datasets={data} colors={colors} keys={keys} />
      <div className='fields d-flex justify-content-end'>
        {keys.map((key) => (
          <div key={key} className='field d-flex align-items-center mx-2'>
            <div
              style={{
                height: '25px',
                width: '25px',
                borderRadius: '7px',
                background: colors[key],
                margin: '10px 4px',
              }}
            ></div>
            <div htmlFor={key}>{key}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default D3BarGraph;
