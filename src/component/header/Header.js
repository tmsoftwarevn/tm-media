import "../../scss/header.scss";
import logo from "../../assets/logo.png";
import { MdKeyboardArrowDown } from "react-icons/md";
import { useLayoutEffect, useState } from "react";


const Header = () => {
  const [scrollPosition, setPosition] = useState(0);
  useLayoutEffect(() => {
    function updatePosition() {
      setPosition(window.scrollY);
    }
    window.addEventListener("scroll", updatePosition);
    updatePosition();
    return () => window.removeEventListener("scroll", updatePosition);
  }, []);
  return (
    <div className="header">
      <div
        className="header-1"
        // className={scrollPosition > 500 ? "" : "header-1"}
      >
        <div className="container">
          <div className="header-1_content">
            <p>sản xuất video quảng cáo</p>
            <p>HOTLINE: 0123.555.444</p>
          </div>
        </div>
      </div>

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
                    <li>Dịch vụ quay phim</li>
                    <li>Quay phim sự kiện</li>
                    <li>Quay phim Doanh Nghiệp</li>
                    <li>Quay phim TVC</li>
                    <li>Quay phim sản phẩm</li>
                    <li>Quay phim Spa</li>
                    <li>Quay phim Teambuilding</li>
                  </ul>
                </li>
                <li className="parent-li drop-parent">
                  chụp ảnh quảng cáo
                  <MdKeyboardArrowDown className="arrow-header" />
                  <ul className="dropdown-child">
                    <li>Chụp ảnh sản phẩm</li>
                    <li>Chụp hình sự kiện</li>
                    <li>Chụp ảnh khai trương</li>
                    <li>Chụp team building</li>
                    <li>Chụp ảnh profile</li>
                    <li>Chụp ảnh nhà hàng</li>
                    <li>Chụp hình menu</li>
                    <li>Chụp look book</li>
                    <li>Chụp ảnh công trình</li>
                  </ul>
                </li>
                <li className="parent-li drop-parent">
                  xây kênh tiktok
                  <MdKeyboardArrowDown className="arrow-header" />
                  <ul className="dropdown-child">
                    <li>Dịch vụ xây kênh tiktok</li>
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
