import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Home from "./page/Home.js/Home";
import Layout from "./component/layout/Layout";
import Login from "./component/admin/login/login";
import LayoutAdmin from "./component/layout/LayoutAdmin";

import QuanliLienhe from "./component/admin/quan ly lien he/QuanliLienhe";
import QuanliMenu from "./component/admin/quan ly menu/QuanliMenu";
import QuanliMedia from "./component/admin/quan ly media/QuanliMedia";
import Video_Noibat from "./component/admin/quan ly video noi bat/VideoNoiBat";


const App =()=> {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        { index: true, element: <Home /> },
        {
          path: "/",
          
        },
          
      ],
    },
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/admin",
      element: <LayoutAdmin />,
      children: [
        {
          path: "lienhe",
          element: <QuanliLienhe />
        },
        {
          path: "menu/:id",
          element: <QuanliMenu />
        },
        {
          path: "media/:id",
          element: <QuanliMedia />
        },
        // {
        //   path: "video/:id",
        //   element: <Video_Noibat />
        // },
      ],
    }
  ]);
  return <RouterProvider router={router} />;
}

export default App;
