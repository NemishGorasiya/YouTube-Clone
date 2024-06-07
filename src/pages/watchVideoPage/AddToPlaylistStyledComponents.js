import styledConfig from "../../utils/styledConfig";
import { Box } from "@mui/material";
import MuiButton from "@mui/material/Button";
import MuiMenuItem from "@mui/material/MenuItem";

export const AddToPlaylistButton = styledConfig(Box)({
  display: "flex",
  alignItems: "center",
  gap: "4px",
  width: "100%",
  borderRadius: "inherit",
});

export const CreatePlaylistButton = styledConfig(MuiButton)({
  width: "fit-content",
  alignSelf: "end",
  padding: "8px",
});

export const CreateNewPlaylistButton = styledConfig(MuiButton)({
  display: "flex",
  justifyContent: "flex-start",
  paddingLeft: 0,
  gap: 8,
  borderRadius: 4,
  textTransform: "capitalize",
});

export const FormControlWrapper = styledConfig(Box)({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
});

export const NewPlaylistForm = styledConfig("form")({
  display: "flex",
  flexDirection: "column",
  gap: 16,
});

export const MenuItemTextWrapper = styledConfig(MuiMenuItem)({
  display: "flex",
  flexDirection: "column",
  alignItems: "start",
  "&:hover": {
    background: "none",
  },
});

export const AddToPlaylistModalContent = styledConfig(Box)({
  display: "flex",
  flexDirection: "column",
  gap: "12px",
});
