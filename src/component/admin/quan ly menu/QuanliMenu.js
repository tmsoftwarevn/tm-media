import React, { useEffect, useRef, useState } from "react";

import { useParams } from "react-router-dom";
import { callDeleteMenu_byId, callMenu_byid } from "../../../service/api";
import { CiEdit } from "react-icons/ci";
import { Button, Flex, Popconfirm, Table, message, notification } from "antd";
import { MdDelete } from "react-icons/md";
import UpdateMenu from "./ModalUpdateMenu";
import AddMenu from "./ModalAddMenu";

const title = "Xác nhận xóa ?";
const QuanliMenu = () => {
  const params = useParams();
  const [listMenu, setListMenu] = useState([]);

  const [isModalAddMenu, setIsModalAddMenu] = useState(false);
  const [dataUpdate, setDataUpdate] = useState("");
  const [isModalUpdateMenu, setIsModalUpdateMenu] = useState(false);

  useEffect(() => {
    fetchMenu_byId();
  }, [params.id]);

  const fetchMenu_byId = async () => {
    let res = await callMenu_byid(params.id);
    if (res && res.EC === 1) {
      customMenu(res.data);
    }
  };
  const confirm = async (id) => {
    let res = await callDeleteMenu_byId(id);
    if (res && res.EC === 1) {
      message.success("Xóa thành công ");
      fetchMenu_byId();
    } else {
      notification.error({
        description: "Có lỗi xảy ra",
      });
    }
  };
  const customMenu = (list) => {
    let arr = [];
    list.map((item, index) => {
      arr.push({
        key: index + 1,
        STT: index + 1,
        id: item.id,
        name: item.name,
        action: index,
      });
    });
    setListMenu(arr);
  };
  const handleUpdateMenu = (record) => {
    setIsModalUpdateMenu(true);
    setDataUpdate(record);
  };
  const columns = [
    {
      title: "STT",
      dataIndex: "STT",
      key: "STT",
    },
    {
      title: "Tên",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Thao tác",
      dataIndex: "action",
      key: "action",
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
                    handleUpdateMenu(record);
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
          onClick={() => setIsModalAddMenu(true)}
        >
          Thêm mới
        </Button>
      </Flex>

      <Table
        columns={columns}
        dataSource={listMenu}
        pagination={{
          showSizeChanger: true,
          position: ["bottomCenter"],
          pageSizeOptions: [2, 10, 50, 100],
        }}
      />
      <UpdateMenu
        isModalUpdateMenu={isModalUpdateMenu}
        setIsModalUpdateMenu={setIsModalUpdateMenu}
        dataUpdate={dataUpdate}
        fetchMenu_byId={fetchMenu_byId}
      />
      <AddMenu
        isModalAddMenu={isModalAddMenu}
        setIsModalAddMenu={setIsModalAddMenu}
        fetchMenu_byId = {fetchMenu_byId}
      />
    </>
  );
};
export default QuanliMenu;
