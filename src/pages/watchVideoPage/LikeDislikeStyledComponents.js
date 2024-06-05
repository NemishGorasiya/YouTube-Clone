import { Box, Button, styled } from "@mui/material";

export const LikeDislikeButtonWrapper = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  borderColor: "divider",
  borderRadius: 24,
  background: theme.palette.secondaryBackground.default,
}));

export const LikeButton = styled(Button)(({ theme }) => ({
  borderTopRightRadius: 0,
  borderBottomRightRadius: 0,
  paddingLeft: 12,
  display: "flex",
  gap: 8,
  "&:hover": {
    background: theme.palette.secondaryBackground.light,
  },
}));

export const DislikeButton = styled(Button)(({ theme }) => ({
  minWidth: "0",
  paddingRight: 12,
  borderTopLeftRadius: 0,
  borderBottomLeftRadius: 0,
  "&:hover": {
    background: theme.palette.secondaryBackground.light,
  },
}));
