import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Home from "./page/Home.js/Home";
import Layout from "./component/layout/Layout";


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
  ]);
  return <RouterProvider router={router} />;
}

export default App;
