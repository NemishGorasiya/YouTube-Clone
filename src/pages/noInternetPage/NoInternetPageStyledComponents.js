import { Box } from "@mui/material";
import styledConfig from "../../utils/styledConfig";

export const NoInternetImageWrapper = styledConfig(Box)({
  height: "150px",
  width: "150px",
});

export const NoInternetImage = styledConfig("img")({
  height: "100%",
  width: "100%",
});

export const NoInternetFallbackPageContainer = styledConfig(Box)({
  height: "calc(100vh - 56px)",
  width: "100%",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  flexDirection: "column",
  gap: "16px",
});
