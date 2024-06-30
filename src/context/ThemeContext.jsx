import { createContext, useState } from "react";
import PropTypes from "prop-types";

export const ThemeContext = createContext();

export const ThemeContextProvider = ({ children }) => {
	const [themeMode, setThemeMode] = useState("systemPreference");

	const changeThemeMode = (event) => {
		const mode = event.target.closest("[data-id]").getAttribute("data-id");
		setThemeMode(mode);
	};

	return (
		<ThemeContext.Provider value={{ themeMode, changeThemeMode }}>
			{children}
		</ThemeContext.Provider>
	);
};

ThemeContextProvider.propTypes = {
	children: PropTypes.node,
};
