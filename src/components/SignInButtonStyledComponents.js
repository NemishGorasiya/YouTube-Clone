import styledConfig from "../utils/styledConfig";
import { Link } from "react-router-dom";
import MuiButton from "@mui/material/Button";

export const Button = styledConfig(MuiButton)({
  color: "#3EA6FF",
  display: "flex",
  alignItems: "center",
  textTransform: "capitalize",
  gap: 8,
  padding: "6px 12px",
  fontSize: 15,
});

export const StyledLink = styledConfig(Link)({
  minWidth: "fit-content",
});
