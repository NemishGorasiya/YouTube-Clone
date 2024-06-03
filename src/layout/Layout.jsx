import { Outlet } from "react-router-dom";

import AppBar from "../components/appBar/AppBar";
import NoInternetPage from "../pages/noInternetPage/NoInternetPage";
import {
  DrawerHeader,
  LayoutComponent,
  RightPanel,
} from "./LayoutStyledComponent";

const Layout = () => {
  return (
    <LayoutComponent>
      <AppBar />
      <RightPanel component="main">
        <DrawerHeader />
        <NoInternetPage>
          <Outlet />
        </NoInternetPage>
      </RightPanel>
    </LayoutComponent>
  );
};

export default Layout;
