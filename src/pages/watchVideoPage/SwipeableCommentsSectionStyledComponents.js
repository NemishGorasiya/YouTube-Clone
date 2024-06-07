import styledConfig from "../../utils/styledConfig";
import { Box } from "@mui/material";
import MuiSwipeableDrawer from "@mui/material/SwipeableDrawer";

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
  },
});
