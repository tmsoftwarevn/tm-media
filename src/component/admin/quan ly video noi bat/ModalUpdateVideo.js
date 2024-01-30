import { Button, Card, Col, Flex, Input, Modal, Row, message } from "antd";
import { useEffect, useRef, useState } from "react";
import { Upload } from "antd";
import {
  callDeleteImg,
  callUpadteVideoNoibat,
  callUpload_Single_Img,
} from "../../../service/api";
import ReactPlayer from "react-player";

const UpdateVideo = (props) => {
  const [pathBannerVideo, setPathBannerVideo] = useState();
  const [name, setName] = useState();
  const [link, setLink] = useState();

  const {
    isModalUpdateVideo,
    setIsModalUpdateVideo,
    fetchAllVideo,
    dataUpdate,
  } = props;

  const [fileList, setFileList] = useState([
    {
      uid: "-1",
      name: "ảnh",
      status: "done",
      url: `${process.env.REACT_APP_BACKEND_URL}/images/banner/${dataUpdate?.video_bg}`,
    },
  ]);
 
  useEffect(() => {
    setLink(dataUpdate?.link);
    setName(dataUpdate?.name);
    setPathBannerVideo(dataUpdate?.video_bg);
    setFileList([
      {
        uid: "-1",
        name: "ảnh",
        status: "done",
        url: `${process.env.REACT_APP_BACKEND_URL}/images/banner/${dataUpdate?.video_bg}`,
      },
    ]);
  }, [dataUpdate]);

  const handleCancel = () => {
    setIsModalUpdateVideo(false);
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
  
  const handleCallUpdate = async () => {
    
    if (!pathBannerVideo || !link || !name) {
      message.error("Hãy nhập đầy đủ thông tin");
      return;
    }

    handleCancel();
    const res = await callUpadteVideoNoibat(
      dataUpdate?.id,
      pathBannerVideo,
      link,
      name
    );
    if (res && res.EC === 1) {
      message.success("Cập nhật thành công");
      fetchAllVideo();
    } else {
      message.error("Cập nhật thất bại");
    }
  };

  return (
    <>
      <Modal
        title="Cập nhật Video"
        open={isModalUpdateVideo}
        onOk={() => {
          handleCallUpdate();
        }}
        okText="Cập nhật"
        onCancel={handleCancel}
        maskClosable={false}
        forceRender
        width={1000}
        //centered
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
              <ReactPlayer
                url={link}
                width={"200px"}
                height={"auto"}
                controls={true}
              />

            </Card>
          </Col>
        </Row>
      </Modal>
    </>
  );
};

export default UpdateVideo;
