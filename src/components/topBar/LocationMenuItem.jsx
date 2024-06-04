import { ListItemIcon, MenuItem } from "@mui/material";
import LanguageOutlinedIcon from "@mui/icons-material/LanguageOutlined";
import { useState } from "react";
import LocationCountriesSubMenu from "./LocationCountriesSubMenu";

const LocationMenuItem = () => {
  const [isLocationMenuOpen, setIsLocationMenuOpen] = useState(false);

  const toggleLocationMenu = () => {
    setIsLocationMenuOpen((prev) => !prev);
  };

  return (
    <>
      <MenuItem onClick={toggleLocationMenu}>
        <ListItemIcon>
          <LanguageOutlinedIcon fontSize="small" />
        </ListItemIcon>
        Location
      </MenuItem>
      <LocationCountriesSubMenu isLocationMenuOpen={isLocationMenuOpen} />
    </>
  );
};

export default LocationMenuItem;
