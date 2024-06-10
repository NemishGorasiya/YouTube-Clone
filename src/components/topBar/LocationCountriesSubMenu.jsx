import { useContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Collapse } from "@mui/material";
import DoneIcon from "@mui/icons-material/Done";
import { UserPreferencesContext } from "../../context/UserPreferencesContext";
import {
  CountryListSubheader,
  CountryMenuItem,
} from "./TopBarStyledComponents";
import { httpRequest } from "../../services/services";

const LocationCountriesSubMenu = ({ isLocationMenuOpen }) => {
  const { location, changeLocation } = useContext(UserPreferencesContext);

  const [countries, setCountries] = useState([]);

  const handleChangeLocation = (countryCode) => {
    changeLocation(countryCode);
  };

  const getCountries = async ({ abortController }) => {
    try {
      const queryParams = { part: "snippet" };
      const res = await httpRequest({
        url: "/i18nRegions",
        queryParams,
        abortController,
      });
      if (res) {
        const { items } = res;
        setCountries(items);
      }
    } catch (error) {
      console.error(error.message || error);
    }
  };

  useEffect(() => {
    const abortController = new AbortController();
    getCountries({ abortController });
    return () => {
      abortController.abort();
    };
  }, []);

  return (
    <Collapse in={isLocationMenuOpen} timeout="auto" unmountOnExit>
      <CountryListSubheader>
        {countries.map((country) => {
          const { id = "", snippet: { gl = "", name = "" } = {} } =
            country || {};
          const isActive = location === id;

          return (
            <CountryMenuItem
              key={id}
              $isActive={isActive}
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
