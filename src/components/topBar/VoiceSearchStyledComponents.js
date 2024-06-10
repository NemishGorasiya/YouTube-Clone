import styledConfig from "../../utils/styledConfig";
import { IconButton } from "@mui/material";

export const StyledIconButton = styledConfig(IconButton)(({ theme }) => ({
  background: theme.palette.background.light,
}));
