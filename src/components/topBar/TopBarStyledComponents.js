import styledConfig from "../../utils/styledConfig";
import {
  MenuItem,
  ListSubheader,
  Divider,
  ListItemIcon,
  Box,
} from "@mui/material";
import MuiAppBar from "@mui/material/AppBar";
import MuiIconButton from "@mui/material/IconButton";
import MuiToolbar from "@mui/material/Toolbar";

export const AppBar = styledConfig(MuiAppBar)(({ theme }) => ({
  zIndex: 1000,
  background: theme.palette.background.default,
  color: theme.palette.primary.main,
  height: "56px",
}));

export const StyledMenuPaper = styledConfig(Box)(({ theme }) => ({
  overflow: "visible !important",
  filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
  marginTop: "0.5rem",
  backgroundColor: `${theme.palette.background.secondary} !important`,
  borderRadius: "12px !important",

  "&::before": {
    content: '""',
    display: "block",
    position: "absolute",
    top: 0,
    right: 14,
    width: 10,
    height: 10,
    backgroundColor: theme.palette.background.secondary,
    transform: "translateY(-50%) rotate(45deg)",
    zIndex: 0,
  },
}));

export const Toolbar = styledConfig(MuiToolbar)({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  height: "56px",
  "@media (min-width: 600px)": {
    minHeight: "100%",
  },
});

export const ListItemLabel = styledConfig(Box)({
  display: "flex",
  alignItems: "center",
  gap: "8px",
});

export const TopBarRightMenuItem = styledConfig(MenuItem)(
  ({ theme, $isActive }) => ({
    ...($isActive && { color: theme.palette.blue.primary }),
  })
);

export const ListItemStyledIcon = styledConfig(ListItemIcon)({
  color: "inherit",
});

export const CountryMenuItem = styledConfig(MenuItem)(({ $isActive }) => ({
  display: "flex",
  gap: "8px",
  ...($isActive && { color: "#3EA6FF" }),
}));

export const TopBarRightDivider = styledConfig(Divider)({
  "&.MuiDivider-root": {
    margin: "0 !important",
  },
});

export const TopBarLeft = styledConfig(Box)({
  display: "flex",
  alignItems: "center",
  gap: "12px",
  marginRight: "24px",
});

export const ProfilePictureImage = styledConfig("img")({
  width: "32px",
  height: "32px",
  borderRadius: "50%",
  objectFit: "cover",
});

export const UsernameMenuItem = styledConfig(MenuItem)({
  display: "flex",
  gap: "10px",
});

export const AvatarWrapper = styledConfig(Box)({
  display: "flex",
  alignItems: "center",
  textAlign: "center",
});

export const CountryListSubheader = styledConfig(ListSubheader)({
  maxHeight: "50vh",
  overflow: "auto",
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

export const LogoContainer = styledConfig(Box)(({ theme }) => ({
  height: "40px",
  display: "flex",
  alignItems: "center",
  position: "relative",
  cursor: "pointer",

  img: {
    height: "20px",
  },

  "&:after": {
    content: `"IN"`,
    top: "3px",
    left: "103%",
    position: "absolute",
    height: "50px",
    width: "50px",
    fontSize: "10px",
    color: theme.palette.primary.light,
    fontFamily: "sans-serif",
  },
}));
