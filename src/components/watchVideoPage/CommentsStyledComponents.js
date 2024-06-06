import { Box, Skeleton, TextField, styled } from "@mui/material";
import MuiButton from "@mui/material/Button";
import MuiTypography from "@mui/material/Typography";

export const Button = styled(MuiButton)(
  ({ textColor, onHoverBackgroundColor }) => ({
    color: textColor,
    "&:hover": {
      background: onHoverBackgroundColor,
    },
  })
);

export const CommentEngagement = styled(Box)({
  display: "flex",
  alignItems: "center",
  gap: "8px",
  marginTop: "4px",
});

export const CommentAuthorName = styled(MuiTypography)({
  textOverflow: "ellipsis",
  overflow: "hidden",
  whiteSpace: "nowrap",
  maxWidth: "200px",
});

export const CommentPublishTime = styled(MuiTypography)({
  textOverflow: "ellipsis",
  overflow: "hidden",
  whiteSpace: "nowrap",
  width: "200px",
  color: "gray",
});

export const CommentDetails = styled(MuiTypography)({
  flex: 1,
});

export const CommentMetadata = styled(Box)({
  display: "flex",
  gap: "8px",
  alignItems: "center",
});

export const CommentComponent = styled(Box)({
  display: "flex",
  gap: "12px",
});

export const CommentAuthorImage = styled("img")({
  height: "50px",
  borderRadius: "50%",
});

export const ReplyCommentForm = styled("form")({
  display: "flex",
});

export const ReadMoreCommentContent = styled(MuiTypography)(({ theme }) => ({
  padding: 0,
  color: theme.palette.primary.light,
  cursor: "pointer",
  "&: hover": {
    textDecoration: "underline",
  },
}));

export const CommentContentTypography = styled(MuiTypography)(
  ({ isExpanded }) => ({
    textWrap: "wrap",
    lineHeight: "20px",
    rowGap: 0,
    position: "relative",
    overflow: "hidden",
    display: "-webkit-box",
    WebkitLineClamp: 4,
    WebkitBoxOrient: "vertical",
    ...(isExpanded && {
      display: "block",
    }),
  })
);

export const CommentAuthorThumbnailSkeleton = styled(Skeleton)({
  minWidth: "50px",
});

export const ReplyTextField = styled(TextField)({
  flex: 1,
});
