import { Collapse, ListItemIcon, ListSubheader, MenuItem } from "@mui/material";
import { useContext, useState } from "react";
import { ThemeContext } from "../../context/ThemeContext";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import ContrastIcon from "@mui/icons-material/Contrast";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";
import DoneIcon from "@mui/icons-material/Done";
import {
  ListItemLabel,
  ListItemStyledIcon,
  TopBarRightMenuItem,
} from "./TopBarStyledComponents";
import { themeMenuList } from "../../utils/constant";

const ThemeMenuItem = () => {
  const { themeMode, changeThemeMode } = useContext(ThemeContext);
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
          {themeMenuList.map((theme) => {
            const { label, value, icon } = theme || {};
            const isActive = themeMode === value;
            return (
              <TopBarRightMenuItem
                key={value}
                onClick={() => {
                  changeThemeMode(value);
                }}
                isActive={isActive}
              >
                <ListItemStyledIcon>{icon}</ListItemStyledIcon>
                <ListItemLabel>
                  {label}
                  {isActive && <DoneIcon fontSize="small" />}
                </ListItemLabel>
              </TopBarRightMenuItem>
            );
          })}
        </ListSubheader>
      </Collapse>
    </>
  );
};

export default ThemeMenuItem;
