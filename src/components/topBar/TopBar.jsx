import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import MuiAppBar from "@mui/material/AppBar";
import SearchIcon from "@mui/icons-material/Search";
import InputBase from "@mui/material/InputBase";
import Badge from "@mui/material/Badge";
import NotificationsIcon from "@mui/icons-material/Notifications";
import AccountCircle from "@mui/icons-material/AccountCircle";

import { useState } from "react";
import TextField from "@mui/material/TextField";
import SearchInput from "./SearchInput";

const TopBar = ({ open, toggleDrawer }) => {
  const AppBar = styled(MuiAppBar)(({ theme }) => ({
    zIndex: theme.zIndex.drawer + 1,
    background: theme.palette.background.default,
    color: theme.palette.primary.main,
  }));

  const Search = styled("div")(() => ({
    display: "flex",
    alignItems: "center",
    height: "40px",
  }));

  const SearchIconWrapper = styled("div")(({ theme }) => ({
    height: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: "50px",
    border: "1px solid #000",
    borderLeft: "none",
    borderRadius: "0 40px 40px 0",
  }));

  const StyledInputBase = styled(InputBase)(() => ({
    height: "100%",
    border: "1px solid #000",
    borderRadius: "40px 0 0 40px",
    paddingLeft: "5px",
  }));

  return (
    <AppBar position="fixed" open={open} elevation={0}>
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
        <Box>
          <SearchInput />
        </Box>
        <Box>
          <IconButton
            size="large"
            aria-label="show 4 new mails"
            color="inherit"
          >
            <Badge badgeContent={4} color="error">
              <NotificationsIcon />
            </Badge>
          </IconButton>
          <IconButton
            size="large"
            edge="end"
            aria-label="account of current user"
            aria-haspopup="true"
            color="inherit"
          >
            <AccountCircle />
          </IconButton>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default TopBar;
