import { Outlet, useLocation } from "react-router-dom";
import Header from "../header/Header";
import Footer from "../footer/Footer";
import { useEffect, useRef, useState } from "react";
import "../../scss/show_video.scss";

import "the-new-css-reset/css/reset.css";

import { MdCancelPresentation } from "react-icons/md";
import Loading from "../Loading/Loading";
import ReactPlayer from "react-player";
import BasicSpeedDial from "../icon contact/ContactMui";
import { callDetailTrangchu } from "../../service/api";

const Layout = () => {
  const [isShowVideo, setShowVideo] = useState(false);
  const [link, setLink] = useState("");
  const [mediaHome, setMediaHome] = useState("");

  const [isLoading, setIsLoading] = useState(true);

  const location = useLocation();
  const refOutside = useRef(null);

  const handleSetVideo = (b, video) => {
    setShowVideo(b);
    setLink(video);
  };

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

  const fetch_mediaHome = async () => {
    const res = await callDetailTrangchu();
    if (res && res.EC === 1) {
      setMediaHome(res.data);
    }
  };
  useEffect(() => {
    fetch_mediaHome();
  }, []);
  useEffect(() => {
    let link = document.querySelector("link[rel~='icon']");
    if (!link) {
      link = document.createElement("link");
      link.rel = "icon";
      document.getElementsByTagName("head")[0].appendChild(link);
    }
    const logoImage = new Image();
    logoImage.src = `${process.env.REACT_APP_BACKEND_URL}/images/banner/${mediaHome.icon_web}`;

    logoImage.onload = () => {
      link.href = logoImage.src;
    };

    logoImage.onerror = () => {
      //console.error("Error loading logo image");
    };
    return () => {
      logoImage.onload = null;
      logoImage.onerror = null;
    };
  }, [mediaHome?.icon_web]);

  return (
    <div>
      {isLoading && <Loading />}
      {/* cho hien de render */}
      <div
        style={
          isLoading === false
            ? { visibility: "visible" }
            : { visibility: "hidden" }
        }
      >
        <Header setIsLoading={setIsLoading} />
        <Outlet context={[isShowVideo, handleSetVideo, setIsLoading]} />
        <Footer />

        <BasicSpeedDial className="contact-mui" />
      </div>

      {isShowVideo && (
        <div className="show-video">
          <div className="blur"></div>

          <div className="video-yt" ref={refOutside}>
            <ReactPlayer className="react-player" url={link} controls={true} />
          </div>
        </div>
      )}
    </div>
  );
};
export default Layout;
