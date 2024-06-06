import { styled, Box } from "@mui/material";

export const LayoutComponent = styled(Box)({
  display: "flex",
});

export const RightPanel = styled(Box)(({ theme }) => ({
  flexGrow: 1,
  padding: "0 26px",
  minWidth: 0,
  background: theme.palette.background.default,
  [theme.breakpoints.down("sm")]: {
    padding: "0 16px",
  },
}));

export const OutletWrapper = styled(Box)({
  // paddingTop: "8px",
});

export const DrawerHeader = styled("div")(({ theme }) => ({
  ...theme.mixins.toolbar,
  height: "56px",
  "@media (min-width: 600px)": {
    minHeight: "56px",
  },
}));
