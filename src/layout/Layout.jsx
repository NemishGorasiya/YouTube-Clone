import { Outlet, useLocation } from "react-router-dom";
import { useEffect } from "react";

import AppBar from "../components/appBar/AppBar";
import NoInternetPage from "../pages/noInternetPage/NoInternetPage";
import {
  DrawerHeader,
  LayoutComponent,
  OutletWrapper,
  RightPanel,
} from "./LayoutStyledComponent";

const Layout = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <LayoutComponent>
      <AppBar />
      <RightPanel component="main">
        <DrawerHeader />
        <OutletWrapper>
          <NoInternetPage>
            <Outlet />
          </NoInternetPage>
        </OutletWrapper>
      </RightPanel>
    </LayoutComponent>
  );
};

export default Layout;
