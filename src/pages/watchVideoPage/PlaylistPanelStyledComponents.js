import { styled } from "@mui/material";
import MuiBox from "@mui/material/Box";

export const PlaylistPanelComponent = styled(MuiBox)(() => ({
  padding: "0 12px",
  overflow: "auto",
  maxHeight: "100%",
  display: "flex",
  flexDirection: "column",
  gap: "8px",

  "&::-webkit-scrollbar-track": {
    boxShadow: "inset 0 0 6px rgba(0,0,0,0.3)",
    borderRadius: "12px",
  },
  "&::-webkit-scrollbar": {
    width: "12px",
  },
  "&::-webkit-scrollbar-thumb": {
    borderRadius: "10px",
    boxShadow: "inset 0 0 6px rgba(0,0,0,0.3)",
    backgroundColor: "#555",
  },
}));
