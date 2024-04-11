import "./App.css";
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
        main: "#fff",
      },
      background: {
        default: "#000",
      },
    },
  });
  const lightTheme = createTheme({
    palette: {
      primary: {
        main: "#000",
      },
      background: {
        default: "#fff",
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
