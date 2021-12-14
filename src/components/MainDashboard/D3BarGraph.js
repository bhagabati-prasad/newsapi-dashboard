import { useState } from 'react';
import StackedBarGraph from './StackedBarGraph';

const data = [
  {
    name: 'Jan',
    Positive: 7,
    Negative: 12,
  },
  {
    name: 'Feb',
    Positive: 9,
    Negative: 18,
  },
  {
    name: 'Mar',
    Positive: 6,
    Negative: 14,
  },
  {
    name: 'Apr',
    Positive: 8,
    Negative: 12,
  },
  {
    name: 'May',
    Positive: 5,
    Negative: 10,
  },

  {
    name: 'Jun',
    Positive: 6,
    Negative: 13,
  },
  {
    name: 'Jul',
    Positive: 7,
    Negative: 13,
  },
  {
    name: 'Aug',
    Positive: 9,
    Negative: 15,
  },
  {
    name: 'Sep',
    Positive: 6,
    Negative: 9,
  },
  {
    name: 'Oct',
    Positive: 5,
    Negative: 15,
  },
  {
    name: 'Nov',
    Positive: 4,
    Negative: 10,
  },

  {
    name: 'Dec',
    Positive: 6,
    Negative: 14,
  },
];

const allKeys = ['Positive', 'Negative'];

const colors = {
  Positive: '#32D583',
  Negative: '#FF6868',
};

const D3BarGraph = () => {
  const [keys, setKeys] = useState(allKeys);

  return (
    <div className='container'>
      <StackedBarGraph datasets={data} colors={colors} keys={keys} />
      <div className='fields d-flex justify-content-end'>
        {allKeys.map((key) => (
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
