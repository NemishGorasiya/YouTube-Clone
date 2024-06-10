import styledConfig from "../../utils/styledConfig";
import { Box, Button, Typography } from "@mui/material";
import MuiDivider from "@mui/material/Divider";
import ClearIcon from "@mui/icons-material/Clear";
import StyledModal from "../../components/StyledModal";

export const FiltersButton = styledConfig(Button)({
  padding: "8px 16px",
  "&:hover": {
    background: "rgba(255, 255, 255, 0.2)",
  },
});

export const FilterFieldWrapper = styledConfig(Box)({
  display: "flex",
  flexDirection: "column",
  alignItems: "flex-start",
  textAlign: "start",
  gap: "16px",
  flex: "1 1 auto",
});

export const FilterContentWrapper = styledConfig(Box)({
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
    borderRadius: "10px",
    backgroundColor: "transparent",
  },
  "&::-webkit-scrollbar-thumb": {
    borderRadius: "10px",
    boxShadow: "inset 0 0 6px rgba(0,0,0,0.3)",
    backgroundColor: "#555",
  },
});

export const Divider = styledConfig(MuiDivider)({
  borderBottomWidth: "2px",
});

export const FilterFieldTypography = styledConfig(Typography)(
  ({ $textColor }) => ({
    color: $textColor || "grey",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    gap: "8px",
  })
);

export const FilterModal = styledConfig(StyledModal)({
  minHeight: "200vh",
});

export const StyledClearFilterIcon = styledConfig(ClearIcon)({
  fontSize: "16px",
});
