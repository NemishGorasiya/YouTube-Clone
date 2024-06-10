import styledConfig from "../../utils/styledConfig";
import { Box, Button } from "@mui/material";

export const LikeDislikeButtonWrapper = styledConfig(Box)(
  ({ theme, $isCommentLikeDislike, $disabled }) => ({
    display: "flex",
    alignItems: "center",
    borderColor: "divider",
    borderRadius: 24,
    gap: $isCommentLikeDislike ? "12px" : 0,
    background: $isCommentLikeDislike
      ? "none"
      : $disabled
      ? theme.palette.secondaryBackground.secondary
      : theme.palette.secondaryBackground.default,
  })
);

export const LikeButton = styledConfig(Button)(
  ({ theme, $isCommentLikeDislike, disabled }) => ({
    borderTopRightRadius: 0,
    borderBottomRightRadius: 0,
    padding: $isCommentLikeDislike ? 0 : "auto",
    paddingLeft: 12,
    display: "flex",
    gap: 8,
    background: disabled ? theme.palette.secondaryBackground.secondary : null,
    "&:hover": {
      background: $isCommentLikeDislike
        ? "none"
        : theme.palette.secondaryBackground.light,
    },
  })
);

export const DislikeButton = styledConfig(Button)(
  ({ theme, $isCommentLikeDislike, disabled }) => ({
    minWidth: "0",
    paddingRight: 12,
    padding: $isCommentLikeDislike ? 0 : "auto",
    borderTopLeftRadius: 0,
    borderBottomLeftRadius: 0,
    height: "100%",
    background: disabled ? theme.palette.secondaryBackground.secondary : null,
    "&:hover": {
      background: $isCommentLikeDislike
        ? "none"
        : theme.palette.secondaryBackground.light,
    },
  })
);
