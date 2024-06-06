import { Box, Button, Typography, styled } from "@mui/material";
import MuiDivider from "@mui/material/Divider";
import ClearIcon from "@mui/icons-material/Clear";
import StyledModal from "../../components/StyledModal";

export const FiltersButton = styled(Button)({
  padding: "8px 16px",
  "&:hover": {
    background: "rgba(255, 255, 255, 0.2)",
  },
});

export const FilterFieldWrapper = styled(Box)({
  display: "flex",
  flexDirection: "column",
  alignItems: "flex-start",
  textAlign: "start",
  gap: "16px",
  flex: "1 1 auto",
});

export const FilterContentWrapper = styled(Box)({
  display: "flex",
  gap: "16px",
  paddingTop: "16px",
  paddingRight: "16px",
  flexWrap: "wrap",
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
});

export const Divider = styled(MuiDivider)({
  borderBottomWidth: "2px",
});

export const FilterFieldTypography = styled(Typography)(({ textColor }) => ({
  color: textColor || "grey",
  cursor: "pointer",
  display: "flex",
  alignItems: "center",
  gap: "8px",
}));

export const FilterModal = styled(StyledModal)({
  minHeight: "200vh",
});

export const StyledClearFilterIcon = styled(ClearIcon)({
  fontSize: "16px",
});
