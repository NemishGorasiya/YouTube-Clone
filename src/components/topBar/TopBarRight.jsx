import {
  AccountCircle,
  ExpandLess,
  ExpandMore,
  Logout,
  PersonAdd,
  Settings,
  StarBorder,
} from "@mui/icons-material";
import {
  Avatar,
  Badge,
  Box,
  Divider,
  IconButton,
  ListItemIcon,
  MenuItem,
  Tooltip,
  Menu,
  Collapse,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import NightlightRoundIcon from "@mui/icons-material/NightlightRound";
import LightModeIcon from "@mui/icons-material/LightMode";
import ContrastIcon from "@mui/icons-material/Contrast";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import NotificationsIcon from "@mui/icons-material/Notifications";
import { useState } from "react";

const TopBarRight = () => {
  const [isThemeMenuOpen, setIsThemeMenuOpen] = useState(false);

  const toggleThemeMenu = () => {
    setIsThemeMenuOpen((prev) => !prev);
  };

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const closeProfileMenu = () => {
    setAnchorEl(null);
    setIsThemeMenuOpen(false);
  };

  return (
    <Box>
      <Box sx={{ display: "flex", alignItems: "center", textAlign: "center" }}>
        <Tooltip title="Account settings">
          <IconButton
            onClick={handleClick}
            size="small"
            sx={{ ml: 2 }}
            aria-controls={open ? "account-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
          >
            <Avatar sx={{ width: 32, height: 32 }}>M</Avatar>
          </IconButton>
        </Tooltip>
      </Box>
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={closeProfileMenu}
        // onClick={closeProfileMenu}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: "visible",
            filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
            mt: 1.5,
            "& .MuiAvatar-root": {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            "&::before": {
              content: '""',
              display: "block",
              position: "absolute",
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: "background.paper",
              transform: "translateY(-50%) rotate(45deg)",
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        <MenuItem>
          <Avatar /> Profile
        </MenuItem>
        <MenuItem>
          <Avatar /> My account
        </MenuItem>
        <Divider />
        <MenuItem>
          <ListItemIcon>
            <PersonAdd fontSize="small" />
          </ListItemIcon>
          Add another account
        </MenuItem>

        <MenuItem onClick={toggleThemeMenu}>
          <ListItemIcon>
            <Brightness4Icon fontSize="small" />
          </ListItemIcon>
          Appearance
        </MenuItem>
        <Collapse in={isThemeMenuOpen} timeout="auto" unmountOnExit>
          <MenuItem>
            <ListItemIcon>
              <ContrastIcon fontSize="small" />
            </ListItemIcon>
            Use device theme
          </MenuItem>
          <MenuItem>
            <ListItemIcon>
              <DarkModeIcon fontSize="small" />
            </ListItemIcon>
            Dark theme
          </MenuItem>
          <MenuItem>
            <ListItemIcon>
              <LightModeIcon fontSize="small" />
            </ListItemIcon>
            Light theme
          </MenuItem>
          <Divider />
        </Collapse>
        <MenuItem>
          <ListItemIcon>
            <Logout fontSize="small" />
          </ListItemIcon>
          Logout
        </MenuItem>
      </Menu>
    </Box>
  );
};

export default TopBarRight;
