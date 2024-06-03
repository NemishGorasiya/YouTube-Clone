import { Outlet } from "react-router-dom";

import Box from "@mui/material/Box";
import MuiBox from "@mui/material/Box";

import { styled } from "@mui/material/styles";
import AppBar from "../components/appBar/AppBar";
import NoInternetPage from "../pages/noInternetPage/NoInternetPage";

const Layout = () => {
	const RightPanel = styled(MuiBox)(({ theme }) => ({
		flexGrow: 1,
		padding: "0 26px",
		minWidth: 0,
		background: theme.palette.background.default,
		[theme.breakpoints.down("sm")]: {
			padding: "0 16px",
		},
	}));

	const DrawerHeader = styled("div")(({ theme }) => ({
		...theme.mixins.toolbar,
		height: "56px",
		"@media (min-width: 600px)": {
			minHeight: "56px",
		},
	}));

	return (
		<Box sx={{ display: "flex" }}>
			<AppBar />
			<RightPanel component="main">
				<DrawerHeader />
				<NoInternetPage>
					<Outlet />
				</NoInternetPage>
			</RightPanel>
		</Box>
	);
};

export default Layout;
