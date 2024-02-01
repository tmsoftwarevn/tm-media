import "../../scss/footer.scss";

import { MdKeyboardArrowRight, MdLocationOn } from "react-icons/md";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { IoCall } from "react-icons/io5";
import { IoMdMail } from "react-icons/io";
import { BiWorld } from "react-icons/bi";
import { callMenu_byid } from "../../service/api";
import { convertSlug } from "../../utils/convertSlug";
import { FaFacebookSquare } from "react-icons/fa";

const Footer = () => {
  const [menu_video, setMenu_video] = useState([]);
  const [menu_chupanh, setMenu_chupanh] = useState([]);
  const [menu_xaykenh, setMenu_xaykenh] = useState([]);
  const navigate = useNavigate();

  const fetch_getMenu = async () => {
    //1: video, 2: chup anh, 3: xay kenh
    let video = await callMenu_byid(1);

    if (video && video.EC === 1) {
      setMenu_video(video.data);
    }

    let chupanh = await callMenu_byid(2);

    if (chupanh && chupanh.EC === 1) {
      setMenu_chupanh(chupanh.data);
    }

    let xaykenh = await callMenu_byid(3);

    if (xaykenh && xaykenh.EC === 1) {
      setMenu_xaykenh(xaykenh.data);
    }
  };
  useEffect(() => {
    fetch_getMenu();
  }, []);

  return (
    <footer className="footer">
      <div className="container">
        <section id="lab_social_icon_footer">
          <div class="container">
            <div class="text-center center-block">
              <a href="https://www.facebook.com/bootsnipp">
                {/* <i
                  id="social-fb"
                  class="fa fa-facebook-square fa-3x social"
                ></i> */}
                <FaFacebookSquare id="social-fb" />
              </a>
              <a href="https://twitter.com/bootsnipp">
                <i id="social-tw" class="fa fa-twitter-square fa-3x social"></i>
              </a>
              <a href="https://plus.google.com/+Bootsnipp-page">
                <i
                  id="social-gp"
                  class="fa fa-google-plus-square fa-3x social"
                ></i>
              </a>
              <a href="mailto:#">
                <i
                  id="social-em"
                  class="fa fa-envelope-square fa-3x social"
                ></i>
              </a>
            </div>
          </div>
        </section>
        {/* // info  */}
        <div className="row">
          <div class="footer-col col-md-3">
            <h4>Liên hệ</h4>
            <ul className="ul-ft">
              <li>
                <MdLocationOn
                  style={{
                    marginRight: "8px",
                    fontSize: "18px",
                    marginBottom: "3px",
                  }}
                />
                Sky9 Số 61, Đường số 1, Phường Phú Hữu, TP.Thủ Đức, Ho Chi Minh
                City, Vietnam
              </li>
              <li
                onClick={() => {
                  window.open("tel:" + process.env.REACT_APP_PHONE);
                }}
              >
                <IoCall
                  style={{
                    marginRight: "8px",
                    fontSize: "18px",
                    marginBottom: "3px",
                  }}
                />
                {process.env.REACT_APP_PHONE}
              </li>
              <li
                onClick={() => {
                  window.open("mailto:" + "mr.haidesign@gmail.com");
                }}
              >
                <IoMdMail
                  style={{
                    marginRight: "8px",
                    fontSize: "18px",
                    marginBottom: "3px",
                  }}
                />
                mr.haidesign@gmail.com
              </li>
              <li
                onClick={() => window.open("https://tmbranding.vn/", "_blank")}
              >
                <BiWorld
                  style={{
                    marginRight: "8px",
                    fontSize: "18px",
                    marginBottom: "3px",
                  }}
                />
                tmbranding.vn
              </li>
            </ul>
          </div>
          <div class="footer-col col-md-3">
            <h4>Sản xuất video</h4>
            <ul className="ul-ft">
              {menu_video.map((item, index) => {
                let name_slug = convertSlug(item.name);
                return (
                  <li
                    key={item.id}
                    onClick={() =>
                      navigate(`/${name_slug}`, {
                        state: { idMedia: item.id, name: item.name },
                      })
                    }
                  >
                    <MdKeyboardArrowRight />
                    {item.name}
                  </li>
                );
              })}
            </ul>
          </div>
          <div class="footer-col col-md-3">
            <h4>Chụp ảnh quảng cáo</h4>
            <ul className="ul-ft">
              {menu_chupanh.map((item, index) => {
                let name_slug = convertSlug(item.name);
                return (
                  <li
                    key={item.id}
                    onClick={() =>
                      navigate(`/${name_slug}`, {
                        state: { idMedia: item.id, name: item.name },
                      })
                    }
                  >
                    <MdKeyboardArrowRight />
                    {item.name}
                  </li>
                );
              })}
            </ul>
          </div>
          <div class="footer-col col-md-3">
            <h4>Xây kênh</h4>
            <ul className="ul-ft">
              {menu_xaykenh.map((item, index) => {
                let name_slug = convertSlug(item.name);
                return (
                  <li
                    key={item.id}
                    onClick={() =>
                      navigate(`/${name_slug}`, {
                        state: { idMedia: item.id, name: item.name },
                      })
                    }
                  >
                    <MdKeyboardArrowRight />
                    {item.name}
                  </li>
                );
              })}
            </ul>
          </div>
        </div>

        <p className="ft-end">
          {" "}
          &copy; All rights reserved. Designed By{" "}
          <span
            className="sp-tm"
            onClick={() => window.open("https://tmsoftware.vn/", "_blank")}
          >
            TM Software
          </span>
        </p>
      </div>
    </footer>
  );
};
export default Footer;
