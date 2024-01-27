import { Button, Card, Col, Flex, Input, Row, message } from "antd";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Upload } from "antd";
import {
  callDeleteImg,
  callDetailMedia,
  callUpdateMedia,
  callUpload_Single_Img,
  callUpload_Single_Img_baiviet,
} from "../../../service/api";
import ReactPlayer from "react-player";

import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";


const QuanliMedia = () => {
  // upload ảnh
  function uploadAdapter(loader) {
    return {
      upload: () => {
        return new Promise(async (resolve, reject) => {
          try {
            const file = await loader.file;
            const res = await callUpload_Single_Img_baiviet(file);
            resolve({
              default: `${process.env.REACT_APP_BACKEND_URL}/images/baiviet/${res.data.fileUploaded}`,
            });
          } catch (error) {
            reject("Upload ảnh thất bại");
          }
        });
      },
      abort: () => {},
    };
  }
  function uploadPlugin(editor) {
    editor.plugins.get("FileRepository").createUploadAdapter = (loader) => {
      return uploadAdapter(loader);
    };
  }

  ////////////////////
  const params = useParams();
  const [detailMedia, setDetailMedia] = useState();

  const [pathBannerBg, setPathBannerBg] = useState();
  const [pathBannerVideo, setPathBannerVideo] = useState();
  const [noidung, setNoidung] = useState("");
  const [link, setLink] = useState();

  const [fileList, setFileList] = useState([
    {
      uid: "-1",
      name: "ảnh",
      status: "done",
      url: `${process.env.REACT_APP_BACKEND_URL}/images/banner/${detailMedia?.banner_bg}`,
    },
  ]);
  const [fileList_2, setFileList_2] = useState([
    {
      uid: "-1",
      name: "ảnh",
      status: "done",
      url: `${process.env.REACT_APP_BACKEND_URL}/images/banner/${detailMedia?.video_bg}`,
    },
  ]);
  const fetchDetailMedia = async () => {
    const res = await callDetailMedia(params.id);
    if (res && res.EC === 1) {
      setDetailMedia(res.data);
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
    }
    // set data hiển thị khi call api thành công
    setPathBannerBg(res.data.banner_bg);
    setPathBannerVideo(res.data.video_bg);
    setLink(res.data.link);
    setNoidung(res.data.noidung);
  };

  useEffect(() => {
    fetchDetailMedia();
  }, [params.id]);

  const onChange = ({ fileList: newFileList }) => {
    setFileList(newFileList);
  };
  const onChange_2 = ({ fileList: newFileList_2 }) => {
    setFileList_2(newFileList_2);
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
  const handleCallUpdate = async () => {
    // nếu là trang chủ, ko có nội dung
    if (+params.id === 1) {
      if (!pathBannerBg || !pathBannerVideo || !link) {
        message.error("Hãy nhập đầy đủ thông tin");
        return;
      }
    } else {
      if (!pathBannerBg || !pathBannerVideo || !link || !noidung) {
        message.error("Hãy nhập đầy đủ thông tin");
        return;
      }
    }
    const data = {
      banner_bg: pathBannerBg,
      video_bg: pathBannerVideo,
      link: link,
      noidung: noidung,
    };

    const res = await callUpdateMedia(params.id, data);
    if (res && res.EC === 1) {
      message.success("Cập nhật thành công");
      fetchDetailMedia();
    } else {
      message.error("Cập nhật thất bại");
    }
  };

  return (
    <div>
      <Row gutter={16}>
        <Col span={8}>
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
        <Col span={8}>
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
        <Col span={8}>
          <Card title="Video youtube" bordered={true}>
            <Input
              className="mb-4"
              onChange={(e) => setLink(e.target.value)}
              placeholder="Nhập link youtube"
              value={link}
            ></Input>
            <ReactPlayer
              url={detailMedia?.link}
              width={"100%"}
              height={"auto"}
              controls={true}
            />
          </Card>
        </Col>
      </Row>
      {/* // react edit word */}
      {params.id != 1 && (
        <div>
          <CKEditor
            config={{
              // toolbar: [
              //   "undo",
              //   "redo",
              //   "bold",
              //   "italic",
              //   "blockQuote",
              //   "imageTextAlternative",
              //   "imageUpload",
              //   "heading",
              //   "imageStyle:side",
              //   "link",
              //   "numberedList",
              //   "bulletedList",

              // ],
              toolbar: {
                items: [
                  "undo",
                  "redo",
                  "|",
                  "heading",
                  "|",
                  "fontfamily",
                  "fontsize",
                  "fontColor",
                  "fontBackgroundColor",
                  "|",
                  "bold",
                  "italic",
                  "strikethrough",
                  "subscript",
                  "superscript",
                  "code",
                  "-", // break point
                  "|",
                  "alignment",
                  "link",
                  "uploadImage",
                  "blockQuote",
                  "codeBlock",
                  "|",
                  "bulletedList",
                  "numberedList",
                  "todoList",
                  "outdent",
                  "indent",
                  "|",
                  "TextColor",
                  "BGColor",
                ],
              },
             
              extraPlugins: [uploadPlugin],
            }}
            editor={ClassicEditor}
            //editor={editor}
            onReady={(editor) => {
              editor.editing.view.change((writer) => {
                writer.setStyle(
                  "height",
                  "500px",
                  editor.editing.view.document.getRoot()
                );
              });
            }}
            onBlur={(event, editor) => {}}
            onFocus={(event, editor) => {}}
            onChange={(e, editor) => {
              setNoidung(editor.getData());
            }}
            data={noidung}
          />
        </div>
      )}

      {/* /////////// */}

      <Flex justify="center">
        <Button type="primary" onClick={() => handleCallUpdate()}>
          Cập nhật
        </Button>
      </Flex>
    </div>
  );
};

export default QuanliMedia;
