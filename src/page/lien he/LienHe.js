import "../../scss/lienhe.scss";
import logo from "../../assets/logo tm branding.jpg";
import iconname from "../../assets/icon-name.png";
import iconphone from "../../assets/icon-phone.png";
import iconemail from "../../assets/icon-email.png";
import { useState } from "react";
import { IoCall } from "react-icons/io5";

const LienHe = () => {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [noidung, setNoidung] = useState("");
    

  const handleSaveForm = (e) => {
    // e.preventDefault();
    const data = {
      name,
      phone,
      email,
      noidung,
    };
    console.log(data);
  };
  return (
    <div className="lienhe">
      <div className="lienhe_title">
        <p></p> Đăng ký tư vấn <p></p>
      </div>
      <div className="container">
        <div className="row">
          <div className="col-md-6">
            <div className="lienhe_left">
              <div className="anh">
                <img src={logo} />
              </div>

              <p>
                <span>Văn phòng: </span>Sky9 Số 61, Đường số 1, Phường Phú Hữu,
                TP.Thủ Đức, Ho Chi Minh City, Vietnam
              </p>
              <p>
                <span>Hotline: </span>097 924 92 22
              </p>
              <p>
                <span>Email: </span>mr.haidesign@gmail.com
              </p>
              <p
                className="web"
                onClick={() => window.open("https://tmbranding.vn/", "_blank")}
              >
                <span>Website: </span>tmbranding.vn
              </p>
            </div>
            <div className="lienhe_left_tuvan">
                    <IoCall style={{ marginRight: "5px" }} />
                    tư vấn ngay
                  </div>
          </div>
          <div className="col-md-6">
            <div className="lienhe_right">
              <form>
                <div className="custom-input">
                  <img src={iconname} />
                  <input
                    type="text"
                    required
                    placeholder="Họ và tên"
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
                <div className="custom-input">
                  <img src={iconphone} />
                  <input
                    type="tel"
                    required
                    placeholder="Số điện thoại"
                    pattern="(03|05|07|08|09)[0-9]{8}"
                    onChange={(e) => setPhone(e.target.value)}
                  />
                </div>
                <div className="custom-input">
                  <img src={iconemail} />
                  <input
                    type="email"
                    required
                    placeholder="Email"
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <textarea
                  onChange={(e) => setNoidung(e.target.value)}
                  rows={10}
                  placeholder="Nội dung"
                ></textarea>
                <div className="btn-lienhe" onClick={(e) => handleSaveForm(e)}>
                  <button type="submit" className="btn-lienhe">
                    Gửi liên hệ
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LienHe;
