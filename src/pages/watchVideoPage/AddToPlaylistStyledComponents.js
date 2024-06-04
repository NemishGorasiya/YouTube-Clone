import { styled } from "@mui/material";
import MuiBox from "@mui/material/Box";
import MuiButton from "@mui/material/Button";
import MuiMenuItem from "@mui/material/MenuItem";

export const AddToPlaylistButton = styled(MuiBox)(() => ({
  display: "flex",
  alignItems: "center",
  gap: "4px",
  width: "100%",
  borderRadius: "inherit",
}));

export const CreatePlaylistButton = styled(MuiButton)(() => ({
  width: "fit-content",
  alignSelf: "end",
  padding: "8px",
}));

export const CreateNewPlaylistButton = styled(MuiButton)(() => ({
  display: "flex",
  justifyContent: "flex-start",
  paddingLeft: 0,
  gap: 8,
  borderRadius: 4,
  textTransform: "capitalize",
}));

export const FormControlWrapper = styled(MuiBox)(() => ({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
}));

export const NewPlaylistForm = styled("form")(() => ({
  display: "flex",
  flexDirection: "column",
  gap: 16,
}));

export const MenuItemTextWrapper = styled(MuiMenuItem)(() => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "start",
  "&:hover": {
    background: "none",
  },
}));
