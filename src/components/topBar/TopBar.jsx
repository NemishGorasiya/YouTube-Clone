import MenuIcon from "@mui/icons-material/Menu";
import SearchInput from "./SearchInput";
import TopBarRight from "./TopBarRight";
import logo from "../../assets/logo.svg";
import logo_dark_mode from "../../assets/logo_dark_mode.svg";
import { useTheme } from "@mui/material/styles";
import { memo } from "react";
import PropTypes from "prop-types";
import {
  AppBar,
  IconButton,
  LogoContainer,
  Toolbar,
  TopBarLeft,
} from "./TopBarStyledComponents";

const TopBar = ({ toggleDrawer }) => {
  const theme = useTheme();
  const {
    palette: { mode: themeMode },
  } = theme;

  return (
    <AppBar position="fixed" elevation={0}>
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
