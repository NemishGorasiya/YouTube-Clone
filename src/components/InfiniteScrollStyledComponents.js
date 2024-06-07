import styledConfig from "../utils/styledConfig";
import { Box } from "@mui/material";

export const LoaderWrapper = styledConfig(Box)({
  display: "flex",
  justifyContent: "center",
  gridColumn: "1/-1",
});
