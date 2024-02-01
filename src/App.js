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

const App = () => {
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
