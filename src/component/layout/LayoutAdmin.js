import React, { useEffect, useState } from "react";
import "../../scss/layoutAdmin.scss";

import {
  ContactsOutlined,
  EditOutlined,
  HomeOutlined,
  MenuFoldOutlined,
  VideoCameraAddOutlined,
  YoutubeOutlined,
} from "@ant-design/icons";
import { Breadcrumb, Button, Layout, Menu, theme } from "antd";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { callDetailTrangchu, callMenu_byid } from "../../service/api";
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
  const [mediaHome, setMediaHome] = useState("");
  const fetch_mediaHome = async () => {
    const res = await callDetailTrangchu();
    if (res && res.EC === 1) {
      setMediaHome(res.data);
    }
  };
  useEffect(() => {
    fetch_mediaHome();
  }, []);
  useEffect(() => {
    let link = document.querySelector("link[rel~='icon']");
    if (!link) {
      link = document.createElement("link");
      link.rel = "icon";
      document.getElementsByTagName("head")[0].appendChild(link);
    }
    const logoImage = new Image();
    logoImage.src = `${process.env.REACT_APP_BACKEND_URL}/images/banner/${mediaHome.icon_web}`;

    logoImage.onload = () => {
      link.href = logoImage.src;
    };

    logoImage.onerror = () => {
      console.error("Error loading logo image");
    };
    return () => {
      logoImage.onload = null;
      logoImage.onerror = null;
    };
  }, [mediaHome?.icon_web]);
  ////icon
  const navigate = useNavigate();
  const [collapsed, setCollapsed] = useState(false);
  const [listMenu_1, setListMenu_1] = useState([]);
  const [listMenu_2, setListMenu_2] = useState([]);
  const [listMenu_3, setListMenu_3] = useState([]);

  const [pathActive, setPathActive] = useState("/admin/lienhe");
  useEffect(() => {
    if (!sessionStorage.getItem("Tm media")) {
      navigate("/login");
    }
  }, []);
  const fetchMenu_byId_layout = async () => {
    // get all name menu theo 1,2,3
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
    fetchMenu_byId_layout();
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
  useEffect(() => {
    const currentPathname = window.location.pathname;
    const pathArray = currentPathname.split('/');
    const pathString = pathArray.slice(1, 3).join('/');
    setPathActive(`/${pathString}`);
  }, [window.location.pathname]); 

  const renderItems_video = (list) => {
    let arr = [];
    list.map((item, index) => {
      arr.push(
        getItem(
          <Link to={`/admin/video/${item.id}`}>{item.name}</Link>,
          `${item.id}-${index}`
        )
      );
    });
    
    return arr;
  };
  const items = [
    getItem(
      <Link to="/admin/lienhe">Quản lý liên hệ</Link>,
      "/admin/lienhe",
      <ContactsOutlined />
    ),
    getItem(
      <Link to="/admin/baiviet">Quản lý bài viết</Link>,
      "/admin/baiviet",
      <EditOutlined />
    ),

    getItem("Quản lý menu", "sub1", <MenuFoldOutlined />, [
      getItem(<Link to="/admin/menu/1">Sản xuất video</Link>, "menu1"),
      getItem(<Link to="/admin/menu/2">Chụp ảnh quảng cáo</Link>, "menu2"),
      getItem(<Link to="/admin/menu/3">Dịch vụ Xây kênh</Link>, "menu3"),
    ]),
    getItem(
      <Link to="/admin/trangchu">Quản lý trang chủ</Link>,
      "/admin/trangchu",
      <HomeOutlined />
    ),


    getItem(
      "Sản xuất video",
      "sub2",
      <VideoCameraAddOutlined />,
      renderItems(listMenu_1)
    ),
    getItem(
      "Chụp ảnh quảng cáo",
      "sub3",
      <VideoCameraAddOutlined />,
      renderItems(listMenu_2)
    ),
    getItem(
      "Dịch vụ xây kênh",
      "sub4",
      <VideoCameraAddOutlined />,
      renderItems(listMenu_3)
    ),
    // list video theo menu
    getItem(
      "Video quay phim",
      "sub5",
      <YoutubeOutlined />,
      renderItems_video(listMenu_1)
    ),
    getItem(
      "Video chụp ảnh",
      "sub6",
      <YoutubeOutlined />,
      renderItems_video(listMenu_2)
    ),
    getItem(
      "Video xây kênh",
      "sub7",
      <YoutubeOutlined />,
      renderItems_video(listMenu_3)
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
          //defaultSelectedKeys={["/admin/lienhe"]}
          activeKey={pathActive}

          mode="inline"
          items={items}
          onClick={(e) => setPathActive(e.key)}
        />
      </Sider>

      <Layout>
        <Header
          style={{
            padding: 0,
            background: colorBgContainer,
          }}
        >
          <Button
            type="primary"
            className="ms-3"
            onClick={() => navigate("/doimatkhau")}
          >
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
            <Outlet context={[collapsed, fetchMenu_byId_layout]} />
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
