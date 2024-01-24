import "../../scss/home.scss";
import { IoCall } from "react-icons/io5";
import bg_video from "../../assets/banner-bg/home-video.jpg"
const Home = () => {
  return (
    <div className="home">
      <div className="bg-banner">
        <div className="overlay"></div>
        <div className="container">
            <div className="bg-banner_content">
                <div className="row">
                    <div className="col-md-6 bg-banner_content_left">
                        <h3 className="h3-1">LÀ NHÀ CUNG CẤP</h3>
                        <h3 className="h3-2">GIẢI PHÁP SẢN XUẤT VIDEO HÌNH ẢNH QUẢNG CÁO</h3>
                        <h3 className="h3-3">VỚI CHI PHÍ TỐI ƯU CHO CHIẾN DỊCH VIDEO MARKETING CỦA BẠN!</h3>
                        <div className="tuvan">
                          <IoCall style={{marginRight: "5px"}}/>
                            tư vấn ngay
                        </div>
                    </div>
                    <div className="col-md-6 bg-banner_content_right">
                        {/* <img src={bg_video}></img> */}
                    </div>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
