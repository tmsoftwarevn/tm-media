import "../../scss/lienhe.scss";
import logo from "../../assets/logo tm branding.jpg";
import iconname from "../../assets/icon-name.png";
import iconphone from "../../assets/icon-phone.png";
import iconemail from "../../assets/icon-email.png";
import { useState } from "react";
import { IoCall } from "react-icons/io5";
import { callAddLienhe } from "../../service/api";
import { message } from "antd";

const LienHe = () => {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [noidung, setNoidung] = useState("");

  const handleSaveForm = async (e) => {
    e.preventDefault();

    const res = await callAddLienhe(name, phone, email, noidung);
    if (res && res.EC === 1) {
      message.success("Cảm ơn bạn đã liên hệ với TM Media");
      setName("");
      setEmail("");
      setPhone("");
      setNoidung("");
    } else {
      message.error("Vui lòng thử lại !");
    }
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
                <img src={logo} alt="logo" />
              </div>

              <p>
                <span>Văn phòng: </span>Sky9 Số 61, Đường số 1, Phường Phú Hữu,
                TP.Thủ Đức, Ho Chi Minh City, Vietnam
              </p>
              <p>
                <span>Hotline: </span>{process.env.REACT_APP_PHONE}
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
              <form onSubmit={handleSaveForm}>
                <div className="custom-input">
                  <img src={iconname} />
                  <input
                    type="text"
                    required
                    placeholder="Họ và tên"
                    onChange={(e) => setName(e.target.value)}
                    value={name}
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
                    value={phone}
                  />
                </div>
                <div className="custom-input">
                  <img src={iconemail} />
                  <input
                    type="email"
                    required
                    placeholder="Email"
                    onChange={(e) => setEmail(e.target.value)}
                    value={email}
                  />
                </div>
                <textarea
                  onChange={(e) => setNoidung(e.target.value)}
                  rows={10}
                  placeholder="Nội dung"
                  value={noidung}
                ></textarea>
                <div className="btn-lienhe">
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
