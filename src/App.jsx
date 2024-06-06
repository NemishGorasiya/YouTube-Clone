import { createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import useMediaQuery from "@mui/material/useMediaQuery";
import { Toaster } from "react-hot-toast";
import { useContext } from "react";
import { RouterProvider } from "react-router-dom";
import { ThemeContext } from "./context/ThemeContext";
import { AuthContextProvider } from "./context/AuthContext";
import { UserPreferencesContextProvider } from "./context/UserPreferencesContext";
import { SubscriptionListContextProvider } from "./context/SubscriptionListContext";
import { router } from "./routes/Routes";
import "./App.scss";
import "nprogress/nprogress.css";

const App = () => {
  const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");
  const { themeMode } = useContext(ThemeContext);

  const darkTheme = createTheme({
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
        light: "#222222",
        secondary: "#272727",
      },
      secondaryBackground: {
        default: "#3F3F3F",
        light: "#303030",
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
  });
  const lightTheme = createTheme({
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
        light: "#D9D9D9",
        secondary: "#F2F2F2",
      },
      secondaryBackground: {
        default: "#E5E5E5",
        light: "#E0E0E0",
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
  });

  const chosenTheme =
    themeMode === "systemPreference"
      ? prefersDarkMode
        ? darkTheme
        : lightTheme
      : themeMode === "dark"
      ? darkTheme
      : lightTheme;

  return (
    <ThemeProvider theme={chosenTheme}>
      <UserPreferencesContextProvider>
        <AuthContextProvider>
          <SubscriptionListContextProvider>
            <CssBaseline />
            <Toaster
              position="bottom-left"
              toastOptions={{
                duration: 3000,
              }}
            />
            <RouterProvider router={router} />
          </SubscriptionListContextProvider>
        </AuthContextProvider>
      </UserPreferencesContextProvider>
    </ThemeProvider>
  );
};

export default App;
