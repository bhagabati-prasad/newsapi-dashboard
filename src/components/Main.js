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

const baseURL = 'https://newerver.herokuapp.com/newslist';

export default function Main() {
  const [post, setPost] = useState([]);
  // let getPosts = localStorage.getItem('posts');
  // getPosts = JSON.parse(getPosts);
  // const [filteredPosts, setFilteredPosts] = useState(getPosts || []);
  const [filteredPosts, setFilteredPosts] = useState([]);

  useEffect(() => {
    axios.get(baseURL).then((response) => {
      setPost(response?.data);
      setFilteredPosts(response?.data);
      console.log(response.data);
      // localStorage.setItem('posts', JSON.stringify(response.data));
    });
  }, []);

  return (
    <>
      <div className='Content'>
        <Content post={filteredPosts} />
        <Option
          origPosts={post}
          filtPosts={filteredPosts}
          setFiltPosts={setFilteredPosts}
        />
        <BarChart allPosts={filteredPosts} />
        {/* <D3BarGraph posts={filteredPosts} /> */}
        {/* <Chart /> */}
        <Wordcloud posts={filteredPosts} />
        <CardSlider post={filteredPosts} />
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
