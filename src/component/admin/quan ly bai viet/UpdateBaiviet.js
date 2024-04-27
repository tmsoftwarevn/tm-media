import {
  Card,
  Checkbox,
  Col,
  Input,
  InputNumber,
  Modal,
  Row,
  message,
} from "antd";
import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { Upload } from "antd";
import {
  callUpdateBaiviet,
  callDeleteImg,
  callUpload_Single_Img,
  callUpload_Single_Img_baiviet,
} from "../../../service/api";

import { Editor } from "@tinymce/tinymce-react";
import TextArea from "antd/es/input/TextArea";
import { convertSlug } from "../../../utils/convertSlug";

const UpdateBaiviet = (props) => {
  const refEditor = useRef(null);

  const {
    isModalUpdateBaiviet,
    setIsModalUpdateBaiviet,
    fetchBaiviet_All,
    dataUpdate,
  } = props;
  //////////////////

  const filePickerCallback = function (cb, value, meta) {
    const input = document.createElement("input");
    input.setAttribute("type", "file");
    input.setAttribute("accept", "image/*");

    input.onchange = async function () {
      const file = input.files[0];

      const res = await callUpload_Single_Img_baiviet(file);
      if (res && res.EC === 1) {
        cb(
          `${process.env.REACT_APP_BACKEND_URL}/images/baiviet/${res.data.fileUploaded}`,
          { alt: file.name }
        );
      }
    };

    input.click();
  };
  ////////////////////
  const params = useParams();

  const [key_word, setKey_word] = useState("");
  const [meta_des, setMeta_des] = useState("");
  let [noidung, setNoidung] = useState("");
  const [tieude, setTieude] = useState("");
  const [mota_ngan, setMota_ngan] = useState("");
  const [thumbnail, setThumbnail] = useState("");
  const [active, setActive] = useState(false);
  const [uu_tien, setuu_tien] = useState(0);

  const [fileList, setFileList] = useState([
    {
      uid: "-1",
      name: "ảnh",
      status: "done",
      url: `${process.env.REACT_APP_BACKEND_URL}/images/banner/${dataUpdate?.thumbnail}`,
    },
  ]);

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
  const handleUploadFile_thumbnail = async ({ file, onSuccess, onError }) => {
    const res = await callUpload_Single_Img(file);
    if (res && res.data) {
      if (thumbnail) {
        let remove = await callDeleteImg(thumbnail);
      }

      setThumbnail(res.data.fileUploaded);
      onSuccess("ok");
    } else {
      onError("Đã có lỗi khi upload");
    }
  };

  const handleCallUpdate = async () => {
    if (!key_word || !meta_des || !mota_ngan || !thumbnail || !tieude) {
      message.error("Vui lòng nhập đầy đủ thông tin");
      return;
    }
    let slug = convertSlug(tieude);
    if (refEditor?.current?.getContent()) {
      noidung = refEditor?.current?.getContent();
    }

    const res = await callUpdateBaiviet(
      dataUpdate?.id,
      tieude,
      key_word,
      meta_des,
      noidung,
      thumbnail,
      mota_ngan,
      active,
      slug,
      uu_tien
    );
    if (res && res.EC === 1) {
      message.success("Cập nhật thành công");
      handleCancel();
      fetchBaiviet_All();
    } else {
      message.success("Cập nhật thất bại");
      handleCancel();
    }
  };
  const handleCancel = () => {
    setIsModalUpdateBaiviet(false);
  };
  useEffect(() => {
    setKey_word(dataUpdate?.key_word);
    setMeta_des(dataUpdate?.meta_des);
    setMota_ngan(dataUpdate?.mota_ngan);
    setNoidung(dataUpdate?.noidung);
    setThumbnail(dataUpdate?.thumbnail);
    setTieude(dataUpdate?.tieude);
    setActive(dataUpdate?.active);
    setuu_tien(dataUpdate?.uu_tien);
    setFileList([
      {
        uid: "-1",
        name: "ảnh",
        status: "done",
        url: `${process.env.REACT_APP_BACKEND_URL}/images/banner/${dataUpdate?.thumbnail}`,
      },
    ]);
  }, [dataUpdate]);

  const onChangeActive = (e) => {
    if (e.target.checked) setActive(1);
    else setActive(0);
  };
  const onChangeInputNumber = (value) => {
    setuu_tien(value);
  };
  return (
    <>
      <Modal
        title="Cập nhật bài viết"
        open={isModalUpdateBaiviet}
        onOk={() => {
          handleCallUpdate();
        }}
        okText="Cập nhật"
        onCancel={handleCancel}
        maskClosable={false}
        forceRender
        width={1200}
      >
        <div>
          <Row gutter={16}>
            <Col span={12}>
              <Card title="Tên bài viết" bordered={true}>
                <Input
                  onChange={(e) => setTieude(e.target.value)}
                  placeholder="Nhập tên bài viết"
                  value={tieude}
                ></Input>
              </Card>
            </Col>
            <Col span={12}>
              <Card title="Ảnh bài viết" bordered={true}>
                <Upload
                  listType="picture-card"
                  fileList={fileList}
                  customRequest={handleUploadFile_thumbnail}
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
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Card title="Key word">
                <TextArea
                  rows={3}
                  onChange={(e) => setKey_word(e.target.value)}
                  maxLength={500}
                  value={key_word}
                />
              </Card>
            </Col>
            <Col span={12}>
              <Card title="Description">
                <TextArea
                  rows={3}
                  onChange={(e) => setMeta_des(e.target.value)}
                  maxLength={500}
                  value={meta_des}
                />
              </Card>
            </Col>
            <Col span={12}>
              <Card title="Mô tả ngắn">
                <TextArea
                  rows={3}
                  onChange={(e) => setMota_ngan(e.target.value)}
                  maxLength={500}
                  value={mota_ngan}
                />
              </Card>
            </Col>
            <Col span={6}>
              <Card title="Trạng thái ở trang chủ">
                <Checkbox
                  checked={+active === 1 ? true : false}
                  onChange={onChangeActive}
                >
                  Hiện
                </Checkbox>
              </Card>
            </Col>
            <Col span={6}>
              <Card title="Ưu tiên">
                <InputNumber
                  min={0}
                  max={100}
                  value={uu_tien}
                  onChange={onChangeInputNumber}
                />
              </Card>
            </Col>
          </Row>
          {/* // react edit word */}

          {params.id !== 1 && (
            <>
              <h4 className="mb-4">Nội dung:</h4>
              <Editor
                onChange={(evt, editor) => (refEditor.current = editor)}
                apiKey={process.env.REACT_APP_API_KEY_EDITOR}
                //onChange={(evt, editor) => setNoidung(editor.getContent())}
                initialValue={noidung}
                init={{
                  height: 500,
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
                    "alignright alignjustify | bullist numlist outdent indent | " +
                    "removeformat | help | image media",

                  content_style:
                    "body { font-family: Helvetica, Arial, sans-serif; font-size: 14px }",
                  fontsize_formats: "8px 10px 12px 14px 18px 24px 36px",
                  file_picker_types: "image",
                  file_picker_callback: filePickerCallback,
                }}
              />
            </>
          )}

          {/* /////////// */}
        </div>
      </Modal>
    </>
  );
};

export default UpdateBaiviet;
