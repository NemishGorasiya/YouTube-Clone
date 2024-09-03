import styledConfig from "../utils/styledConfig";
import { Skeleton } from "@mui/material";
import MuiBox from "@mui/material/Box";
import MuiMenuItem from "@mui/material/MenuItem";
import MuiButton from "@mui/material/Button";

export const UserActionButtonWrapper = styledConfig(MuiBox)({
  textAlign: "end",
});

export const MenuItem = styledConfig(MuiMenuItem)({
  gap: 12,
});

export const SubscribeButtonSkeleton = styledConfig(Skeleton)({
  borderRadius: 24,
});

export const UserActionButton = styledConfig(MuiButton)(
  ({ theme, $textColor }) => ({
    color: $textColor || theme.palette.primary.main,
  })
);

export const SubscribedButton = styledConfig(MuiButton)(({ theme }) => ({
  background: theme.palette.secondaryBackground.default,
  color: theme.palette.primary.main,
  outline: "none",
  border: "none",
  minWidth: "fit-content",
  width: "fit-content",
  height: "fit-content",
  paddingLeft: "16px",
  paddingRight: "12px",
  borderRadius: 32,
  [theme.breakpoints.down("sm")]: {
    fontSize: "12px",
    paddingLeft: "8px",
    paddingRight: "6px",
  },
}));

export const ModalContent = styledConfig(MuiBox)({
  display: "flex",
  flexDirection: "column",
  gap: "12px",
});

export const DoSubscribeButton = styledConfig(MuiButton)({
  width: "fit-content",
  height: "fit-content",
});
