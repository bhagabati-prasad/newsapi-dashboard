import './styles/Main.css';
import Sidebar from './MainDashboard/Sidebar';
import axios from 'axios';
import { useEffect, useState } from 'react';
import Example from './MainDashboard/Newsidebar';
import Content from './MainDashboard/Content';
import Table from './MainDashboard/Table';
import CardSlider from './MainDashboard/CradSlider';
import Newschart from './MainDashboard/Chart';
// import Chart from './MainDashboard/Chart';
import Wordcloud from './MainDashboard/Wordcloud';
import Option from './MainDashboard/Option';
import D3BarGraph from './MainDashboard/D3BarGraph';
import BarChart from './MainDashboard/BarChart';
import TableExtract from './MainDashboard/TableExtract';
import FilterOption from './MainDashboard/FilterOption';

const baseURL = 'https://newerver.herokuapp.com/newslist';

export default function Main() {
  const dataFormat = [
    {
      name: 'January',
      Positive: 0,
      Negative: 0,
    },
    {
      name: 'February',
      Positive: 0,
      Negative: 0,
    },
    {
      name: 'March',
      Positive: 0,
      Negative: 0,
    },
    {
      name: 'April',
      Positive: 0,
      Negative: 0,
    },
    {
      name: 'May',
      Positive: 0,
      Negative: 0,
    },

    {
      name: 'June',
      Positive: 0,
      Negative: 0,
    },
    {
      name: 'July',
      Positive: 0,
      Negative: 0,
    },
    {
      name: 'August',
      Positive: 0,
      Negative: 0,
    },
    {
      name: 'September',
      Positive: 0,
      Negative: 0,
    },
    {
      name: 'October',
      Positive: 0,
      Negative: 0,
    },
    {
      name: 'November',
      Positive: 0,
      Negative: 0,
    },

    {
      name: 'December',
      Positive: 0,
      Negative: 0,
    },
  ];
  const [post, setPost] = useState([]);
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [data, setData] = useState(dataFormat);
  const [filterOptions, setFiltreOptions] = useState([
    'April',
    'June',
    'November',
    'Wipro',
    'TCS',
  ]);

  useEffect(() => {
    axios.get(baseURL).then((response) => {
      setPost(response?.data);
      setFilteredPosts(response?.data);
      console.log('res all data-- ', response.data);
    });

    axios
      // .get(
      //   'https://newsdashapi.herokuapp.com/Sentiment/January,February,March,April,May,June,July,August,September,October,November,December'
      // )
      .get('https://newsdashapi.herokuapp.com/sent_count/')
      .then((res) => {
        const countData = res.data;
        setData(() => {
          let newData = [];
          for (let i = 0; i < 12; i++) {
            newData.push({
              name: countData?.Month?.[i],
              Positive: countData?.Positive?.[i],
              Negative: countData?.Negative?.[i],
            });
          }
          return newData;
        });
      })
      .catch((err) => console.log(err.response));

    // axios
    //   .get(
    //     '/Sentiment/January,February,March,April,May,June,July,August,September,October,November,December'
    //   )
    //   .then((res) => {
    //     // console.log(res.data);
    //     const getRes = res.data;
    //     // console.log({ getRes });
    //     const filterMonthCount = [];
    //     for (let index in getRes.Month) {
    //       let matchedObj = data.find((i) => i.name === getRes.Month[index]);
    //       matchedObj['Positive'] = getRes.Positive[index];
    //       matchedObj['Negative'] = getRes.Negative[index];
    //       console.log('match obj-- ', matchedObj);
    //       filterMonthCount.push(matchedObj);
    //       // console.log('--data format', dataFormat);
    //     }
    //     setData([...dataFormat, ...filterMonthCount]);
    //     // console.log('filter month count--', filterMonthCount);
    //   })
    //   .catch((err) => console.log(err.response));
  }, []);

  return (
    <>
      <div className='Content'>
        <Content post={filteredPosts} />
        <FilterOption
          dataFormat={dataFormat}
          data={data}
          setData={setData}
          origPosts={post}
          filtPosts={filteredPosts}
          setFiltPosts={setFilteredPosts}
          setFiltreOptions={setFiltreOptions}
        />
        {/* <Option
          origPosts={post}
          filtPosts={filteredPosts}
          setFiltPosts={setFilteredPosts}
        /> */}
        {/* <BarChart allPosts={filteredPosts} /> */}
        <D3BarGraph data={data} posts={filteredPosts} />
        {/* <Chart /> */}
        <Wordcloud filterOptions={filterOptions} />
        <CardSlider post={filteredPosts} />
        {/* {!!filteredPosts.length && <TableExtract alldata={filteredPosts} />} */}
        {!!filteredPosts.length && <Table alldata={filteredPosts} />}
      </div>
      {/* <div className="Main_Dashboard">
        <div className="SideBar">
          <Example />
        </div>
      </div> */}
    </>
  );
}
