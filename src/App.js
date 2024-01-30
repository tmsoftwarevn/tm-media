import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Home from "./page/Home.js/Home";
import Layout from "./component/layout/Layout";
import Login from "./component/admin/login/login";
import LayoutAdmin from "./component/layout/LayoutAdmin";

import QuanliLienhe from "./component/admin/quan ly lien he/QuanliLienhe";
import QuanliMenu from "./component/admin/quan ly menu/QuanliMenu";
import QuanliMedia from "./component/admin/quan ly media/QuanliMedia";
import Video_Noibat from "./component/admin/quan ly video noi bat/VideoNoiBat";
import QuanlyBaiviet from "./component/admin/quan ly bai viet/QuanlyBaiviet";
import ChangePass from "./component/admin/change pass/ChangePass";
import DichVuMedia from "./component/media/DichVuMedia";

const App = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        { index: true, element: <Home /> },
        {
          path: "/media/:name",
          element: <DichVuMedia />
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
          path: "menu/:id",
          element: <QuanliMenu />,
        },
        {
          path: "media/:id",
          element: <QuanliMedia />,
        },
        {
          path: "video/:id",
          element: <Video_Noibat />,
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
      path:"/doimatkhau",
      element: <ChangePass />
    }
  ]);
  return <RouterProvider router={router} />;
};

export default App;
