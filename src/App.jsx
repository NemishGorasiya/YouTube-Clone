import { useContext, useMemo } from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { ThemeContext } from "./context/ThemeContext";
import { AuthContextProvider } from "./context/AuthContext";
import { UserPreferencesContextProvider } from "./context/UserPreferencesContext";
import { SubscriptionListContextProvider } from "./context/SubscriptionListContext";
import Routes from "./routes/Routes";
import "./App.css";
import "nprogress/nprogress.css";
import ToastConfig from "./utils/ToastConfig";
import usePreferredTheme from "./hooks/usePreferredTheme";

const App = () => {
	const { themeMode } = useContext(ThemeContext);
	const currentThemeMode = usePreferredTheme(themeMode);

	const darkTheme = useMemo(
		() =>
			createTheme({
				palette: {
					mode: "dark",
					primary: {
						main: "#F1F1F1",
						light: "#AAAAAA",
					},
					secondary: {
						main: "#AAAAAA",
						light: "#303030",
					},
					blue: {
						primary: "#3EA6FF",
					},
					background: {
						default: "#000000",
						main: "#222222",
						light: "#222222",
						secondary: "#272727",
					},
					secondaryBackground: {
						default: "#3F3F3F",
						light: "#303030",
						secondary: "#1F1F1F",
					},
				},
				components: {
					MuiButton: {
						styleOverrides: {
							root: {
								borderRadius: 28,
							},
						},
					},
				},
			}),
		[]
	);
	const lightTheme = useMemo(
		() =>
			createTheme({
				palette: {
					primary: {
						main: "#0F0F0F",
						light: "#606060",
					},
					secondary: {
						main: "#AAAAAA",
						light: "#303030",
					},
					blue: {
						primary: "#3EA6FF",
					},
					background: {
						default: "#FFFFFF",
						main: "#FFFFFF",
						light: "#D9D9D9",
						secondary: "#F2F2F2",
					},
					secondaryBackground: {
						default: "#E5E5E5",
						light: "#E0E0E0",
						secondary: "#E0E0E0",
					},
				},
				components: {
					MuiButton: {
						styleOverrides: {
							root: {
								borderRadius: 28,
							},
						},
					},
				},
			}),
		[]
	);

	const chosenTheme = useMemo(() => {
		return currentThemeMode === "dark" ? darkTheme : lightTheme;
	}, [currentThemeMode, darkTheme, lightTheme]);

	return (
		<ThemeProvider theme={chosenTheme}>
			<UserPreferencesContextProvider>
				<AuthContextProvider>
					<SubscriptionListContextProvider>
						<CssBaseline />
						<ToastConfig />
						<Routes />
					</SubscriptionListContextProvider>
				</AuthContextProvider>
			</UserPreferencesContextProvider>
		</ThemeProvider>
	);
};

export default App;
