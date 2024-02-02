import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Home from "./page/Home.js/Home";
import Layout from "./component/layout/Layout";
import Login from "./component/admin/login/login";
import LayoutAdmin from "./component/layout/LayoutAdmin";

import QuanliLienhe from "./component/admin/quan ly lien he/QuanliLienhe";
import QuanliMenu from "./component/admin/quan ly menu/QuanliMenu";
import QuanliMedia from "./component/admin/quan ly media/QuanliMedia";

import QuanlyBaiviet from "./component/admin/quan ly bai viet/QuanlyBaiviet";
import ChangePass from "./component/admin/change pass/ChangePass";
import DichVuMedia from "./component/media/DichVuMedia";
import Baiviet from "./page/bai viet/Baiviet";
import LienHe from "./page/lien he/LienHe";
import VideoNoiBat from "./component/admin/quan ly video noi bat/VideoNoiBat";
import BaivietDetail from "./page/bai viet/BaivietDetail";
import QuanlyTrangchu from "./component/admin/quan ly trang chu/QuanlyTrangchu";
import { useEffect, useState } from "react";
import { callDetailTrangchu } from "./service/api";

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

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        { index: true, element: <Home /> },
        {
          path: "/lien-he",
          element: <LienHe />,
        },
        {
          path: "/bai-viet/:slug",
          element: <BaivietDetail />,
        },
        {
          path: "/bai-viet",
          element: <Baiviet />,
        },
        {
          path: "/*",
          element: <DichVuMedia />,
        },
      ],
    },

    {
      path: "/admin",
      element: <LayoutAdmin />,

      children: [
        { index: true, element: <QuanliLienhe /> },
        {
          path: "lienhe",
          element: <QuanliLienhe />,
        },
        {
          path: "trangchu",
          element: <QuanlyTrangchu />,
        },
        {
          path: "menu/:id",
          element: <QuanliMenu />,
        },
        {
          path: "media/:id",
          element: <QuanliMedia />,
        },
        {
          path: "video/:id",
          element: <VideoNoiBat />,
        },
        {
          path: "baiviet",
          element: <QuanlyBaiviet />,
        },
      ],
    },
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/doimatkhau",
      element: <ChangePass />,
    },
  ]);

  return <RouterProvider router={router} />;
};

export default App;
