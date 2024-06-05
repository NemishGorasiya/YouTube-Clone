import { Outlet, useLocation } from "react-router-dom";
import { useEffect } from "react";
import NProgress from "nprogress";

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
  NProgress.configure({ showSpinner: false, easing: "ease", speed: 1000 });

  useEffect(() => {
    NProgress.done();
    window.scrollTo(0, 0);
    return () => {
      NProgress.start();
    };
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
