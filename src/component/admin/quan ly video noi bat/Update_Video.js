import { Button, Card, Col, Flex, Input, Row, message } from "antd";
import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { Upload } from "antd";
import {
  callDeleteImg,
  callGetVideoNoibat,
  callUpadteVideoNoibat,
  callUpload_Single_Img,
} from "../../../service/api";
import ReactPlayer from "react-player";

const Update_Video = () => {
  const params = useParams();
  const [detailVideo, setDetailVideo] = useState();

  const [pathBannerVideo, setPathBannerVideo] = useState();
  const [name, setName] = useState();
  const [link, setLink] = useState();

  const [fileList, setFileList] = useState([
    {
      uid: "-1",
      name: "ảnh",
      status: "done",
      url: `${process.env.REACT_APP_BACKEND_URL}/images/banner/${detailVideo?.video_bg}`,
    },
  ]);

  const fetchdetailVideo= async () => {
    const res = await callGetVideoNoibat(params.id);
    if (res && res.EC === 1) {
      setDetailVideo(res.data);
      setFileList([
        {
          uid: "-1",
          name: "ảnh",
          status: "done",
          url: `${process.env.REACT_APP_BACKEND_URL}/images/banner/${res.data.banner_bg}`,
        },
      ]);
    }
    // set data hiển thị khi call api thành công

    setPathBannerVideo(res.data?.video_bg);
    setLink(res.data?.link);
    setName(res.data?.name);
  };

  useEffect(() => {
    fetchdetailVideo();
  }, [params.id]);

  const onChange = ({ fileList: newFileList }) => {
    setFileList(newFileList);
  };

  const onPreview = async (file) => {
    let src = file.url;
    if (!src) {
      src = await new Promise((resolve) => {
        const reader = new FileReader();
        reader.readAsDataURL(file.originFileObj);
        reader.onload = () => resolve(reader.result);
      });
    }
    const image = new Image();
    image.src = src;
    const imgWindow = window.open(src);
    imgWindow?.document.write(image.outerHTML);
  };

  const handleUploadFile_bannerVideo = async ({ file, onSuccess, onError }) => {
    const res = await callUpload_Single_Img(file);
    if (res && res.data) {
      if (pathBannerVideo) {
        let remove = await callDeleteImg(pathBannerVideo);
      }
      setPathBannerVideo(res.data.fileUploaded);
      onSuccess("ok");
    } else {
      onError("Đã có lỗi khi upload");
    }
  };
  const handleCallUpdate = async () => {
    // nếu là trang chủ, ko có nội dung

    if (!pathBannerVideo || !link || !name) {
      message.error("Hãy nhập đầy đủ thông tin");
      return;
    }

    const data = {
      video_bg: pathBannerVideo,
      link: link,
      name: name,
    };
    console.log("check data: ", data);
    const res = await callUpadteVideoNoibat(params.id, data);
    if (res && res.EC === 1) {
      message.success("Cập nhật thành công");
      fetchdetailVideo();
    } else {
      message.error("Cập nhật thất bại");
    }
  };

  return (
    <div>
      <Row gutter={16}>
        <Col span={8}>
          <Card title="Tên video" bordered={true}>
            <Input
              onChange={(e) => setName(e.target.value)}
              placeholder="Nhập tên video"
              value={name}
            ></Input>
          </Card>
        </Col>
        <Col span={8}>
          <Card title="Ảnh nền video" bordered={true}>
            <Upload
              listType="picture-card"
              fileList={fileList}
              customRequest={handleUploadFile_bannerVideo}
              onChange={onChange}
              onPreview={onPreview}
              maxCount={1}
              multiple={false}
              accept="image/*"
            >
              Tải lên
            </Upload>
          </Card>
        </Col>
        <Col span={8}>
          <Card title="Video youtube" bordered={true}>
            <Input
              className="mb-4"
              onChange={(e) => setLink(e.target.value)}
              placeholder="Nhập link youtube"
              value={link}
            ></Input>
            <ReactPlayer
              url={detailVideo?.link}
              width={"100%"}
              height={"auto"}
              controls={true}
            />
          </Card>
        </Col>
      </Row>
     
      <Flex justify="center" className="mt-5">
        <Button type="primary" onClick={() => handleCallUpdate()}>
          Cập nhật
        </Button>
      </Flex>
    </div>
  );
};

export default Update_Video;
