import { createContext, useState } from "react";

export const ThemeContext = createContext();

export const ThemeContextProvider = ({ children }) => {
	const [themeMode, setThemeMode] = useState("systemPreference");
	const changeThemeMode = (mode) => {
		setThemeMode(mode);
	};
	return (
		<ThemeContext.Provider value={{ themeMode, changeThemeMode }}>
			{children}
		</ThemeContext.Provider>
	);
};
