import React, { useEffect, useRef, useState } from "react";
import { SearchOutlined } from "@ant-design/icons";
import {
  Button,
  Input,
  Popconfirm,
  Space,
  Table,
  message,
  notification,
} from "antd";
import Highlighter from "react-highlight-words";
import { callAllLienhe, callDeleteLienhe } from "../../../service/api";
import moment from "moment";
import { CSVLink } from "react-csv";
import { MdDelete } from "react-icons/md";

const title = "Xác nhận xóa ?";
const VideoNoiBat = () => {
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const searchInput = useRef(null);
  // set value
  const [listLienhe, setListLienhe] = useState([]);

  const fetchAllLienhe = async () => {
    let res = await callAllLienhe();
    if (res && res.EC === 1) {
      customLienhe(res.data);
    }
  };
  const customLienhe = (list) => {
    let arr = [];
    if (list && list.length > 0) {
      list.map((item, index) => {
        arr.push({
          id: item.id,
          key: index + 1,
          STT: index + 1,
          name: item.name,
          phone: item.phone,
          email: item.email,
          noidung: item.noidung,
          createdAt: moment(item?.createdAt).format("DD-MM-YY hh:mm:ss"),
          action: index,
        });
      });
    }
    setListLienhe(arr);
  };

  useEffect(() => {
    fetchAllLienhe();
  }, []);

  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };
  const handleReset = (clearFilters) => {
    clearFilters();
    setSearchText("");
  };

  const confirm = async (id) => {
    console.log("tttttttt", id);
    let res = await callDeleteLienhe(id);
    if (res && res.EC === 1) {
      message.success("Xóa thành công ");
      fetchAllLienhe();
    } else {
      notification.error({
        description: "Xóa thất bại",
      });
    }
  };
  const getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
      close,
    }) => (
      <div
        style={{
          padding: 8,
        }}
        onKeyDown={(e) => e.stopPropagation()}
      >
        <Input
          ref={searchInput}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{
            marginBottom: 8,
            display: "block",
          }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{
              width: 90,
            }}
          >
            Search
          </Button>
          <Button
            onClick={() => clearFilters && handleReset(clearFilters)}
            size="small"
            style={{
              width: 90,
            }}
          >
            Reset
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              confirm({
                closeDropdown: false,
              });
              setSearchText(selectedKeys[0]);
              setSearchedColumn(dataIndex);
            }}
          >
            Filter
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              close();
            }}
          >
            close
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered) => (
      <SearchOutlined
        style={{
          color: filtered ? "#1677ff" : undefined,
        }}
      />
    ),
    onFilter: (value, record) =>
      record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
    onFilterDropdownOpenChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.current?.select(), 100);
      }
    },
    render: (text) =>
      searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{
            backgroundColor: "#ffc069",
            padding: 0,
          }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ""}
        />
      ) : (
        text
      ),
  });
  const columns = [
    {
      title: "STT",
      dataIndex: "STT",
      key: "STT",

      ...getColumnSearchProps("STT"),
    },
    {
      title: "Họ tên",
      dataIndex: "name",
      key: "name",

      ...getColumnSearchProps("name"),
    },
    {
      title: "Số điện thoại",
      dataIndex: "phone",
      key: "phone",

      ...getColumnSearchProps("phone"),
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      ...getColumnSearchProps("email"),
    },
    {
      title: "Nội dung",
      dataIndex: "noidung",
      key: "noidung",
      ...getColumnSearchProps("noidung"),
    },
    {
      title: "Ngày liên hệ",
      dataIndex: "createdAt",
      key: "createdAt",
      sorter: {
        compare: (a, b) =>
          moment(a.createdAt, "DD-MM-YYYY") - moment(b.createdAt, "DD-MM-YYYY"),
      },
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
          </div>
        );
      },
    },
  ];
  return (
    <>
      <CSVLink data={listLienhe}>
        <Button type="primary" className="mb-3">
          Excel
        </Button>
      </CSVLink>
      <Table
        columns={columns}
        dataSource={listLienhe}
        pagination={{
          showSizeChanger: true,
          position: ["bottomCenter"],
          pageSizeOptions: [2, 10, 50, 100],
        }}
      />
    </>
  );
};
export default VideoNoiBat;
