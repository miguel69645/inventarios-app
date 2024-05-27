import { createBrowserRouter } from "react-router-dom";
import Home from "../security/home/pages/Home";
import Business from "../security/business//pages/Business"
import Error from "../share/errors/pages/Error";
import Institutes from "../security/institutes/pages/Institutes"


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
      {
        path: "/business",
        element: <Business />,
      },
    ],
  },
]);
export default router;
