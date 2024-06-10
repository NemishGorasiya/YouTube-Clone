import styledConfig from "../../utils/styledConfig";
import { Box } from "@mui/material";
import MuiSwipeableDrawer from "@mui/material/SwipeableDrawer";
import MuiTypography from "@mui/material/Typography";

export const StyledBox = styledConfig(Box)({
  backgroundColor: "grey",
});

export const Puller = styledConfig(Box)({
  width: 60,
  height: 6,
  backgroundColor: "#fff",
  borderRadius: 3,
  position: "absolute",
  top: 8,
  left: "50%",
  transform: "translateX(-50%)",
});

export const SwipeableDrawer = styledConfig(MuiSwipeableDrawer)({
  ".MuiPaper-root": {
    height: "75%",
    overflow: "visible",
    width: "calc(100% - 24px)",
    margin: "0 auto",
    paddingTop: "56px",
    borderRadius: "8px",
  },
});

export const SwipeableCommentsSectionComponent = styledConfig(Box)({
  padding: "8px",
  background: "grey",
  borderRadius: "16px",
  marginTop: "16px",
});

export const SwipeableDrawerContent = styledConfig(Box)({
  position: "absolute",
  top: 0,
  borderTopLeftRadius: 8,
  borderTopRightRadius: 8,
  visibility: "visible",
  right: 0,
  left: 0,
});

export const SwipeableDrawerHeader = styledConfig(MuiTypography)({
  padding: "16px",
  color: "#fff",
  fontWeight: "700",
});

export const SwipeableDrawerCommentsWrapper = styledConfig(Box)({
  padding: "16px",
  height: "100%",
  overflow: "auto",
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
