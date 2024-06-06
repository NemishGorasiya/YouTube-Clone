import { useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import NProgress from "nprogress";
import { nprogressConfig } from "../utils/constant";
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
    NProgress.configure(nprogressConfig);
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
