import { Outlet } from "react-router-dom";

import Box from "@mui/material/Box";
import MuiBox from "@mui/material/Box";

import { styled } from "@mui/material/styles";
import AppBar from "../components/appBar/AppBar";

const Layout = () => {
  const RightPanel = styled(MuiBox)(({ theme }) => ({
    flexGrow: 1,
    padding: "0 26px",
    background: theme.palette.background.default,
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
        {/* <Outlet /> */}
      </RightPanel>
    </Box>
  );
};

export default Layout;
