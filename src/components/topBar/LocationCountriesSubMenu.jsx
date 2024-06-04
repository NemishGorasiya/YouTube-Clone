import { Collapse } from "@mui/material";
import { useContext } from "react";
import {
  CountryListSubheader,
  CountryMenuItem,
} from "./TopBarStyledComponents";
import { UserPreferencesContext } from "../../context/UserPreferencesContext";
import useFetch from "../../hooks/useFetch";
import DoneIcon from "@mui/icons-material/Done";
import PropTypes from "prop-types";

const LocationCountriesSubMenu = ({ isLocationMenuOpen }) => {
  const { location, changeLocation } = useContext(UserPreferencesContext);

  const queryParams = {
    part: "snippet",
  };
  const { data } = useFetch({
    url: "/i18nRegions",
    queryParams,
  });
  const { items } = data || {};
  const countryList = items || [];

  const handleChangeLocation = (countryCode) => {
    changeLocation(countryCode);
  };

  return (
    <Collapse in={isLocationMenuOpen} timeout="auto" unmountOnExit>
      <CountryListSubheader>
        {countryList.map((country) => {
          const { id = "", snippet: { gl = "", name = "" } = {} } =
            country || {};
          const isActive = location === id;

          return (
            <CountryMenuItem
              key={id}
              isActive={isActive}
              onClick={() => {
                handleChangeLocation(gl);
              }}
            >
              {name} {isActive && <DoneIcon fontSize="small" />}
            </CountryMenuItem>
          );
        })}
      </CountryListSubheader>
    </Collapse>
  );
};

LocationCountriesSubMenu.propTypes = {
  isLocationMenuOpen: PropTypes.bool,
};

export default LocationCountriesSubMenu;
