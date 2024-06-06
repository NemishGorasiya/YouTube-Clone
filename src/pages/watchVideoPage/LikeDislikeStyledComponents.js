import { Box, Button, styled } from "@mui/material";

export const LikeDislikeButtonWrapper = styled(Box)(
  ({ theme, isCommentLikeDislike }) => ({
    display: "flex",
    alignItems: "center",
    borderColor: "divider",
    borderRadius: 24,
    gap: isCommentLikeDislike ? "12px" : 0,
    background: isCommentLikeDislike
      ? "none"
      : theme.palette.secondaryBackground.default,
  })
);

export const LikeButton = styled(Button)(({ theme, isCommentLikeDislike }) => ({
  borderTopRightRadius: 0,
  borderBottomRightRadius: 0,
  padding: isCommentLikeDislike ? 0 : "auto",
  paddingLeft: 12,
  display: "flex",
  gap: 8,
  "&:hover": {
    background: isCommentLikeDislike
      ? "none"
      : theme.palette.secondaryBackground.light,
  },
}));

export const DislikeButton = styled(Button)(
  ({ theme, isCommentLikeDislike }) => ({
    minWidth: "0",
    paddingRight: 12,
    padding: isCommentLikeDislike ? 0 : "auto",
    borderTopLeftRadius: 0,
    borderBottomLeftRadius: 0,
    "&:hover": {
      background: isCommentLikeDislike
        ? "none"
        : theme.palette.secondaryBackground.light,
    },
  })
);
