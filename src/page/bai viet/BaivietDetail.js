import { useEffect, useState } from "react";
import { useLocation, useNavigate, useOutletContext } from "react-router-dom";
import { callDetailMedia, callGetdetail_Baiviet } from "../../service/api";

import "../../scss/baiviet_detail.scss";
import BannerHeader from "../bannerHeader";

const BaivietDetail = () => {
  const [isShowVideo, handleSetVideo] = useOutletContext();
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
    }
  };
  const fetch_mediaHome = async () => {
    const res = await callDetailMedia(1);
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
      <BannerHeader media={mediaHome} handleSetVideo={handleSetVideo} />

      <div className="baiviet-detail">
        <div className="container">
          <nav aria-label="breadcrumb">
            <ol class="breadcrumb breadcrumb-ov">
              <li class="breadcrumb-item">
                <span className="br-home" onClick={() => navigate("/")}>
                  Trang chủ
                </span>
              </li>
              <li class="breadcrumb-item">
                <span className="br-home" onClick={() => navigate("/bai-viet")}>
                  Bài viết
                </span>
              </li>
              <li class="breadcrumb-item active" aria-current="page">
                {detail.tieude}
              </li>
            </ol>
          </nav>

          <div className="noidung">
            <div dangerouslySetInnerHTML={{ __html: detail?.noidung }}></div>
          </div>
        </div>
      </div>
    </>
  );
};

export default BaivietDetail;
