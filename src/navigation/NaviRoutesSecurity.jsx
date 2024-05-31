import { createBrowserRouter } from "react-router-dom";
import Home from "../security/home/pages/Home";
import Business from "../security/business/pages/Business"
import Institutes from "../security/institutes/pages/Institutes"
import Error from "../share/errors/pages/Error";


const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    errorElement: <Error />,
    children: [
      {
        path: "/institutes",
        element: <Institutes />,
      },
      // {
      //   path: "/business",
      //   element: <Business />,
      // },
    ],
  },
]);
export default router;
