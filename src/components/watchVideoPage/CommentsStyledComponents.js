import styledConfig from "../../utils/styledConfig";
import { Box, Skeleton, TextField } from "@mui/material";
import MuiButton from "@mui/material/Button";
import MuiTypography from "@mui/material/Typography";

export const Button = styledConfig(MuiButton)(
  ({ $textColor, $onHoverBackgroundColor }) => ({
    color: $textColor,
    "&:hover": {
      background: $onHoverBackgroundColor,
    },
  })
);

export const CommentEngagement = styledConfig(Box)({
  display: "flex",
  alignItems: "center",
  gap: "8px",
  marginTop: "4px",
});

export const CommentAuthorName = styledConfig(MuiTypography)({
  textOverflow: "ellipsis",
  overflow: "hidden",
  whiteSpace: "nowrap",
  maxWidth: "200px",
});

export const CommentPublishTime = styledConfig(MuiTypography)({
  textOverflow: "ellipsis",
  overflow: "hidden",
  whiteSpace: "nowrap",
  width: "200px",
  color: "gray",
});

export const CommentDetails = styledConfig(Box)({
  flex: 1,
});

export const CommentMetadata = styledConfig(Box)({
  display: "flex",
  gap: "8px",
  alignItems: "center",
});

export const CommentComponent = styledConfig(Box)({
  display: "flex",
  gap: "12px",
});

export const CommentAuthorImage = styledConfig("img")({
  height: "50px",
  borderRadius: "50%",
});

export const ReplyCommentForm = styledConfig("form")({
  display: "flex",
  marginBottom: "8px",
});

export const ReadMoreCommentContent = styledConfig(MuiTypography)(
  ({ theme }) => ({
    padding: 0,
    color: theme.palette.primary.light,
    cursor: "pointer",
    "&: hover": {
      textDecoration: "underline",
    },
  })
);

export const CommentContentTypography = styledConfig(MuiTypography)(
  ({ $isExpanded }) => ({
    textWrap: "wrap",
    lineHeight: "20px",
    rowGap: 0,
    position: "relative",
    overflow: "hidden",
    display: "-webkit-box",
    WebkitLineClamp: 4,
    WebkitBoxOrient: "vertical",
    ...($isExpanded && {
      display: "block",
    }),
  })
);

export const CommentAuthorThumbnailSkeleton = styledConfig(Skeleton)({
  minWidth: "50px",
});

export const ReplyTextField = styledConfig(TextField)({
  flex: 1,
});
