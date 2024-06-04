import { styled, MenuItem, ListSubheader, Divider } from "@mui/material";
import MuiAppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import MuiBox from "@mui/material/Box";
import MuiIconButton from "@mui/material/IconButton";
import MuiToolbar from "@mui/material/Toolbar";

export const AppBar = styled(MuiAppBar)(({ theme }) => ({
  zIndex: theme.zIndex.drawer + 1,
  background: theme.palette.background.default,
  color: theme.palette.primary.main,
  height: "56px",
}));

export const Toolbar = styled(MuiToolbar)(() => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  height: "56px",
  "@media (min-width: 600px)": {
    minHeight: "100%",
  },
}));

export const CountryMenuItem = styled(MenuItem)(() => ({
  display: "flex",
  alignItems: "center",
  gap: "8px",
}));

export const TopBarRightDivider = styled(Divider)(({ theme }) => ({
  "&.MuiDivider-root": {
    margin: "0",
    background: theme.palette.secondary.light,
  },
}));

export const TopBarLeft = styled(Box)(() => ({
  display: "flex",
  alignItems: "center",
  gap: "24px",
  marginRight: "24px",
}));

export const IconButton = styled(MuiIconButton)(() => ({
  padding: 0,
  marginLeft: "1px",
}));

export const ProfilePictureImage = styled("img")(() => ({
  width: "32px",
  height: "32px",
  borderRadius: "50%",
  objectFit: "cover",
}));

export const UsernameMenuItem = styled(MenuItem)(() => ({
  display: "flex",
  gap: "10px",
}));

export const CountryListSubheader = styled(ListSubheader)(() => ({
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
}));

export const LogoContainer = styled(MuiBox)(({ theme }) => ({
  height: "40px",
  display: "flex",
  alignItems: "center",
  position: "relative",

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
