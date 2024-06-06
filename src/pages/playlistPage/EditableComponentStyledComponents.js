import { Box, styled } from "@mui/material";
import MuiTextField from "@mui/material/TextField";

export const EditableContentWrapper = styled(Box)(({ isEditMode }) => ({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  ...(isEditMode && {
    flexDirection: "column",
  }),
}));

export const UserActionButtonsWrapper = styled(Box)({
  textAlign: "end",
  width: "100%",
});

export const TextField = styled(MuiTextField)({
  width: "100%",
  "& .MuiInputBase-input": {
    color: "#FFFFFF",
    fontSize: 32,
    fontWeight: 700,
  },
});
