import { Outlet } from "react-router-dom";
import SideBar from "../components/sideBar/SideBar";
import TopBar from "../components/topBar/TopBar";
import Box from "@mui/material/Box";
import { useState } from "react";
import { styled } from "@mui/material/styles";

const Layout = () => {
  const [open, setOpen] = useState(false);

  const toggleDrawer = (shouldClose) => {
    console.log("called");
    if (shouldClose === false) {
      setOpen(false);
      console.log("first");
      return;
    }
    console.log("second");
    setOpen((prevState) => !prevState);
  };

  const DrawerHeader = styled("div")(({ theme }) => ({
    ...theme.mixins.toolbar,
  }));
  return (
    <Box sx={{ display: "flex" }}>
      <TopBar open={open} toggleDrawer={toggleDrawer} />
      <SideBar open={open} toggleDrawer={toggleDrawer} />
      <Box component="main" sx={{ flexGrow: 1, padding: 2 }}>
        <DrawerHeader />
        <Outlet />
      </Box>
    </Box>
  );
};

export default Layout;
