import styledConfig from "../../utils/styledConfig";
import MuiButton from "@mui/material/Button";

export const Button = styledConfig(MuiButton)(({ $visible }) => ({
  display: "none",
  ...($visible && {
    display: "flex",
    flexWrap: "nowrap",
    padding: "4px 8px",
    position: "fixed",
    left: "50%",
    top: "70px",
    transform: "translateX(-50%)",
    fontSize: "17px",
    zIndex: 1,
    width: "max-content",
  }),
}));
