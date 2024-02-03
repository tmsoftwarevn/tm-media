import React, { useEffect, useRef, useState } from "react";

import {
  Button,
  Flex,
  Image,
  Input,
  Popconfirm,
  Space,
  Table,
  message,
  notification,
} from "antd";

import {
  callDeleteViddeo,
  callGetVideoNoibat_byid,
} from "../../../service/api";
import { MdDelete } from "react-icons/md";
import { useParams } from "react-router-dom";
import { CiEdit } from "react-icons/ci";
import UpdateVideo from "./ModalUpdateVideo";
import ReactPlayer from "react-player";
import AddVideo from "./ModalAddVideo";
import { FileAddOutlined } from "@ant-design/icons";

const title = "Xác nhận xóa ?";
const VideoNoiBat = () => {
  const params = useParams();
  const [listVideo, setListVideo] = useState([]);

  const [isModalAddVideo, setIsModalAddVideo] = useState(false);
  const [dataUpdate, setDataUpdate] = useState();
  const [isModalUpdateVideo, setIsModalUpdateVideo] = useState(false);

  const fetchAllVideo = async () => {
    let res = await callGetVideoNoibat_byid(params.id);
    if (res && res.EC === 1) {
      customVideo(res.data);
    }
  };
  const customVideo = (list) => {
    let arr = [];
    if (list && list.length > 0) {
      list.map((item, index) => {
        arr.push({
          id: item.id,
          key: index + 1,
          STT: index + 1,
          name: item.name,
          video_bg: item.video_bg,
          link: item.link,
          action: index,
        });
      });
    }
    setListVideo(arr);
  };
  //console.log('lllll', listVideo);
  useEffect(() => {
    fetchAllVideo();
  }, [params.id]);

  const confirm = async (id) => {
    let res = await callDeleteViddeo(id);
    if (res && res.EC === 1) {
      message.success("Xóa thành công ");
      fetchAllVideo();
    } else {
      notification.error({
        description: "Xóa thất bại",
      });
    }
  };
  const handleUpdateVideo = (record) => {
    setIsModalUpdateVideo(true);
    setDataUpdate(record);
  };
  const columns = [
    {
      title: "STT",
      dataIndex: "STT",
      key: "STT",
      align: "center",
    },
    {
      title: "Tên video",
      dataIndex: "name",
      key: "name",
      align: "center",
    },
    {
      title: "Ảnh nền video",
      dataIndex: "video_bg",
      key: "video_bg",
      align: "center",
      render: (text, record, index) => {
        return (
          <div style={{margin:"auto"}}>
            <Image
              width={200}
              src={`${process.env.REACT_APP_BACKEND_URL}/images/banner/${record?.video_bg}`}
            />
          </div>
        );
      },
    },
    {
      title: "Video",
      dataIndex: "link",
      key: "link",
      align: "center",
      render: (text, record, index) => {
        return (
          <div>
            <ReactPlayer
              url={record?.link}
              width={"auto"}
              height={200}
              controls={true}
            />
          </div>
        );
      },
    },

    {
      title: "Thao tác",
      dataIndex: "action",
      key: "action",
      align: "center",
      render: (text, record, index) => {
        return (
          <div
            style={{
              cursor: "pointer",
              display: "flex",
              justifyContent: "center",
              fontSize: "18px",
              gap: 20,
            }}
          >
            <div
              style={{
                whiteSpace: "nowrap",
              }}
            >
              <Popconfirm
                placement="left"
                title={title}
                onConfirm={() => {
                  confirm(record?.id);
                }}
                okText="Yes"
                cancelText="No"
              >
                <Button
                  size="small"
                  type="primary"
                  danger
                  style={{ display: "flex", alignItems: "center" }}
                >
                  <MdDelete />
                </Button>
              </Popconfirm>
            </div>
            <div>
              <Button
                size="small"
                type="primary"
                style={{ display: "flex", alignItems: "center" }}
              >
                <CiEdit
                  style={{ fontSize: "15px" }}
                  onClick={() => {
                    handleUpdateVideo(record);
                  }}
                />
              </Button>
            </div>
          </div>
        );
      },
    },
  ];

  return (
    <>
      <Flex justify="flex-end">
        <Button
          type="primary"
          className="mb-3"
          onClick={() => setIsModalAddVideo(true)}
        >
          Thêm mới
        </Button>
      </Flex>
      <Table
        columns={columns}
        dataSource={listVideo}
        pagination={{
          showSizeChanger: true,
          position: ["bottomCenter"],
          pageSizeOptions: [2, 10, 50, 100],
        }}
      />
      <UpdateVideo
        isModalUpdateVideo={isModalUpdateVideo}
        setIsModalUpdateVideo={setIsModalUpdateVideo}
        fetchAllVideo={fetchAllVideo}
        dataUpdate={dataUpdate}
      />
      <AddVideo
        isModalAddVideo={isModalAddVideo}
        setIsModalAddVideo={setIsModalAddVideo}
        fetchAllVideo={fetchAllVideo}
      />
    </>
  );
};
export default VideoNoiBat;
