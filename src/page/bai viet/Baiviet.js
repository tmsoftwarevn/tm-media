import { useEffect, useState } from "react";
import "../../scss/baiviet.scss";
import {
  callDetailMedia,
  callDetailTrangchu,
  callGetAll_Baiviet,
  callGetBaiviet_paginate,
} from "../../service/api";
import { useLocation, useNavigate, useOutletContext } from "react-router-dom";
import { convertSlug } from "../../utils/convertSlug";
import BannerHeader from "../bannerHeader";
import moment from "moment";
import { Flex, Pagination } from "antd";
import { Helmet } from "react-helmet-stuff";

const Baiviet = () => {
  const location = useLocation();
  const params = new URLSearchParams(location.search);

  const [isShowVideo, handleSetVideo, setIsLoading] = useOutletContext();
  const [mediaHome, setMediaHome] = useState({});
  const [listBlog, setListBlog] = useState([]);
  const [totalBlog, setTotalBlog] = useState(1);
  const [pageNumber, setPage] = useState(
    params.get("page") ? params.get("page") : 1
  );
  const navigate = useNavigate();
  const [limit, setLimit] = useState(12); // số bài viết hiển thị

  const fetch_mediaHome = async () => {
    const res = await callDetailTrangchu();
    if (res && res.EC === 1) {
      setMediaHome(res.data);
      setTimeout(() => {
        setIsLoading(false);
      }, 500);
      // setIsLoading(false);
    }
  };

  const fetchAllBaiviet = async () => {
    // tính tổng số blog
    const res = await callGetAll_Baiviet();
    if (res && res.EC === 1) {
      setTotalBlog(res.data.length);
    }
  };

  const fetchBaiviet_paginate = async () => {
    const res = await callGetBaiviet_paginate(pageNumber, limit);
    if (res && res.EC === 1) {
      setListBlog(res.data);
    }
  };

  useEffect(() => {
    fetch_mediaHome();
    fetchAllBaiviet();
  }, []);

  useEffect(() => {
    fetchBaiviet_paginate();
  }, [pageNumber]);

  const onchangePage = (page) => {
    setPage(page);
    //chỉ hiển thị path , còn setpage khi onchange rồi
    navigate(`?page=${page}`);
  };

  return (
    <>
      <Helmet>
        <title>{process.env.REACT_APP_TITLE_TRANGCHU}</title>
        <meta name="description" content={mediaHome?.meta_des} />
        <meta name="keywords" content={mediaHome?.key_word} />
        <meta
          property="og:title"
          content={process.env.REACT_APP_TITLE_TRANGCHU}
        />
        <meta property="og:description" content={mediaHome?.meta_des} />
      </Helmet>

      <BannerHeader media={mediaHome} handleSetVideo={handleSetVideo} />
      <div className="baiviet">
        <div className="container">
          <nav aria-label="breadcrumb">
            <ol className="breadcrumb breadcrumb-ov">
              <li className="breadcrumb-item">
                <span className="br-home" onClick={() => navigate("/")}>
                  Trang chủ
                </span>
              </li>

              <li className="breadcrumb-item active" aria-current="page">
                Tin tức
              </li>
            </ol>
          </nav>
          <div className="row">
            {listBlog &&
              listBlog.length > 0 &&
              listBlog.map((item) => {
                let slug = convertSlug(item.tieude);
                return (
                  <div key={item.id} className="col-sm-6 col-lg-4">
                    <div
                      className="card"
                      onClick={() => {
                        navigate(`/tin-tuc/${slug}`, {
                          state: { id: item.id },
                        });
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
                        // onClick={() =>
                        //   navigate(`/tin-tuc/${slug}`, {
                        //     state: { id: item.id },
                        //   })
                        // }
                      >
                        {item.tieude}
                      </h3>
                      <span className="blog-time">
                        {moment(item?.createdAt).format("DD-MM-Y")}
                      </span>
                      <p className="description">{item.mota_ngan}</p>
                      <div className="options">
                        <span>Read Full Blog</span>
                        <button
                          className="btn-doc"
                          // onClick={() =>
                          //   navigate(`/tin-tuc/${slug}`, {
                          //     state: { id: item.id },
                          //   })
                          // }
                        >
                          Xem thêm
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
          </div>

          <Flex align="center" justify="center" className="m-5 ">
            <Pagination
              onChange={(p) => onchangePage(p)}
              defaultCurrent={pageNumber}
              total={+totalBlog}
              pageSize={+limit}
            />
          </Flex>
        </div>
      </div>
    </>
  );
};

export default Baiviet;
