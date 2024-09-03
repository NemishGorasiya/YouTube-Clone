import PropTypes from "prop-types";
import { memo } from "react";
import { useTheme } from "@mui/material/styles";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import logo from "../../assets/logo.svg";
import logo_dark_mode from "../../assets/logo_dark_mode.svg";
import SearchInput from "./SearchInput";
import TopBarRight from "./TopBarRight";
import {
  AppBar,
  LogoContainer,
  Toolbar,
  TopBarLeft,
} from "./TopBarStyledComponents";
import { Link } from "react-router-dom";

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
          <Link to="/">
            <LogoContainer>
              <img
                src={themeMode === "dark" ? logo_dark_mode : logo}
                alt="YouTube logo"
              />
            </LogoContainer>
          </Link>
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
