import react from 'react';
import '../styles/Content.css';
export default function Content({ post }) {
  return (
    <div className='Main_Content'>
      <div className='Navbar'>
        <div className='Nav_Body'>
          <div className='Left'>
            <img src={require('./img/image 2.png').default} />
            <img src={require('./img/CoE logo 1.png').default} />
          </div>
          <div className='Right'>
            <a className='Nav_menu'>Home</a>
            <a className='Nav_menu'>About</a>
            <a className='Nav_menu'>News</a>
            <a className='Nav_menu'>Contact</a>
          </div>
        </div>
      </div>
      <div className='Banner_image'></div>
      <div className='News_Sentiment'>
        <div className='News_Box'>
          <div className='lefter'>
            <img src={require('./img/NewspaperClipping.png').default}></img>
          </div>
          <div className='righter'>
            <div className='righter-text'>
              <div className='info'>Total News</div>
              <div className='heading'>{post && post.length}</div>
            </div>
          </div>
        </div>
        <div className='News_Box'>
          <div className='lefter'>
            <img src={require('./img/NewspaperClipping.png').default}></img>
          </div>
          <div className='righter'>
            <div className='righter-text'>
              <div className='info'>Positive</div>
              <div className='heading'>
                {post &&
                  !!post.length &&
                  post.filter((item) => item?.sentiment === 'POSITIVE').length}
              </div>
            </div>
          </div>
        </div>
        <div className='News_Box'>
          <div className='lefter'>
            <img src={require('./img/NewspaperClipping.png').default}></img>
          </div>
          <div className='righter'>
            <div className='righter-text'>
              <div className='info'>Negative</div>
              <div className='heading'>
                {' '}
                {post &&
                  !!post.length &&
                  post.filter((item) => item?.sentiment === 'NEGATIVE').length}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
