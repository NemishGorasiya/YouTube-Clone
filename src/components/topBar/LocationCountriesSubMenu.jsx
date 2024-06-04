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
  const { data, error } = useFetch({
    url: "/i18nRegions",
    queryParams,
  });
  const { items } = data || {};
  const countryList = items || [];

  const handleChangeLocation = (countryCode) => {
    changeLocation(countryCode);
  };

  if (error) {
    return <h1>Something went wrong</h1>;
  }

  return (
    <Collapse in={isLocationMenuOpen} timeout="auto" unmountOnExit>
      <CountryListSubheader>
        {countryList.map((country) => (
          <CountryMenuItem
            key={country.id}
            sx={{
              color: location === country.id ? "#3EA6FF" : "",
            }}
            onClick={() => {
              handleChangeLocation(country.snippet.gl);
            }}
          >
            {country.snippet.name}{" "}
            {location === country.id && <DoneIcon fontSize="small" />}
          </CountryMenuItem>
        ))}
      </CountryListSubheader>
    </Collapse>
  );
};

LocationCountriesSubMenu.propTypes = {
  isLocationMenuOpen: PropTypes.bool,
};

export default LocationCountriesSubMenu;
