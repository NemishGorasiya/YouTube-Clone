import AccountCircle from "@mui/icons-material/AccountCircle";
import MenuIcon from "@mui/icons-material/Menu";
import NotificationsIcon from "@mui/icons-material/Notifications";
import MuiAppBar from "@mui/material/AppBar";
import Badge from "@mui/material/Badge";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
// import InputBase from "@mui/material/InputBase";
import MuiToolbar from "@mui/material/Toolbar";
import { styled } from "@mui/material/styles";
import SearchInput from "./SearchInput";
import { Tooltip } from "@mui/material";
import TopBarRight from "./TopBarRight";

const TopBar = ({ open, toggleDrawer }) => {
  const AppBar = styled(MuiAppBar)(({ theme }) => ({
    zIndex: theme.zIndex.drawer + 1,
    background: theme.palette.background.default,
    color: theme.palette.primary.main,
    height: "56px",
  }));

  // const Search = styled("div")(() => ({
  //   display: "flex",
  //   alignItems: "center",
  //   height: "40px",
  // }));

  const Toolbar = styled(MuiToolbar)(() => ({
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    height: "56px",
  }));

  // const SearchIconWrapper = styled("div")(({ theme }) => ({
  //   height: "100%",
  //   display: "flex",
  //   alignItems: "center",
  //   justifyContent: "center",
  //   width: "50px",
  //   border: "1px solid #000",
  //   borderLeft: "none",
  //   borderRadius: "0 40px 40px 0",
  // }));

  // const StyledInputBase = styled(InputBase)(() => ({
  //   height: "100%",
  //   border: "1px solid #000",
  //   borderRadius: "40px 0 0 40px",
  //   paddingLeft: "5px",
  // }));

  return (
    <AppBar position="fixed" open={open} elevation={0}>
      <Toolbar>
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
        <Box>
          <SearchInput />
        </Box>

        <TopBarRight />
      </Toolbar>
    </AppBar>
  );
};

export default TopBar;
