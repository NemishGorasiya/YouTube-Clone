import { useCallback, useState } from "react";
import TopBar from "../topBar/TopBar";
import SideBar from "../sideBar/SideBar";

const AppBar = () => {
	const [isSideBarOpen, setIsSideBarOpen] = useState(false);

	const toggleDrawer = useCallback((toOpen) => {
		if (toOpen === false) {
			setIsSideBarOpen(false);
			return;
		}
		setIsSideBarOpen((prevState) => !prevState);
	}, []);

	return (
		<>
			<TopBar toggleDrawer={toggleDrawer} />
			<SideBar open={isSideBarOpen} toggleDrawer={toggleDrawer} />
		</>
	);
};

export default AppBar;
