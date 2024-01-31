import "../../scss/home.scss";
import "../../scss/bannerHeader.scss";

import { useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";
import doi_tac from "../../assets/doi-tac-tieu-bieu.png";
import CountUp from "react-countup";

import LienHe from "../lien he/LienHe";
import { callActive_menu, callDetailMedia } from "../../service/api";
import Video from "../../component/video/Video";
import BannerHeader from "../bannerHeader";

const Home = () => {
  const [isShowVideo, handleSetVideo] = useOutletContext();
  const [mediaHome, setMediaHome] = useState("");
  const [activeMenu, setActiveMenu] = useState([]);

  const fetch_mediaHome = async () => {
    const res = await callDetailMedia(1);
    if (res && res.EC === 1) {
      setMediaHome(res.data);
    }
  };

  const fetch_ActiveMenu = async () => {
    const res = await callActive_menu();
    if (res && res.EC === 1) {
      setActiveMenu(res.data);
    }
  };
  
  useEffect(() => {
    fetch_mediaHome();
    fetch_ActiveMenu();
  }, []);

  return (
    <>
      <div className="home">
        <BannerHeader media = {mediaHome} handleSetVideo = {handleSetVideo}/>
        <section id="gt-6978">
          <div className="container">
            <div className="row">
              <div className="col-md-6 thong-tin">
                <p className="thong-tin_title">TM MEDIA – VIDEO MARKETING</p>
                <div className="thong-tin_des">
                  <p>
                    Chúng tôi tự hào là đơn vị TM MEDIA cung cấp các giải pháp
                    Sản xuất video hình ảnh giúp nhiều Doanh Nghiệp quảng bá
                    thương hiệu đúng với mục đích Marketing truyền tải thông
                    điệp nhận diện đúng đến với khách hàng.
                  </p>
                  <p>
                    Với đội ngũ nhiều năm kinh nghiệp có thể tư vấn giúp cho
                    Doanh Nghiệp tối ưu chi phí sản xuất video hình ảnh một cách
                    tinh gọn nhất.
                  </p>
                </div>
                {/* <div className="thong-tin_btn">yêu cầu tư vấn</div> */}
                <div className="thong-tin_btn">
                  {/* <IoCall style={{ marginRight: "5px" }} /> */}
                  Liên hệ ngay
                </div>
              </div>
              <div className="col-md-6 thuonghieu">
                <img src={doi_tac} alt=""/>
                <p>
                  HƠN 2.183 THƯƠNG HIỆU BẬC NHẤT ĐANG TIN DÙNG DỊCH VỤ SẢN XUẤT
                  VIDEO{" "}
                </p>
              </div>
            </div>
          </div>
        </section>

        <section id="tk-5234">
          <div className="bg-tk"></div>
          <div className="overlay"></div>
          <div className="thong-ke">
            <div className="container">
              <div className="row">
                <div className="col-md-4 ">
                  <p>
                    {" "}
                    +<CountUp enableScrollSpy end={95} /> % DỰ ÁN HIỆU QUẢ
                  </p>
                  <p>
                    Hơn <CountUp enableScrollSpy end={95} /> Khách Hàng phản hồi
                    hài lòng dịch vụ của chúng tôi.
                  </p>
                </div>
                <div className="col-md-4">
                  <p>
                    <CountUp enableScrollSpy end={3000} />+ DỰ ÁN VIDEO
                  </p>
                  <p>
                    Hơn <CountUp enableScrollSpy end={3000} /> Video được thực
                    hiện Rất nhiều BST hình ảnh xuất bản.
                  </p>
                </div>
                <div className="col-md-4">
                  <p>
                    <CountUp enableScrollSpy end={12} />+ NĂM KINH NGHIỆP
                  </p>
                  <p>
                    Chúng tôi tự tin mang lại cho bạn những sản phẩm hiệu quả.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {activeMenu && activeMenu.map((item) => {
          return (
            <Video
              name={item}
              isShowVideo={isShowVideo}
              handleSetVideo={handleSetVideo}
            />
          );
        })}

        <LienHe />

        <div className="bando">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3919.093105813445!2d106.78851607405382!3d10.804180789346265!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3175299e2905e89f%3A0x56753105cfc85bb2!2zVE0gQnJhbmRpbmcgLSBUaGnhur90IGvhur8gJiBUcnV54buBbiB0aMO0bmc!5e0!3m2!1svi!2s!4v1706087870820!5m2!1svi!2s"
            width="100%"
            height="450"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
      </div>
    </>
  );
};

export default Home;
