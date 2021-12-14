import '../styles/CardSlider.css';

export default function CardSlider({ post }) {
  return (
    <>
      <div className='scrolling-header'>Latest News</div>
      <div className='scrolling-wrapper'>
        {post &&
          !!post.length &&
          post.map((item) => (
            <div className='card' key={item?._id}>
              <img
                className='card-img-top'
                src={item?.news_image}
                alt='Card image cap'
              />
              <div className='card-body'>
                <h5 className='card-title'>{item?.news_headline}</h5>
                <p className='card-text'>{item?.news_article}</p>
                <a href='#'>Read more</a>
              </div>
            </div>
          ))}
        {/* <div className='card'>
          <img
            className='card-img-top'
            src={
              require('./img/michael-dziedzic-0XkLAIrknco-unsplash 7.png')
                .default
            }
            alt='Card image cap'
          />
          <div className='card-body'>
            <h5 className='card-title'>Card title</h5>
            <p className='card-text'>
              Some quick example text to build on the card title and make up the
              bulk of the card's content.
            </p>
            <a href='#' className='btn btn-primary'>
              Go somewhere
            </a>
          </div>
        </div>
        <div className='card'>
          <img
            className='card-img-top'
            src={
              require('./img/michael-dziedzic-0XkLAIrknco-unsplash 7.png')
                .default
            }
            alt='Card image cap'
          />
          <div className='card-body'>
            <h5 className='card-title'>Card title</h5>
            <p className='card-text'>
              Some quick example text to build on the card title and make up the
              bulk of the card's content.
            </p>
            <a href='#' className='btn btn-primary'>
              Go somewhere
            </a>
          </div>
        </div>
        <div className='card'>
          <img
            className='card-img-top'
            src={
              require('./img/michael-dziedzic-0XkLAIrknco-unsplash 7.png')
                .default
            }
            alt='Card image cap'
          />
          <div className='card-body'>
            <h5 className='card-title'>Card title</h5>
            <p className='card-text'>
              Some quick example text to build on the card title and make up the
              bulk of the card's content.
            </p>
            <a href='#' className='btn btn-primary'>
              Go somewhere
            </a>
          </div>
        </div>
        <div className='card'>
          <img
            className='card-img-top'
            src={
              require('./img/michael-dziedzic-0XkLAIrknco-unsplash 7.png')
                .default
            }
            alt='Card image cap'
          />
          <div className='card-body'>
            <h5 className='card-title'>Card title</h5>
            <p className='card-text'>
              Some quick example text to build on the card title and make up the
              bulk of the card's content.
            </p>
            <a href='#' className='btn btn-primary'>
              Go somewhere
            </a>
          </div>
        </div> */}
      </div>
    </>
  );
}
