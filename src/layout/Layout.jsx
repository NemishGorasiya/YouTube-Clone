import { Outlet } from "react-router-dom";

import AppBar from "../components/appBar/AppBar";
import NoInternetPage from "../pages/noInternetPage/NoInternetPage";
import {
	DrawerHeader,
	LayoutComponent,
	OutletWrapper,
	RightPanel,
} from "./LayoutStyledComponent";

const Layout = () => {
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
