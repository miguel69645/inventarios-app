import { createBrowserRouter } from "react-router-dom";
import Home from "../security/home/pages/Home";
import Business from "../security/business//pages/Business"
import Error from "../share/errors/pages/Error";
import Store from "../security/stores/pages/Store";
import Institutes from "../security/institutes/pages/Institutes"
import Movements from "../security/movements/pages/Movements"
import Series from "../security/series/pages/Series"
import Status from "../security/status/pages/status"
import Location from "../security/location/pages/Location"


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
      {
        path: "/Store",
        element: <Store />,
      },
      {
        path: "/movements",
        element: <Movements />,
      },
      {
        path: "/series",
        element: <Series />,
      },
      {
        path: "/status",
        element: <Status />,
      },
      {
        path: "/location",
        element: <Location />,
      },
    ],
  },
]);
export default router;
