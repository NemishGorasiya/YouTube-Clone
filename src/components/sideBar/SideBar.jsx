import Drawer from "@mui/material/Drawer";
import { styled } from "@mui/material/styles";

const SideBar = ({ open, toggleDrawer }) => {
	const DrawerHeader = styled("div")(({ theme }) => ({
		...theme.mixins.toolbar,
	}));

	return (
		<Drawer
			open={open}
			onClose={() => {
				console.log("called");
				toggleDrawer(false);
			}}
		>
			<DrawerHeader></DrawerHeader>
			<h1>Home</h1>
			<h1>Shorts</h1>
			<h1>Subscriptions</h1>
			<h1>Playlist</h1>
			<h1>Setting</h1>
		</Drawer>
	);
};

export default SideBar;
