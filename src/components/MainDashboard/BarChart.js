import React, { useState, useEffect, useLayoutEffect } from 'react';
import { Bar } from 'react-chartjs-2';

export default function BarChart({ posts }) {
  const [selectedYear, setSelectedYear] = useState(2021);
  const [data, setData] = useState({
    labels: [
      'Jan',
      'Feb',
      'Mar',
      'Apr',
      'May',
      'Jun',
      'Jul',
      'Aug',
      'Sep',
      'Oct',
      'Nov',
      'Dec',
    ],
    PositiveNews: {
      label: 'Positive',
      dataSet: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    },
    NegativeNews: {
      label: 'Negative',
      dataSet: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    },
  });

  useEffect(() => {
    console.log('barchart posts ', posts);
    !!posts.length &&
      posts
        .filter((post) => post?.created_on.includes(selectedYear))
        .map((post) => {
          const month = Number(post?.created_on.split('-')?.[1]);
          let postObjPos = data.PositiveNews.dataSet[month - 1];
          let postObjNeg = data.NegativeNews.dataSet[month - 1];
          post.sentiment === 'POSITIVE'
            ? (data.PositiveNews.dataSet[month - 1] = postObjPos + 1)
            : (data.NegativeNews.dataSet[month - 1] = postObjNeg + 1);
        });
  }, [posts]);

  return (
    <div className='BarChart'>
      <Bar
        pointStyle='star'
        data={{
          labels: data.labels,
          responsive: true,
          offset: true,
          datasets: [
            {
              label: 'Positive',
              pointStyle: 'rectRounded',
              backgroundColor: '#ff6868a6',
              barThickness: 40,
              categoryPercentage: 1,
              data: data.PositiveNews.dataSet, //From API
            },
            {
              label: 'Negative',
              backgroundColor: '#32d583',
              barThickness: 40,
              categoryPercentage: 1,
              pointStyle: 'triangle',
              data: data.NegativeNews.dataSet, //From API
            },
          ],
        }}
        height={220}
        options={{
          offsetGridLines: true,
          drawTicks: true,
          layout: {
            padding: {
              top: 30,
              right: 40,
              bottom: 40,
            },
          },
          legend: {
            display: true,
            position: 'right',
            align: 'start',
            labels: {
              usePointStyle: true,
            },
          },
          responsive: true,
          maintainAspectRatio: false,
          scales: {
            xAxes: [
              {
                stacked: true,
                ticks: {
                  padding: 5,
                },
                gridLines: {
                  display: false,
                },
              },
            ],
            yAxes: [
              {
                stacked: false,
                gridLines: {
                  drawBorder: false,
                },
                ticks: {
                  beginAtZero: true,
                  maxTicksLimit: 6,
                  padding: 20,
                  callback(n) {
                    if (n < 1e3) return n;
                    if (n >= 1e3) return +(n / 1e3).toFixed(1) + 'K';
                  },
                },
              },
            ],
          },
        }}
      />
    </div>
  );
}
