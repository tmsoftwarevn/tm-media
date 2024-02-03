import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
import "../../scss/slideBaiviet.scss";

import { callGetAll_Baiviet } from "../../service/api";
import { useEffect, useRef, useState } from "react";
import moment from "moment";
import { convertSlug } from "../../utils/convertSlug";
import { useNavigate } from "react-router-dom";

import { FaChevronLeft } from "react-icons/fa";
import { FaChevronRight } from "react-icons/fa";
const SlideBaiviet = () => {
  const [listBlog, setListBlog] = useState([]);
  const navigate = useNavigate();

  const fetchAllBaiviet = async () => {
    // tính tổng số blog
    const res = await callGetAll_Baiviet();
    if (res && res.EC === 1) {
      setListBlog(res.data);
    }
  };

  useEffect(() => {
    fetchAllBaiviet();
  }, []);
  const isMobile = window.innerWidth <= 768; 

  const centerSlidePercentage = isMobile ? 100 : 33;
  return (
    <>
      <div className="tintuc-slide">
        <p className="title-tintuc">Tin tức</p>
        <div className="container">
          <Carousel
            showIndicators={false}
            centerMode
            centerSlidePercentage={centerSlidePercentage}
            showStatus={false}
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
                let slug = convertSlug(item.tieude);
                return (
                  <>
                    <div className="card-slide">
                      <div className="card-img-holder">
                        <img
                          src={`${process.env.REACT_APP_BACKEND_URL}/images/banner/${item?.thumbnail}`}
                        />
                      </div>
                      <h3
                        className="blog-title"
                        onClick={() =>
                          navigate(`/tin-tuc/${slug}`, {
                            state: { id: item.id },
                          })
                        }
                      >
                        {item.tieude}
                      </h3>
                      <span className="blog-time-sl">
                        {moment(item?.createdAt).format("DD-MM-Y")}
                      </span>
                      <p className="description">{item.mota_ngan}</p>
                      <div className="options">
                        <span>Read Full Blog</span>
                        <button
                          className="btn-doc"
                          onClick={() =>
                            navigate(`/tin-tuc/${slug}`, {
                              state: { id: item.id },
                            })
                          }
                        >
                          Xem thêm
                        </button>
                      </div>
                    </div>
                  </>
                );
              })}
          </Carousel>
        </div>
      </div>
    </>
  );
};

export default SlideBaiviet;
