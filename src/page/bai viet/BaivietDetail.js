import { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import { callGetdetail_Baiviet } from "../../service/api";
import moment from "moment";
import "../../scss/baiviet_detail.scss";

const BaivietDetail = () => {
  const location = useLocation();
  //const params = new URLSearchParams(location.search);
  //const id = params.get("id");
  const params = useParams();
  const [detail, setDetail] = useState("");

  const fetch_DetialBaiviet = async () => {
    const res = await callGetdetail_Baiviet(params.id);
    if (res && res.EC === 1) {
      setDetail(res.data);
    }
  };
  useEffect(() => {
    fetch_DetialBaiviet();
  }, [params.id]);

  return (
    <>
      <div className="baiviet-detail">
        <div className="container">
          {/* <div className="g-detail">
            <h1 className="title-baiviet">{detail.tieude}</h1>
            <div className="time-baiviet">
              {moment(detail?.createdAt).format("D-MM-Y")}
            </div>
          </div> */}

          <div className="noidung">
            <div dangerouslySetInnerHTML={{ __html: detail?.noidung }}></div>
          </div>
        </div>
      </div>
    </>
  );
};

export default BaivietDetail;
