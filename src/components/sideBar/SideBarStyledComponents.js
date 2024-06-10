import styledConfig from "../../utils/styledConfig";
import { NavLink } from "react-router-dom";
import List from "@mui/material/List";
import MuiListItem from "@mui/material/ListItem";
import MuiListItemButton from "@mui/material/ListItemButton";
import MuiListItemIcon from "@mui/material/ListItemIcon";
import MuiTypography from "@mui/material/Typography";
import MuiBox from "@mui/material/Box";
import MuiDrawer from "@mui/material/Drawer";

export const DrawerHeader = styledConfig(MuiBox)(({ theme }) => ({
  ...theme.mixins.toolbar,
  top: "50px",
}));

export const ListItemButton = styledConfig(MuiListItemButton)(({ $open }) => ({
  paddingRight: "12px",
  paddingLeft: "12px",
  gap: "24px",
  height: "40px",
  position: "relative",
  ...(!$open && {
    flexDirection: "column",
    gap: "0",
    height: "auto",
  }),
}));

export const ListItem = styledConfig(MuiListItem)(({ theme }) => ({
  color: theme.palette.primary.main,
  borderRadius: "10px",
  padding: "0",
  "&:hover": {
    background: theme.palette.background.light,
  },
}));

export const SignInSection = styledConfig(MuiBox)({
  padding: "12px 0",
  display: "flex",
  flexDirection: "column",
  gap: "10px",
});

export const Drawer = styledConfig(MuiDrawer)(({ theme, open }) => ({
  display: "flex",
  justifyContent: "center",
  zIndex: 1,
  ...(open
    ? {
        width: "224px",
      }
    : {
        width: "74px",
      }),

  "& .MuiPaper-root": {
    background: theme.palette.background.default,
    color: theme.palette.primary.main,
    padding: "0 4px",
    border: "none",
    zIndex: "999",
    ...(open
      ? {
          width: "224px",
          padding: "0 12px",
        }
      : {
          width: "72px",
        }),
  },
}));

export const ListItemIcon = styledConfig(MuiListItemIcon)(({ theme }) => ({
  color: theme.palette.primary.light,
  minWidth: 0,
  height: "24px",
  width: "24px",
}));

export const StyledNavLink = styledConfig(NavLink)(({ theme }) => ({
  "&.active li": {
    display: "block",
    background: theme.palette.background.light,
    borderRadius: "10px",
  },
}));

export const ListItemIconImage = styledConfig("img")({
  height: "100%",
  width: "100%",
  borderRadius: "50%",
  objectFit: "cover",
});

export const NavBarListTitle = styledConfig("p")(({ $open }) => ({
  paddingLeft: "13px",
  display: "flex",
  alignItems: "center",
  ...(!$open && {
    display: "none",
  }),
}));

export const SideBarLinksWrapper = styledConfig(MuiBox)({
  overflowY: "auto",
  overflowX: "hidden",
  "&::-webkit-scrollbar": {
    width: "0",
  },
});

export const NavBarList = styledConfig(List)(({ $open }) =>
  $open ? { maxWidth: "200px" } : { maxWidth: "100%" }
);

export const NavLinkTypography = styledConfig(MuiTypography)(
  ({ $open }) =>
    !$open && {
      fontSize: "10px",
      maxWidth: "50px",
    }
);
