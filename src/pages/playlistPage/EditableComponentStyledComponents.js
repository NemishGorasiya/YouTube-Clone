import styledConfig from "../../utils/styledConfig";
import { Box } from "@mui/material";
import MuiTextField from "@mui/material/TextField";

export const EditableContentWrapper = styledConfig(Box)(({ $isEditMode }) => ({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  ...($isEditMode && {
    flexDirection: "column",
  }),
}));

export const UserActionButtonsWrapper = styledConfig(Box)({
  textAlign: "end",
  width: "100%",
});

export const TextField = styledConfig(MuiTextField)({
  width: "100%",
  "& .MuiInputBase-input": {
    color: "#FFFFFF",
    fontSize: 32,
    fontWeight: 700,
  },
});
