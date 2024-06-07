import styledConfig from "../utils/styledConfig";
import MuiGrid from "@mui/material/Grid";

export const Grid = styledConfig(MuiGrid)(({ theme, $isListView }) => ({
  display: "grid",
  gap: "16px",
  paddingTop: "8px",
  ...($isListView
    ? {
        gridTemplateColumns: "1fr",
        maxWidth: "1300px",
        margin: "auto",
        gap: "12px",
      }
    : {
        gridTemplateColumns: "repeat(auto-fill, minmax(310px, 1fr))",
      }),
  [theme.breakpoints.down("sm")]: {
    gridTemplateColumns: "1fr",
  },
}));
