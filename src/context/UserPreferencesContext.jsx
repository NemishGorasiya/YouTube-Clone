import { createContext, useState } from "react";
import PropTypes from "prop-types";

export const UserPreferencesContext = createContext();

export const UserPreferencesContextProvider = ({ children }) => {
	const [location, setLocation] = useState("IN");

	const changeLocation = (countryCode) => {
		setLocation(countryCode);
		localStorage.setItem("location", countryCode);
	};

	return (
		<UserPreferencesContext.Provider value={{ location, changeLocation }}>
			{children}
		</UserPreferencesContext.Provider>
	);
};

UserPreferencesContextProvider.propTypes = {
	children: PropTypes.node,
};
