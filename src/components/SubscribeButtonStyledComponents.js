import { Button, styled } from "@mui/material";
import { Skeleton } from "@mui/material";
import MuiBox from "@mui/material/Box";
import MuiMenuItem from "@mui/material/MenuItem";
import MuiButton from "@mui/material/Button";

export const UserActionButtonWrapper = styled(MuiBox)(() => ({
  textAlign: "end",
}));

export const MenuItem = styled(MuiMenuItem)(() => ({
  gap: 12,
}));

export const SubscribeButtonSkeleton = styled(Skeleton)(() => ({
  borderRadius: 24,
}));

export const UserActionButton = styled(MuiButton)(({ theme, textColor }) => ({
  color: textColor || theme.palette.primary.main,
}));

export const SubscribedButton = styled(MuiButton)(({ theme }) => ({
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

export const ModalContent = styled(MuiBox)(() => ({
  display: "flex",
  flexDirection: "column",
  gap: "12px",
}));

export const DoSubscribeButton = styled(MuiButton)(() => ({
  width: "fit-content",
  height: "fit-content",
}));
