import { Outlet } from "react-router-dom";
import SideBar from "../components/sideBar/SideBar";
import TopBar from "../components/topBar/TopBar";

const Layout = () => {
  return (
    <div>
      <TopBar />
      <SideBar />
      <Outlet />
    </div>
  );
};

export default Layout;
