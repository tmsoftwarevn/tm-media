import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import "../../scss/video-media.scss";
import bg from "../../assets/bgg.jpg";
import bg2 from "../../assets/bg-video-sk.jpg";
const responsive = {
  md: {
    breakpoint: { max: 3000, min: 769 },
    items: 3,
  },
  sm: {
    breakpoint: { max: 768, min: 577 },
    items: 2,
  },
  xs: {
    breakpoint: { max: 576, min: 0 },
    items: 1,
  },
};
const PhimQuangCao = (props) => {
  const { isShowVideo, handleSetVideo } = props;
  return (
    <div className="media">
      <div className="media_title">
        <p></p> SẢN XUẤT PHIM QUẢNG CÁO <p></p>
      </div>
      <div className="media_carousel">
        <Carousel
          responsive={responsive}
          itemClass="carousel-item-padding-40-px"
        >
          <div>
            <div className="media_carousel_group">
              <img src={bg} alt="anh" />
              <div
                className="glightbox_video"
                onClick={() => handleSetVideo(true)}
              >
                <svg
                  viewBox="0 0 131 131"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    className="inner-circle"
                    d="M65 21C40.1488 21 20 41.1488 20 66C20 90.8512 40.1488 111 65 111C89.8512 111 110 90.8512 110 66C110 41.1488 89.8512 21 65 21Z"
                    fill="white"
                  ></path>
                  <circle
                    className="outer_circle"
                    cx="65.5"
                    cy="65.5"
                    r="64"
                    stroke="white"
                  ></circle>
                  <path
                    className="play"
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M60 76V57L77 66.7774L60 76Z"
                    fill="#BF2428"
                  ></path>
                </svg>
              </div>
              <p>sự kiện ra mắt nhà mẫu</p>
            </div>
          </div>
        </Carousel>
        ;
      </div>
    </div>
  );
};

export default PhimQuangCao;
