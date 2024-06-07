import { Box } from "@mui/material";
import MuiTypography from "@mui/material/Typography";
import MuiSelect from "@mui/material/Select";
import MuiIconButton from "@mui/material/IconButton";
import styledConfig from "../../utils/styledConfig";
import MuiButton from "@mui/material/Button";
import MuiMenuItem from "@mui/material/MenuItem";

export const PlaylistPageComponent = styledConfig(Box)(({ theme }) => ({
  display: "flex",
  gap: "8px",
  [theme.breakpoints.down("lg")]: {
    flexDirection: "column",
  },
}));

export const PlaylistSidebar = styledConfig(Box)(({ theme }) => ({
  width: "360px",
  height: "calc(100vh - 56px)",
  borderRadius: 16,
  padding: 24,
  borderBottomLeftRadius: 0,
  borderBottomRightRadius: 0,
  zIndex: 1,
  position: "relative",
  overflow: "hidden",
  [theme.breakpoints.down("lg")]: {
    overflow: "visible",
    height: "auto",
    width: "100%",
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
    borderBottomLeftRadius: 16,
    borderBottomRightRadius: 16,
    gap: "16px",
    maxWidth: "768px",
    margin: "0 auto",
    padding: 12,
  },
}));

export const BlurredBackground = styledConfig(Box)(
  ({ $playlistThumbnail }) => ({
    position: "absolute",
    backgroundImage: `url(${$playlistThumbnail})`,
    filter: "blur(75px)",
    backdropFilter: "blur(5px)",
    height: "100%",
    width: "100%",
    top: 0,
    left: 0,
    right: 0,
    zIndex: -1,
    borderRadius: "inherit",
  })
);

export const PlaylistPanelWrapper = styledConfig(Box)(({ theme }) => ({
  flex: 1,
  overflow: "auto",
  height: "calc(100vh - 56px)",
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
  [theme.breakpoints.down("lg")]: {
    maxWidth: "768px",
    margin: "0 auto",
    height: "auto",
    overflow: "visible",
    minWidth: "100%",
  },
}));

export const PlaylistImageWrapper = styledConfig(Box)(({ theme }) => ({
  width: "100%",
  aspectRatio: "16/9",
  borderRadius: 12,
  [theme.breakpoints.down("lg")]: {
    width: "100%",
    maxWidth: "400px",
  },
}));

export const PlaylistImage = styledConfig("img")({
  width: "100%",
  height: "100%",
  borderRadius: "inherit",
  objectFit: "cover",
});

export const SecondaryTypography = styledConfig(MuiTypography)(({ theme }) => ({
  color: theme.palette.primary.light,
}));

export const PlaylistDetails = styledConfig(Box)({
  display: "flex",
  flexDirection: "column",
  width: "100%",
  gap: 5,
  color: "#F1F1F1",
});

export const PlaylistDetailTypography = styledConfig(MuiTypography)({
  display: "flex",
  alignItems: "center",
  gap: 2,
});

export const MenuItem = styledConfig(MuiMenuItem)({
  gap: 4,
});

export const UserActionButtonWrapper = styledConfig(Box)({
  textAlign: "end",
});

export const IconButton = styledConfig(MuiIconButton)({
  background: "rgba(255,255,255,0.2)",
  width: "fit-content",
});

export const PrivacyPolicySelect = styledConfig(MuiSelect)({
  width: "fit-content",
});

export const MenuItemTextWrapper = styledConfig(MuiMenuItem)({
  display: "flex",
  flexDirection: "column",
  alignItems: "start",
  "&:hover": {
    background: "none",
  },
});

export const UserActionButton = styledConfig(MuiButton)(
  ({ theme, textColor }) => ({
    color: textColor || theme.palette.primary.main,
  })
);

export const PlaylistSidebarSkeletonWrapper = styledConfig(PlaylistSidebar)({
  padding: 0,
});

export const ConfirmationModalContent = styledConfig(Box)({
  display: "flex",
  flexDirection: "column",
  gap: "12px",
});
