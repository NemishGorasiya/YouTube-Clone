import MenuIcon from "@mui/icons-material/Menu";
import MuiAppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import MuiBox from "@mui/material/Box";
import MuiIconButton from "@mui/material/IconButton";
import MuiToolbar from "@mui/material/Toolbar";
import { styled } from "@mui/material/styles";
import SearchInput from "./SearchInput";
import TopBarRight from "./TopBarRight";
import logo from "../../assets/logo.svg";
import logo_dark_mode from "../../assets/logo_dark_mode.svg";
import { useTheme } from "@mui/material/styles";
import { memo } from "react";
import PropTypes from "prop-types";

const TopBar = ({ toggleDrawer }) => {
  const theme = useTheme();
  const {
    palette: { mode: themeMode },
  } = theme;

  const AppBar = styled(MuiAppBar)(({ theme }) => ({
    zIndex: theme.zIndex.drawer + 1,
    background: theme.palette.background.default,
    color: theme.palette.primary.main,
    height: "56px",
  }));

  const Toolbar = styled(MuiToolbar)(() => ({
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    height: "56px",
    "@media (min-width: 600px)": {
      minHeight: "100%",
    },
  }));

  const TopBarLeft = styled(Box)(() => ({
    display: "flex",
    alignItems: "center",
    gap: "24px",
  }));

  const IconButton = styled(MuiIconButton)(() => ({
    padding: 0,
    marginLeft: "1px",
  }));

  const LogoContainer = styled(MuiBox)(() => ({
    height: "40px",
    display: "flex",
    alignItems: "center",
    position: "relative",

    img: {
      height: "20px",
    },

    "&:after": {
      content: `"IN"`,
      top: "3px",
      left: "103%",
      position: "absolute",
      height: "50px",
      width: "50px",
      fontSize: "10px",
      color: theme.palette.primary.light,
      fontFamily: "sans-serif",
    },
  }));

  return (
    <AppBar position="fixed" elevation={0} sx={{ height: "56px" }}>
      <Toolbar>
        <TopBarLeft>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="open drawer"
            onClick={toggleDrawer}
          >
            <MenuIcon />
          </IconButton>
          <LogoContainer>
            <img
              src={themeMode === "dark" ? logo_dark_mode : logo}
              alt="YouTube logo"
            />
          </LogoContainer>
        </TopBarLeft>
        <SearchInput />
        <TopBarRight />
      </Toolbar>
    </AppBar>
  );
};

TopBar.propTypes = {
  toggleDrawer: PropTypes.func,
};

const MemoizedTopBar = memo(TopBar);
export default MemoizedTopBar;
