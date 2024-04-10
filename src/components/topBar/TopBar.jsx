import AppBar from "@mui/material/AppBar";
import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import MuiAppBar from "@mui/material/AppBar";

const TopBar = ({ open, toggleDrawer }) => {
  const AppBar = styled(MuiAppBar)(({ theme }) => ({
    zIndex: theme.zIndex.drawer + 1,
  }));

  return (
    <AppBar
      position="fixed"
      open={open}
      elevation={0}
      sx={{ background: "grey" }}
    >
      <Toolbar sx={{ justifyContent: "space-between" }}>
        <Box>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="open drawer"
            onClick={toggleDrawer}
          >
            <MenuIcon />
          </IconButton>
        </Box>
        <Box>HEllo</Box>
        <Box>HEllo</Box>
      </Toolbar>
    </AppBar>
  );
};

export default TopBar;
