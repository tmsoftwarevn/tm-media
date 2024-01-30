import "../../scss/header.scss";
import logo from "../../assets/logo.png";
import { MdKeyboardArrowDown } from "react-icons/md";
import { useEffect, useLayoutEffect, useState } from "react";
import { callMenu_byid } from "../../service/api";


const Header = () => {
  const [scrollPosition, setPosition] = useState(0);
  const [menu_video, setMenu_video] = useState([]);
  const [menu_chupanh, setMenu_chupanh] = useState([]);
  const [menu_xaykenh, setMenu_xaykenh] = useState([]);

  useLayoutEffect(() => {
    function updatePosition() {
      setPosition(window.scrollY);
    }
    window.addEventListener("scroll", updatePosition);
    updatePosition();
    return () => window.removeEventListener("scroll", updatePosition);
  }, []);
  const fetch_getMenu = async () => {
    //1: video, 2: chup anh, 3: xay kenh
    let video = await callMenu_byid(1);
    {
      if (video && video.EC === 1) {
        setMenu_video(video.data);
      }
    }
    let chupanh = await callMenu_byid(2);
    {
      if (chupanh && chupanh.EC === 1) {
        setMenu_chupanh(chupanh.data);
      }
    }
    let xaykenh = await callMenu_byid(3);
    {
      if (xaykenh && xaykenh.EC === 1) {
        setMenu_xaykenh(xaykenh.data);
      }
    }
  };
  useEffect(() => {
    fetch_getMenu();
  }, []);

  return (
    <div className="header">
  
      {/* <div className="header-1">
        <div className="container">
          <div className="header-1_content">
            <p>TM MEDIA</p>
            <p>HOTLINE: 0123.555.444</p>
          </div>
        </div>
      </div> */}

      <div
        //className="header-2"
        className={scrollPosition > 500 ? "header-sticky" : "header-2"}
      >
        <div className="container">
          <div className="header-2_content">
            <div className="logo">
              <img src={logo} alt="logo" />
            </div>
            <div className="menu">
              <ul className="parent-ul">
                <li className="parent-li">Trang chủ</li>
                <li className="drop-parent parent-li">
                  sản xuất video
                  <MdKeyboardArrowDown className="arrow-header" />
                  <ul className="dropdown-child">
                    {menu_video.map((item) => {
                      return <li>{item.name}</li>;
                    })}
                  </ul>
                </li>
                <li className="parent-li drop-parent">
                  chụp ảnh quảng cáo
                  <MdKeyboardArrowDown className="arrow-header" />
                  <ul className="dropdown-child">
                    {menu_chupanh.map((item, index) => {
                      return <li key={item.id}>{item.name}</li>;
                    })}
                  </ul>
                </li>
                <li className="parent-li drop-parent">
                  dịch vụ xây kênh
                  <MdKeyboardArrowDown className="arrow-header" />
                  <ul className="dropdown-child">
                    {menu_xaykenh.map((item) => {
                      return <li key={item.id}>{item.name}</li>;
                    })}
                  </ul>
                </li>
                <li className="parent-li">bài viết</li>
                <li className="parent-li">liên hệ</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Header;
