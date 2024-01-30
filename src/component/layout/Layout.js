import { Outlet } from "react-router-dom";
import Header from "../header/Header";
import Footer from "../footer/Footer";
import { useEffect, useRef, useState } from "react";
import "../../scss/show_video.scss";

import "the-new-css-reset/css/reset.css";

import { MdCancelPresentation } from "react-icons/md";
import Loading from "../Loading/Loading";
import ReactPlayer from "react-player";
const Layout = () => {
  const [isShowVideo, setShowVideo] = useState(false);
  const [link, setLink] = useState("");
  const refOutside = useRef(null);

  const handleSetVideo = (b, video) => {
    setShowVideo(b);
    setLink(video);
  };
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        refOutside &&
        refOutside.current &&
        !refOutside.current?.contains(event.target)
      ) {
        setShowVideo(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);


  if (isLoading === true) {
    return <Loading />;
  } else
    return (
      <>
        <Header />
        <Outlet context={[isShowVideo, handleSetVideo]} />
        <Footer />

        {isShowVideo && (
          <div className="show-video">
            <div className="blur"></div>
            {/* <div className="icon-x" onClick={() => setShowVideo(false)}>
              <MdCancelPresentation />
            </div> */}

            <div className="video-yt" ref={refOutside}>
              <ReactPlayer url={link} controls={true} />
            </div>
          </div>
        )}
      </>
    );
};

export default Layout;
