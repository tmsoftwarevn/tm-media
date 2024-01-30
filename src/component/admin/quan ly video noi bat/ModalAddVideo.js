import { Button, Card, Col, Flex, Input, Modal, Row, message } from "antd";
import { useEffect, useRef, useState } from "react";
import { Upload } from "antd";
import {
    callAddVideoNoibat,
  callDeleteImg,
  callUpadteVideoNoibat,
  callUpload_Single_Img,
} from "../../../service/api";
import ReactPlayer from "react-player";
import { useParams } from "react-router-dom";

const AddVideo = (props) => {
  const params = useParams();

  const [pathBannerVideo, setPathBannerVideo] = useState("");
  const [name, setName] = useState("");
  const [link, setLink] = useState("");

  const { isModalAddVideo, setIsModalAddVideo, fetchAllVideo } = props;

  const [fileList, setFileList] = useState([
    
  ]);

  const handleCancel = () => {
    setIsModalAddVideo(false);
    setFileList([]);
    setLink("");
    setName("");
  };

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

  const handleCallAdd = async () => {
    if (!pathBannerVideo || !link || !name) {
      message.error("Hãy nhập đầy đủ thông tin");
      return;
    }

    handleCancel();
    const res = await callAddVideoNoibat(
      params.id,
      pathBannerVideo,
      link,
      name
    );
    if (res && res.EC === 1) {
      message.success("Thêm thành công");
      fetchAllVideo();
    } else {
      message.error("Thêm thất bại");
    }
  };

  return (
    <>
      <Modal
        title="Thêm Video"
        open={isModalAddVideo}
        onOk={() => {
          handleCallAdd();
        }}
        okText="Thêm"
        onCancel={handleCancel}
        maskClosable={false}
        forceRender
        width={1000}
        
      >
        <Row gutter={16}>
          <Col span={12}>
            <Card title="Tên video" bordered={true}>
              <Input
                onChange={(e) => setName(e.target.value)}
                placeholder="Nhập tên video"
                value={name}
              ></Input>
            </Card>
          </Col>
          <Col span={12}>
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
          <Col span={12}>
            <Card title="Video youtube" bordered={true}>
              <Input
                className="mb-4"
                onChange={(e) => setLink(e.target.value)}
                placeholder="Nhập link youtube"
                value={link}
              ></Input>
            </Card>
          </Col>
        </Row>
      </Modal>
    </>
  );
};

export default AddVideo;
