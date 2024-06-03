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

export const ModalContentComponent = styled(MuiBox)(() => ({
  overflow: "auto",
  maxHeight: "80vh",
  "&::-webkit-scrollbar": {
    width: "8px",
    backgroundColor: "transparent",
  },
  "&::-webkit-scrollbar-track": {
    boxShadow: "inset 0 0 6px rgba(0,0,0,0.3)",
    borderRadius: "10px",
    backgroundColor: "transparent",
  },
  "&::-webkit-scrollbar-thumb": {
    borderRadius: "10px",
    boxShadow: "inset 0 0 6px rgba(0,0,0,0.3)",
    backgroundColor: "#555",
  },
}));
