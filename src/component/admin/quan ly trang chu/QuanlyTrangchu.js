import {
  callDeleteImg,
  callDetailTrangchu,
  callUpdateTrangchu,
  callUpload_Single_Img,
} from "../../../service/api";
import { Button, Card, Col, Flex, Input, Row, message } from "antd";
import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { Upload } from "antd";
import ReactPlayer from "react-player";
import TextArea from "antd/es/input/TextArea";
import { Editor } from "@tinymce/tinymce-react";

const QuanlyTrangchu = () => {
  const [trangchu, setTrangchu] = useState("");
  const [detailMedia, setDetailMedia] = useState();

  const [key_word, setKey_word] = useState("");
  const [meta_des, setMeta_des] = useState("");
  const [pathBannerBg, setPathBannerBg] = useState();
  const [pathBannerVideo, setPathBannerVideo] = useState();
  const [link, setLink] = useState();

  const [logo, setLogo] = useState();
  const [logo_iconWweb, setlogo_iconWweb] = useState();

  const [mota_cty, setMota_cty] = useState();
  const [thuonghieu, setThuonghieu] = useState();
  const [bg_thongke, setBg_thongke] = useState();
  const [s1, setS1] = useState();
  const [s2, setS2] = useState();
  const [s3, setS3] = useState();

  const [t1, setT1] = useState();
  const [t2, setT2] = useState();
  const [t3, setT3] = useState();

  const [fileList, setFileList] = useState([
    {
      uid: "-1",
      name: "ảnh",
      status: "done",
      url: `${process.env.REACT_APP_BACKEND_URL}/images/banner/${detailMedia?.banner_bg}`,
    },
  ]);
  const [fileList_2, setFileList_2] = useState([{}]);
  const [fileList_3, setFileList_3] = useState([{}]);
  const [fileList_4, setFileList_4] = useState([{}]);
  const [fileList_5, setFileList_5] = useState([{}]);
  const [fileList_6, setFileList_6] = useState([{}]);

  const fetchTrangchu = async () => {
    let res = await callDetailTrangchu();
    if (res && res.EC === 1) {
      setTrangchu(res.data);

      setFileList([
        {
          uid: "-1",
          name: "ảnh",
          status: "done",
          url: `${process.env.REACT_APP_BACKEND_URL}/images/banner/${res.data.banner_bg}`,
        },
      ]);

      setFileList_2([
        {
          uid: "-1",
          name: "ảnh",
          status: "done",
          url: `${process.env.REACT_APP_BACKEND_URL}/images/banner/${res.data.video_bg}`,
        },
      ]);
      setFileList_3([
        {
          uid: "-1",
          name: "ảnh",
          status: "done",
          url: `${process.env.REACT_APP_BACKEND_URL}/images/banner/${res.data.logo}`,
        },
      ]);
      setFileList_4([
        {
          uid: "-1",
          name: "ảnh",
          status: "done",
          url: `${process.env.REACT_APP_BACKEND_URL}/images/banner/${res.data.thuonghieu}`,
        },
      ]);
      setFileList_5([
        {
          uid: "-1",
          name: "ảnh",
          status: "done",
          url: `${process.env.REACT_APP_BACKEND_URL}/images/banner/${res.data.bg_thongke}`,
        },
      ]);
      setFileList_6([
        {
          uid: "-1",
          name: "ảnh",
          status: "done",
          url: `${process.env.REACT_APP_BACKEND_URL}/images/banner/${res.data.icon_web}`,
        },
      ]);
    }
    // set data hiển thị khi call api thành công
    setPathBannerBg(res.data?.banner_bg);
    setPathBannerVideo(res.data?.video_bg);
    setLink(res.data?.link);
    setKey_word(res.data?.key_word);
    setMeta_des(res.data?.meta_des);

    setLogo(res.data.logo);
    setlogo_iconWweb(res.data.icon_web);

    setMota_cty(res.data.mota_cty);
    setThuonghieu(res.data.thuonghieu);
    setBg_thongke(res.data.bg_thongke);
    setS1(res.data.s1);
    setS2(res.data.s2);
    setS3(res.data.s3);
    setT1(res.data.t1);
    setT2(res.data.t2);
    setT3(res.data.t3);
  };
  
  useEffect(() => {
    fetchTrangchu();
  }, []);

  const onChange = ({ fileList: newFileList }) => {
    setFileList(newFileList);
  };
  const onChange_2 = ({ fileList: newFileList_2 }) => {
    setFileList_2(newFileList_2);
  };
  const onChange_3 = ({ fileList: newFileList_3 }) => {
    setFileList_3(newFileList_3);
  };
  const onChange_4 = ({ fileList: newFileList_4 }) => {
    setFileList_4(newFileList_4);
  };
  const onChange_5 = ({ fileList: newFileList_5 }) => {
    setFileList_5(newFileList_5);
  };
  const onChange_6 = ({ fileList: newFileList_6 }) => {
    setFileList_6(newFileList_6);
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
  const handleUploadFile_bannerBg = async ({ file, onSuccess, onError }) => {
    const res = await callUpload_Single_Img(file);
    if (res && res.data) {
      if (pathBannerBg) {
        let remove = await callDeleteImg(pathBannerBg);
      }

      setPathBannerBg(res.data.fileUploaded);
      onSuccess("ok");
    } else {
      onError("Đã có lỗi khi upload");
    }
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
  const handleUploadFile_logo = async ({ file, onSuccess, onError }) => {
    const res = await callUpload_Single_Img(file);
    if (res && res.data) {
      if (logo) {
        let remove = await callDeleteImg(logo);
      }
      setLogo(res.data.fileUploaded);
      onSuccess("ok");
    } else {
      onError("Đã có lỗi khi upload");
    }
  };
  const handleUploadFile_logo_iconweb = async ({
    file,
    onSuccess,
    onError,
  }) => {
    const res = await callUpload_Single_Img(file);
    if (res && res.data) {
      if (logo_iconWweb) {
        let remove = await callDeleteImg(logo_iconWweb);
      }
      setlogo_iconWweb(res.data.fileUploaded);
      onSuccess("ok");
    } else {
      onError("Đã có lỗi khi upload");
    }
  };
  const handleUploadFile_thuonghieu = async ({ file, onSuccess, onError }) => {
    const res = await callUpload_Single_Img(file);
    if (res && res.data) {
      if (thuonghieu) {
        let remove = await callDeleteImg(thuonghieu);
      }
      setThuonghieu(res.data.fileUploaded);
      onSuccess("ok");
    } else {
      onError("Đã có lỗi khi upload");
    }
  };
  const handleUploadFile_thongke = async ({ file, onSuccess, onError }) => {
    const res = await callUpload_Single_Img(file);
    if (res && res.data) {
      if (bg_thongke) {
        let remove = await callDeleteImg(bg_thongke);
      }
      setBg_thongke(res.data.fileUploaded);
      onSuccess("ok");
    } else {
      onError("Đã có lỗi khi upload");
    }
  };
  const handleCallUpdate = async () => {
    if (
      !pathBannerBg ||
      !pathBannerVideo ||
      !link ||
      !key_word ||
      !meta_des ||
      !logo ||
      !logo_iconWweb ||
      !mota_cty ||
      !thuonghieu ||
      !bg_thongke ||
      !s1 ||
      !s2 ||
      !s3 ||
      !t1 ||
      !t2 ||
      !t3
    ) {
      message.error("Hãy nhập đầy đủ thông tin");
      return;
    }

    const res = await callUpdateTrangchu(
      key_word,
      meta_des,
      pathBannerBg,
      pathBannerVideo,
      link,
      logo,
      logo_iconWweb,
      mota_cty,
      thuonghieu,
      bg_thongke,
      s1,
      s2,
      s3,
      t1,
      t2,
      t3
    );
    if (res && res.EC === 1) {
      message.success("Cập nhật thành công");
      fetchTrangchu();
    } else {
      message.error("Cập nhật thất bại");
    }
  };
  return (
    <>
      <Flex justify="end" className="mb-5">
        <Button type="primary" onClick={() => handleCallUpdate()}>
          Cập nhật
        </Button>
      </Flex>
      <Row gutter={16}>
        <Col span={12}>
          <Card title="Key word">
            <TextArea
              rows={3}
              onChange={(e) => setKey_word(e.target.value)}
              value={key_word}
              maxLength={1000}
            />
          </Card>
        </Col>
        <Col span={12}>
          <Card title="Description">
            <TextArea
              rows={3}
              value={meta_des}
              onChange={(e) => setMeta_des(e.target.value)}
              maxLength={1000}
            />
          </Card>
        </Col>
      </Row>
      <Row gutter={16}>
        <Col span={12}>
          <Card title="Ảnh nền header" bordered={true}>
            <Upload
              listType="picture-card"
              fileList={fileList}
              customRequest={handleUploadFile_bannerBg}
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
          <Card title="Ảnh nền video" bordered={true}>
            <Upload
              listType="picture-card"
              fileList={fileList_2}
              customRequest={handleUploadFile_bannerVideo}
              onChange={onChange_2}
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
          <Card title="Logo cty" bordered={true}>
            <Upload
              listType="picture-card"
              fileList={fileList_3}
              customRequest={handleUploadFile_logo}
              onChange={onChange_3}
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
        <Card title="Icon website trên cùng" bordered={true}>
          <Upload
            listType="picture-card"
            fileList={fileList_6}
            customRequest={handleUploadFile_logo_iconweb}
            onChange={onChange_6}
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
          <Card title="background thống kê" bordered={true}>
            <Upload
              listType="picture-card"
              fileList={fileList_5}
              customRequest={handleUploadFile_thongke}
              onChange={onChange_5}
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
          <Card title="Mô tả công ty" bordered={true}>
            {/* <TextArea
              rows={5}
              value={mota_cty}
              onChange={(e) => setMota_cty(e.target.value)}
              maxLength={1000}
            /> */}
            <Editor
              apiKey={process.env.REACT_APP_API_KEY_EDITOR}
              onChange={(evt, editor) => setMota_cty(editor.getContent())}
              initialValue={mota_cty}
              init={{
                height: 200,
                menubar: false,
                plugins: [
                  "advlist",
                  "autolink",
                  "lists",
                  "link",
                  "image",
                  "charmap",
                  "preview",
                  "anchor",
                  "searchreplace",
                  "visualblocks",
                  "code",
                  "fullscreen",
                  "insertdatetime",
                  "media",
                  "table",
                  "code",
                  "help",
                  "wordcount",
                ],
                toolbar:
                  "undo redo | blocks | " +
                  "bold italic fontsize forecolor | alignleft aligncenter " +
                  "alignright alignjustify | bullist numlist outdent indent ",
                content_style:
                  "body { font-family: Helvetica, Arial, sans-serif; font-size: 14px }",
                fontsize_formats: "8px 10px 12px 14px 18px 24px 36px",
              }}
            />
          </Card>
        </Col>
        <Col span={12}>
          <Card title="Thống kê 1" bordered={true}>
            <Input
              className="mb-4"
              onChange={(e) => setS1(e.target.value)}
              value={s1}
            ></Input>
          </Card>
        </Col>
        <Col span={12}>
          <Card title="Mô tả thống kê 1" bordered={true}>
            <Input
              className="mb-4"
              onChange={(e) => setT1(e.target.value)}
              value={t1}
            ></Input>
          </Card>
        </Col>
        <Col span={12}>
          <Card title="Thống kê 2" bordered={true}>
            <Input
              className="mb-4"
              onChange={(e) => setS2(e.target.value)}
              value={s2}
            ></Input>
          </Card>
        </Col>
        <Col span={12}>
          <Card title="Mô tả thống kê 2" bordered={true}>
            <Input
              className="mb-4"
              onChange={(e) => setT2(e.target.value)}
              value={t2}
            ></Input>
          </Card>
        </Col>
        <Col span={12}>
          <Card title="Thống kê 3" bordered={true}>
            <Input
              className="mb-4"
              onChange={(e) => setS3(e.target.value)}
              value={s3}
            ></Input>
          </Card>
        </Col>
        <Col span={12}>
          <Card title="Mô tả thống kê 3" bordered={true}>
            <Input
              className="mb-4"
              onChange={(e) => setT3(e.target.value)}
              value={t3}
            ></Input>
          </Card>
        </Col>
        <Col span={12}>
          <Card title="Link youtube" bordered={true}>
            <Input
              className="mb-4"
              onChange={(e) => setLink(e.target.value)}
              placeholder="Nhập link youtube"
              value={link}
            ></Input>
            <ReactPlayer url={link} width={"100%"} controls={true} />
          </Card>
        </Col>

        <Col span={12}>
          <Card title="Thương hiệu" bordered={true}>
            <Upload
              listType="picture-card"
              fileList={fileList_4}
              customRequest={handleUploadFile_thuonghieu}
              onChange={onChange_4}
              onPreview={onPreview}
              maxCount={1}
              multiple={false}
              accept="image/*"
            >
              Tải lên
            </Upload>
          </Card>{" "}
          */
        </Col>
      </Row>
    </>
  );
};
export default QuanlyTrangchu;
