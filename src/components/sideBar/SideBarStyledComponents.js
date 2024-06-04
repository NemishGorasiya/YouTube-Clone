import { styled } from "@mui/material";
import List from "@mui/material/List";
import MuiListItem from "@mui/material/ListItem";
import MuiListItemButton from "@mui/material/ListItemButton";
import MuiListItemIcon from "@mui/material/ListItemIcon";
import MuiTypography from "@mui/material/Typography";
import MuiBox from "@mui/material/Box";
import MuiDrawer from "@mui/material/Drawer";
import { NavLink } from "react-router-dom";

export const DrawerHeader = styled("div")(({ theme }) => ({
  ...theme.mixins.toolbar,
}));

export const ListItemButton = styled(MuiListItemButton)(({ open }) => ({
  paddingRight: "12px",
  paddingLeft: "12px",
  gap: "24px",
  height: "40px",
  position: "relative",
  ...(!open && {
    flexDirection: "column",
    gap: "0",
    height: "auto",
  }),
}));

export const ListItem = styled(MuiListItem)(({ theme }) => ({
  color: theme.palette.primary.main,
  borderRadius: "10px",
  padding: "0",
  "&:hover": {
    background: theme.palette.background.light,
  },
}));

export const SignInSection = styled(MuiBox)(() => ({
  padding: "12px 0",
  display: "flex",
  flexDirection: "column",
  gap: "10px",
}));

export const Drawer = styled(MuiDrawer)(({ theme, open }) => ({
  display: "flex",
  justifyContent: "center",
  ...(open
    ? {
        width: "224px", // 220 + 12 + 12 (paddingX=12)
      }
    : {
        width: "74px",
      }),

  "& .MuiPaper-root": {
    background: theme.palette.background.default,
    color: theme.palette.primary.main,
    padding: "0 4px",
    border: "none",
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

export const ListItemIcon = styled(MuiListItemIcon)(({ theme }) => ({
  color: theme.palette.primary.light,
  minWidth: 0,
  height: "24px",
  width: "24px",
}));

export const StyledNavLink = styled(NavLink)(({ theme }) => ({
  "&.active li": {
    display: "block",
    background: theme.palette.background.light,
    borderRadius: "10px",
  },
}));

export const ListItemIconImage = styled("img")({
  height: "100%",
  width: "100%",
  borderRadius: "50%",
  objectFit: "cover",
});
export const NewItemIndicator = styled(MuiBox)(({ open }) => ({
  position: "absolute",
  height: "4px",
  width: "4px",
  borderRadius: "50%",
  top: "50%",
  right: "5px",
  transform: "translateY(-50%)",
  background: "#3EA6FF",
  ...(!open && {
    display: "none",
  }),
}));

export const NavBarListTitle = styled("p")(({ open }) => ({
  paddingLeft: "13px",
  display: "flex",
  alignItems: "center",
  ...(!open && {
    display: "none",
  }),
}));

export const SideBarLinksWrapper = styled(MuiBox)(() => ({
  overflowY: "auto",
  overflowX: "hidden",
  "&::-webkit-scrollbar": {
    width: "0",
  },
}));

export const NavBarList = styled(List)(({ open }) =>
  open ? { maxWidth: "200px" } : { maxWidth: "100%" }
);

export const NavLinkTypography = styled(MuiTypography)(
  ({ open }) =>
    !open && {
      fontSize: "10px",
      maxWidth: "50px",
    }
);
