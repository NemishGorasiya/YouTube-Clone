import { useMemo } from "react";
import { useMediaQuery } from "@mui/material";

const usePreferredTheme = (themeMode) => {
	const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");

	return useMemo(() => {
		if (themeMode === "systemPreference") {
			return prefersDarkMode ? "dark" : "light";
		}
		return themeMode;
	}, [themeMode, prefersDarkMode]);
};

export default usePreferredTheme;
