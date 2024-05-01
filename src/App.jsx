import "./App.scss";
import CssBaseline from "@mui/material/CssBaseline";
import { RouterProvider } from "react-router-dom";
import { router } from "./routes/Routes";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";

const App = () => {
  const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");

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
      background: {
        default: "#000000",
        light: "#222222",
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
      background: {
        default: "#FFFFFF",
        light: "#D9D9D9",
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

  return (
    <ThemeProvider theme={prefersDarkMode ? darkTheme : lightTheme}>
      <CssBaseline />
      <RouterProvider router={router} />
    </ThemeProvider>
  );
};

export default App;
