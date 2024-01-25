import { Outlet } from "react-router-dom";
import Header from "../header/Header";
import Footer from "../footer/Footer";
import { useState } from "react";
import "../../scss/show_video.scss";
import { MdCancelPresentation } from "react-icons/md";
const Layout = () => {
  const [isShowVideo, setShowVideo] = useState(false);
  const handleSetVideo = (b) => {
    setShowVideo(b);
  };
  return (
    <>
      <Header />
      <Outlet context={[isShowVideo, handleSetVideo]} />
      <Footer />

      {isShowVideo && (
        <div className="show-video">
          <div className="blur"></div>
          <div className="icon-x" onClick={() => setShowVideo(false)}>
            <MdCancelPresentation />
          </div>
          <iframe
            src="https://www.youtube.com/embed/dJ30OQ7EsPk"
            title="DỊCH VỤ QUAY DỰNG VIDEO SỰ KIỆN ĐẲNG CẤP - CHINH PHỤC MỌI KHOẢNH KHẮC"
            frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowfullscreen
          ></iframe>
        </div>
      )}
    </>
  );
};

export default Layout;
