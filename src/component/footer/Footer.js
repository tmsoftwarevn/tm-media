import "../../scss/footer.scss";
import { FaFacebook, FaYoutube, FaTiktok } from "react-icons/fa";

import { MdKeyboardArrowDown } from "react-icons/md";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

//import "the-new-css-reset/css/reset.css";

const Footer = () => {
  const [isList, setList] = useState(false);
  const navigate = useNavigate();
  return (
    <div className="footer">
      <div className="container">
        <div className="main-f">
          <div className="row d-flex justify-content-between">
            <div className="col-xs-12 col-lg-4">
              <div className="title-f">Thông tin về chủ sở hữu website</div>
              <div className="des-f">
                <p>Tên công ty: CÔNG TY TNHH CÔNG NGHỆ TM SOFTWARE</p>

                <p>Địa chỉ: 5/2A Đường 112, Phường Phước Long A, TP.Thủ Đức</p>
                <p>Hotline: 0979.193.037 - 0979.249.222</p>
                <p>Copyright © 2019 TM. All Rights Reserved.</p>
              </div>
            </div>

            <div className="col-xs-12 col-lg-5">
              <div className="title-f">Hỗ trợ</div>
              <div className="des-f">
                <p>
                  VP.HCM: Sky 9, 61-63 Đường số 1, Phường Phú Hữu, TP.Thủ Đức,
                  Tp.Hồ Chí Minh.
                </p>
                <p>Hotline: 0979 249 222</p>
                <p>
                  VP.Bình Dương: Đường DX38, P.Phú Chánh, Tân Uyên, Bình Dương
                </p>
                <p>Hotline: 0979 193 037</p>
                <p>
                  {/* <FontAwesomeIcon
                    icon={faEnvelope}
                    style={{ marginRight: "5px" }}
                  /> */}
                  Email:
                  <a
                    href="mailto:info.tmsoftware.vn@gmail.com"
                    className="email-f"
                  >
                    info.tmsoftware.vn@gmail.com
                  </a>
                </p>

                <p>
                  {/* <FontAwesomeIcon
                    icon={faGlobe}
                    style={{ marginRight: "5px" }}
                  /> */}
                  Website:
                  <span
                    className="web"
                    onClick={() =>
                      window.open("https://tmsoftware.vn", "_blank")
                    }
                  >
                    https://tmsoftware.vn
                  </span>
                </p>
              </div>
            </div>

            <div className="col-xs-12 col-lg-3 ">
              <div className="title-f">Thông tin khác</div>
              <div className="des-f">
                <div className="box-tm footer-3">
                  <p className="t-tm" onClick={() => setList(!isList)}>
                    về TM{" "}
                    <MdKeyboardArrowDown
                      style={{
                        fontSize: "25px",
                      }}
                    />
                  </p>
                  <div
                    className="dropdown-f"
                    style={isList ? { display: "block" } : { display: "none" }}
                  >
                    <li onClick={() => navigate("/san-pham")}>sản phẩm</li>
                    <li onClick={() => navigate("/bang-gia")}>bảng giá</li>
                    <li onClick={() => navigate("/case-study")}>case study</li>
                    <li onClick={() => navigate("/dich-vu-chuyen-sau")}>
                      dịch vụ chuyên sâu
                    </li>
                    <li onClick={() => navigate("/blogs")}>blogs</li>
                  </div>
                </div>

                <FaFacebook
                  style={{
                    marginRight: "15px",
                    fontSize: "20px",
                    cursor: "pointer",
                  }}
                  className="icon-f"
                />
                <FaYoutube
                  style={{
                    marginRight: "15px",
                    fontSize: "20px",
                    cursor: "pointer",
                  }}
                  className="icon-f"
                />
                <FaTiktok
                  style={{
                    marginRight: "15px",
                    fontSize: "20px",
                    cursor: "pointer",
                  }}
                  className="icon-f"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Footer;
