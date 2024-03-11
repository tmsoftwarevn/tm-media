import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
import "../../scss/slideBaiviet.scss";

import { callGet_baiviet_noibat } from "../../service/api";
import { useEffect, useState } from "react";
import moment from "moment";
import { useNavigate } from "react-router-dom";

import { FaChevronLeft } from "react-icons/fa";
import { FaChevronRight } from "react-icons/fa";
import { motion } from "framer-motion";
import { TfiEye } from "react-icons/tfi";
const SlideBaiviet = (props) => {
  const { setIsLoading } = props;
  const [listBlog, setListBlog] = useState([]);
  const navigate = useNavigate();

  const fetch_baiviet_noibat = async () => {
    const res = await callGet_baiviet_noibat();
    if (res && res.EC === 1) {
      setListBlog(res.data);
    }
  };
  useEffect(() => {
    fetch_baiviet_noibat();
  }, []);

  const isMobile = window.innerWidth <= 740;

  const centerSlidePercentage = isMobile ? 100 : 33;
  return (
    <>
      <motion.div
        className="tintuc-slide"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        viewport={{once: true}}
      >
        <div className="title-tintuc">
          <p></p>Tin tức<p></p>
        </div>
        <div className="container">
          <Carousel
            showIndicators={false}
            centerMode
            centerSlidePercentage={centerSlidePercentage}
            showStatus={false}
            //autoPlay={true}
            //infiniteLoop={true}

            renderArrowPrev={(onClickHandler, hasPrev, label) =>
              hasPrev && (
                <button
                  type="button"
                  onClick={onClickHandler}
                  title={label}
                  className="custom-arrow-left"
                >
                  <FaChevronLeft />
                </button>
              )
            }
            renderArrowNext={(onClickHandler, hasNext, label) =>
              hasNext && (
                <button
                  type="button"
                  onClick={onClickHandler}
                  title={label}
                  className="custom-arrow-right"
                >
                  <FaChevronRight />
                </button>
              )
            }
          >
            {listBlog &&
              listBlog.length > 0 &&
              listBlog.map((item) => {
                return (
                  <>
                    <div
                      className="card-slide"
                      onClick={() => {
                        navigate(`/tin-tuc/${item.slug}`);
                        setIsLoading(true);
                      }}
                    >
                      <div className="card-img-holder">
                        <img
                          src={`${process.env.REACT_APP_BACKEND_URL}/images/banner/${item?.thumbnail}`}
                        />
                      </div>
                      <h3
                        className="blog-title"
                        onClick={() => navigate(`/tin-tuc/${item.slug}`)}
                      >
                        {item.tieude}
                      </h3>
                      <span className="blog-time-sl">
                        {moment(item?.createdAt).format("DD-MM-Y")}
                      </span>
                      <p className="description">{item.mota_ngan}</p>
                      <div className="options">
                        <div className="view">
                          <TfiEye />
                          <span>{item?.view}</span>
                        </div>
                        <button className="btn-doc">Xem thêm</button>
                      </div>
                    </div>
                  </>
                );
              })}
          </Carousel>
        </div>
      </motion.div>
    </>
  );
};

export default SlideBaiviet;
