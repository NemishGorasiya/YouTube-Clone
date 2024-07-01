import { useContext, useMemo } from "react";
import { ThemeProvider } from "@mui/material/styles";
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
import { darkTheme, lightTheme } from "./utils/theme";

const App = () => {
  const { themeMode } = useContext(ThemeContext);
  const currentThemeMode = usePreferredTheme(themeMode);

  const chosenTheme = useMemo(() => {
    return currentThemeMode === "dark" ? darkTheme : lightTheme;
  }, [currentThemeMode]);

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
