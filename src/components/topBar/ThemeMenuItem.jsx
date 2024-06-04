import { Collapse, ListItemIcon, ListSubheader, MenuItem } from "@mui/material";
import { useContext, useState } from "react";
import { ThemeContext } from "../../context/ThemeContext";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import ContrastIcon from "@mui/icons-material/Contrast";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";

const ThemeMenuItem = () => {
  const { changeThemeMode } = useContext(ThemeContext);
  const [isThemeMenuOpen, setIsThemeMenuOpen] = useState(false);

  const toggleThemeMenu = () => {
    setIsThemeMenuOpen((prev) => !prev);
  };
  return (
    <>
      <MenuItem onClick={toggleThemeMenu}>
        <ListItemIcon>
          <Brightness4Icon fontSize="small" />
        </ListItemIcon>
        Appearance
      </MenuItem>
      <Collapse in={isThemeMenuOpen} timeout="auto" unmountOnExit>
        <ListSubheader>
          <MenuItem
            onClick={() => {
              changeThemeMode("systemPreference");
            }}
          >
            <ListItemIcon>
              <ContrastIcon fontSize="small" />
            </ListItemIcon>
            Use device theme
          </MenuItem>
          <MenuItem
            onClick={() => {
              changeThemeMode("dark");
            }}
          >
            <ListItemIcon>
              <DarkModeIcon fontSize="small" />
            </ListItemIcon>
            Dark theme
          </MenuItem>
          <MenuItem
            onClick={() => {
              changeThemeMode("light");
            }}
          >
            <ListItemIcon>
              <LightModeIcon fontSize="small" />
            </ListItemIcon>
            Light theme
          </MenuItem>
        </ListSubheader>
      </Collapse>
    </>
  );
};

export default ThemeMenuItem;
