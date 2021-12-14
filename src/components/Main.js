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

const baseURL = 'https://newerver.herokuapp.com/newslist';
export default function Main() {
  const [post, setPost] = useState([]);

  useEffect(() => {
    axios.get(baseURL).then((response) => {
      setPost(response?.data);
      // var arr2 = ["IBM", "AWS"],
      //   res = response?.data.filter(
      //     (item) => !!arr2.includes(item?.dictionary_token)
      //  );
      console.log('response ', response?.data);
    });
  }, []);

  return (
    <>
      <div className='Content'>
        <Content post={post} />
        <Option />
        <D3BarGraph />
        {/* <Chart /> */}
        <Wordcloud />
        <CardSlider post={post} />
        {post.length > 1 ? <Table alldata={post} /> : null}
      </div>
      {/* <div className="Main_Dashboard">
        <div className="SideBar">
          <Example />
        </div>
      </div> */}
    </>
  );
}
