import { IconButton, styled } from "@mui/material";
import MuiBox from "@mui/material/Box";

export const ModalContentWrapper = styled(MuiBox)(({ theme }) => ({
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  minWidth: 300,
  maxWidth: "90%",
  boxShadow: 24,
  padding: "40px 32px",
  borderRadius: "12px",
  outline: "none",
  background: theme.palette.background.light,
}));

export const CloseModalButton = styled(IconButton)(() => ({
  position: "absolute",
  right: 5,
  top: 5,
}));
