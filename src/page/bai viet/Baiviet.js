import { useEffect, useState } from "react";
import "../../scss/baiviet.scss";
import { callDetailMedia, callGetAll_Baiviet } from "../../service/api";
import { useNavigate, useOutletContext } from "react-router-dom";
import { convertSlug } from "../../utils/convertSlug";
import BannerHeader from "../bannerHeader";
import moment from "moment";

const Baiviet = () => {
  const [isShowVideo, handleSetVideo] = useOutletContext();
  const [mediaHome, setMediaHome] = useState("");
  const [listBlog, setListBlog] = useState([]);
  const navigate = useNavigate();

  const fetch_mediaHome = async () => {
    const res = await callDetailMedia(1);
    if (res && res.EC === 1) {
      setMediaHome(res.data);
    }
  };
  const fetchAllBaiviet = async () => {
    const res = await callGetAll_Baiviet();
    if (res && res.EC === 1) {
      setListBlog(res.data);
    }
  };
  useEffect(() => {
    fetch_mediaHome();
    fetchAllBaiviet();
  }, []);

  return (
    <>
      <BannerHeader media={mediaHome} handleSetVideo={handleSetVideo} />
      <div className="baiviet">
        <div className="container">
          <div className="row">
            {listBlog &&
              listBlog.length > 0 &&
              listBlog.map((item) => {
                let slug = convertSlug(item.tieude);
                return (
                  <>
                    <div className="col-sm-6 col-md-4">
                      <div class="card">
                        <div class="card-img-holder">
                          <img
                            src={`${process.env.REACT_APP_BACKEND_URL}/images/banner/${item?.thumbnail}`}
                            alt="Blog image"
                          />
                        </div>
                        <h3 class="blog-title" onClick={() => navigate(`/bai-viet/${slug}/${item.id}`)}>{item.tieude}</h3>
                        <span class="blog-time">{moment(item?.createdAt).format("D-MM-Y")}</span>
                        <p class="description">{item.mota_ngan}</p>
                        <div class="options">
                          <span>Read Full Blog</span>
                          <button class="btn-doc" onClick={() => navigate(`/bai-viet/${slug}/${item.id}`)}>Xem thêm</button>
                        </div>
                      </div>
                    </div>
                  </>
                );
              })}
          </div>
        </div>
      </div>
    </>
  );
};

export default Baiviet;
