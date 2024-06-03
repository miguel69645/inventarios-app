import { Outlet } from "react-router-dom";
//+
import AppBar from "../../../share/bars/components/SecurityAppBar";
import Institutes from "../../institutes/pages/Institutes";
export default function Home() {
  return (
    <div id="div-home">
      {/* <h2>Home Page - Security Project</h2> */}
      <div id="div-appbar">
        <AppBar />
        <Institutes />
      </div>
      <div id="detail">
        <Outlet />
      </div>
    </div>
  );
}
