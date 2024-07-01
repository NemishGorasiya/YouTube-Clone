import { Suspense, useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import NProgress from "nprogress";
import { nprogressConfig } from "../utils/constant";
import AppBar from "../components/appBar/AppBar";
import NoInternetPage from "../pages/noInternetPage/NoInternetPage";
import {
	DrawerHeader,
	LayoutComponent,
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
				<NoInternetPage>
					<Suspense fallback={<h1>Loading...</h1>}>
						<Outlet />
					</Suspense>
				</NoInternetPage>
			</RightPanel>
		</LayoutComponent>
	);
};

export default Layout;
