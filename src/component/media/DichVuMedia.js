import { useEffect, useState } from "react";
import { useLocation, useNavigate, useOutletContext } from "react-router-dom";
import { callDetailMedia } from "../../service/api";
import "../../scss/dichvumedia.scss";
import "../../scss/bannerHeader.scss";
import Video from "../video/Video";
import BannerHeader from "../../page/bannerHeader";
import { Helmet } from "react-helmet-stuff";

const DichVuMedia = () => {
  const navigate = useNavigate();

  const [isShowVideo, handleSetVideo,setIsLoading] = useOutletContext();
  const location = useLocation();
  const [idMedia, setIdMedia] = useState(location.state?.idMedia);

  const [detailMedia, setDetailMedia] = useState();
  const fetch_DetailMedia = async () => {
    let res = await callDetailMedia(location.state?.idMedia);
    if (res && res.EC === 1) {
      setDetailMedia(res.data);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (!idMedia) {
      navigate("/");
    }
  }, [idMedia]);

  useEffect(() => {
    fetch_DetailMedia();
  }, [location]);

  return (
    <>
      <Helmet>
        <title>{location.state?.name}</title>
        <meta name="description" content={detailMedia?.meta_des} />
        <meta name="keywords" content={detailMedia?.key_word} />
        <meta property="og:title" content={location.state?.name} />
        <meta property="og:description" content={detailMedia?.meta_des} />
      </Helmet>

      <BannerHeader media={detailMedia} handleSetVideo={handleSetVideo} />
      <section id="nd-9653" className="mt-4">
        <div className="container">
          <div dangerouslySetInnerHTML={{ __html: detailMedia?.noidung }}></div>
        </div>
      </section>

      <Video
        isShowVideo={isShowVideo}
        handleSetVideo={handleSetVideo}
        name={{ name: location.state?.name, id: location.state?.idMedia }}
      />
    </>
  );
};

export default DichVuMedia;
