import { useContext, useState } from "react";
import { Collapse, ListItemIcon, ListSubheader, MenuItem } from "@mui/material";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import DoneIcon from "@mui/icons-material/Done";
import { ThemeContext } from "../../context/ThemeContext";
import { themeMenuList } from "../../utils/constant";
import {
  ListItemLabel,
  ListItemStyledIcon,
  TopBarRightMenuItem,
} from "./TopBarStyledComponents";

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
                $isActive={isActive}
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
