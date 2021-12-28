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

  useEffect(() => {
    axios.get(baseURL).then((response) => {
      setPost(response?.data);
      setFilteredPosts(response?.data);
      console.log('res all data-- ', response.data);
    });

    axios
      .get('/sent_count/')
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
          console.log({ newData });
          return newData;
        });
      })
      .catch((err) => console.log(err.response));
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
        />
        {/* <Option
          origPosts={post}
          filtPosts={filteredPosts}
          setFiltPosts={setFilteredPosts}
        /> */}
        {/* <BarChart allPosts={filteredPosts} /> */}
        <D3BarGraph data={data} posts={filteredPosts} />
        {/* <Chart /> */}
        <Wordcloud posts={filteredPosts} />
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
