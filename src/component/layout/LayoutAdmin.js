import React, { useEffect, useState } from "react";
import "../../scss/layoutAdmin.scss";


import {
  DesktopOutlined,
  FileOutlined,
  PieChartOutlined,
  TeamOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Breadcrumb, Button, Layout, Menu, theme } from "antd";
import { Link, Outlet } from "react-router-dom";
import { callMenu_byid } from "../../service/api";
const { Header, Content, Footer, Sider } = Layout;
function getItem(label, key, icon, children) {
  return {
    key,
    icon,
    children,
    label,
  };
}

const App = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [listMenu_1, setListMenu_1] = useState([]);
  const [listMenu_2, setListMenu_2] = useState([]);
  const [listMenu_3, setListMenu_3] = useState([]);

  const fetchMenu_byId = async () => {
    let res_1 = await callMenu_byid(1);
    if (res_1 && res_1.EC === 1) {
      setListMenu_1(res_1.data);
    }
    let res_2 = await callMenu_byid(2);
    if (res_2 && res_2.EC === 1) {
      setListMenu_2(res_2.data);
    }
    let res_3 = await callMenu_byid(3);
    if (res_3 && res_3.EC === 1) {
      setListMenu_3(res_3.data);
    }
  };
  useEffect(() => {
    fetchMenu_byId();
  }, []);

  // custom antd render list
  const renderItems = (list) => {
    let arr = [];
   
    list.map((item, index) => {
      arr.push(
        getItem(
          <Link to={`/admin/media/${item.id}`}>{item.name}</Link>,
          item.id
        )
      );
    });
    return arr;
  };
  const items = [
    getItem(
      <Link to="/admin/lienhe">Quản lý liên hệ</Link>,
      "/admin/lienhe",
      <PieChartOutlined />
    ),
    getItem(
      <Link to="/admin/baiviet">Quản lý bài viết</Link>,
      "/admin/baiviet",
      <PieChartOutlined />
    ),

    getItem("Quản lý menu", "sub1", <UserOutlined />, [
      getItem(<Link to="/admin/menu/1">Dịch vụ quay phim</Link>, "1"),
      getItem(<Link to="/admin/menu/2">Dịch vụ chụp ảnh</Link>, "2"),
      getItem(<Link to="/admin/menu/3">Dịch vụ Xây kênh</Link>, "3"),
    ]),
    getItem(
      <Link to="/admin/media/1">Baner trang chủ</Link>,
      "/admin/trangchu",
      <PieChartOutlined />
    ),
    getItem(
      "Dịch vụ quay phim",
      "sub2",
      <UserOutlined />,
     
      renderItems(listMenu_1)
    ),
    getItem(
      "Dịch vụ chụp hình",
      "sub3",
      <UserOutlined />,
      renderItems(listMenu_2)
    ),
    getItem(
      "Dịch vụ xây kênh",
      "sub4",
      <UserOutlined />,
      renderItems(listMenu_3)
    ),
  ];

  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  return (
    <Layout
      style={{
        minHeight: "100vh",
      }}
    >
      <Sider
        collapsible
        collapsed={collapsed}
        onCollapse={(value) => setCollapsed(value)}
        width={"240px"}
        theme="light"
      >
        <div className="demo-logo-vertical" />

        <div
          style={{
            color: "#2980b9",
            textAlign: "center",
            fontFamily: "roboto",
            fontSize: "18px",
            margin: "20px",
          }}
        >
          ADMIN TM MEDIA
        </div>

        <Menu
          theme="light"
          defaultSelectedKeys={["1"]}
          mode="inline"
          items={items}
        />
      </Sider>

      <Layout>
        <Header
          style={{
            padding: 0,
            background: colorBgContainer,
          }}
        >
          <Button type="primary" className="ms-3">
            Đổi mật khẩu
          </Button>
        </Header>

        <Content
          style={{
            margin: "0 16px",
          }}
        >
          <Breadcrumb
            style={{
              margin: "16px 0",
            }}
          ></Breadcrumb>
          <div
            style={{
              padding: 24,
              minHeight: 360,
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
            }}
          >
            <Outlet />
          </div>
        </Content>
        <Footer
          style={{
            textAlign: "center",
          }}
        >
          Ant Design © Created by TM Software
        </Footer>
      </Layout>
    </Layout>
  );
};
export default App;
