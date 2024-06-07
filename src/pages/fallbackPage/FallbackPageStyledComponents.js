import styledConfig from "../../utils/styledConfig";
import { Box } from "@mui/material";

export const FallbackPageContainer = styledConfig(Box)({
  height: "calc(100vh - 56px)",
  width: "100%",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  flexDirection: "column",
  gap: "16px",
});
