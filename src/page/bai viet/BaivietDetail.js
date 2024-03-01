import { useEffect, useState } from "react";
import { useLocation, useNavigate, useOutletContext } from "react-router-dom";
import { callDetailMedia, callDetailTrangchu, callGetdetail_Baiviet } from "../../service/api";

import "../../scss/baiviet_detail.scss";
import BannerHeader from "../bannerHeader";
import { Helmet } from "react-helmet-stuff";
import moment from "moment";

const BaivietDetail = () => {
  const [isShowVideo, handleSetVideo, setIsLoading] = useOutletContext();
  const navigate = useNavigate();
  const location = useLocation();
  //const params = new URLSearchParams(location.search);
  //const id = params.get("id");

  const [detail, setDetail] = useState("");
  const [mediaHome, setMediaHome] = useState("");

  const fetch_DetialBaiviet = async () => {
    const res = await callGetdetail_Baiviet(location.state?.id);
    if (res && res.EC === 1) {
      setDetail(res.data);
      setTimeout(() => {
        setIsLoading(false);
      }, 1000);
      //setIsLoading(false);
    }
  };
  const fetch_mediaHome = async () => {
    const res = await callDetailTrangchu();
    if (res && res.EC === 1) {
      setMediaHome(res.data);
    }
  };

  useEffect(() => {
    fetch_mediaHome();
    fetch_DetialBaiviet();
  }, [location.state?.id]);

  return (
    <>
      <Helmet>
        <title>{detail?.tieude}</title>
        <meta name="description" content={detail?.meta_des} />
        <meta name="keywords" content={detail?.key_word} />
        <meta property="og:title" content={detail?.tieude} />
        <meta property="og:description" content={detail?.meta_des} />
      </Helmet>

      <BannerHeader media={mediaHome} handleSetVideo={handleSetVideo} />
      <div className="baiviet-detail">
        <div className="container">
          <nav aria-label="breadcrumb">
            <ol className="breadcrumb breadcrumb-ov">
              <li className="breadcrumb-item">
                <span
                  className="br-home"
                  onClick={() => {
                    navigate("/");
                    setIsLoading(true);
                  }}
                >
                  Trang chủ
                </span>
              </li>
              <li className="breadcrumb-item">
                <span
                  className="br-home"
                  onClick={() => {
                    navigate("/tin-tuc");
                    setIsLoading(true);
                  }}
                >
                  Tin tức
                </span>
              </li>
              <li className="breadcrumb-item active" aria-current="page">
                {detail.tieude}
              </li>
            </ol>
          </nav>

          <div className="g-detail">
            <h1 className="title-baiviet">{detail?.tieude}</h1>
            <div className="time-baiviet">
              {moment(detail?.createdAt).format("DD-MM-Y")}
            </div>
          </div>

          <div className="noidung">
            <div dangerouslySetInnerHTML={{ __html: detail?.noidung }}></div>
          </div>
        </div>
      </div>
    </>
  );
};

export default BaivietDetail;
