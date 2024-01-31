import { IoCall } from "react-icons/io5";

const BannerHeader = (props) => {
    const {media,handleSetVideo} = props
  return (
    <section id="b-5324">
      <div className="bg-banner">
        <img
          src={`${process.env.REACT_APP_BACKEND_URL}/images/banner/${media?.banner_bg}`}
          alt=""
        />
      </div>
      <div className="overlay"></div>

      <div className="bg-banner_content">
        <div className="container">
          <div className="row">
            <div className="col-md-6 bg-banner_content_left">
              <h3 className="h3-1">LÀ NHÀ CUNG CẤP</h3>
              <h3 className="h3-2">
                GIẢI PHÁP SẢN XUẤT VIDEO HÌNH ẢNH QUẢNG CÁO
              </h3>
              <h3 className="h3-3">
                VỚI CHI PHÍ TỐI ƯU CHO CHIẾN DỊCH VIDEO MARKETING CỦA BẠN!
              </h3>
              <div className="tuvan">
                <IoCall style={{ marginRight: "5px" }} />
                Tư vấn ngay
              </div>
            </div>

            <div className="col-md-6 bg-banner_content_right">
              <div className="group-right">
                <img
                  src={`${process.env.REACT_APP_BACKEND_URL}/images/banner/${media?.video_bg}`}
                  alt=""
                />

                <div
                  className="glightbox_video"
                  onClick={() => handleSetVideo(true, media?.link)}
                >
                  <svg
                    viewBox="0 0 131 131"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      className="inner-circle"
                      d="M65 21C40.1488 21 20 41.1488 20 66C20 90.8512 40.1488 111 65 111C89.8512 111 110 90.8512 110 66C110 41.1488 89.8512 21 65 21Z"
                      fill="white"
                    ></path>
                    <circle
                      className="outer_circle"
                      cx="65.5"
                      cy="65.5"
                      r="64"
                      stroke="white"
                    ></circle>
                    <path
                      className="play"
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M60 76V57L77 66.7774L60 76Z"
                      fill="#BF2428"
                    ></path>
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BannerHeader;
