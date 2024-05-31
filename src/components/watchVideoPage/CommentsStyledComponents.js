import { Box, styled } from "@mui/material";
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

export const CommentEngagement = styled(Box)(() => ({
  display: "flex",
  alignItems: "center",
  gap: "8px",
  marginTop: "4px",
}));

export const CommentAuthorName = styled(MuiTypography)(() => ({
  textOverflow: "ellipsis",
  overflow: "hidden",
  whiteSpace: "nowrap",
  maxWidth: "200px",
}));

export const CommentPublishTime = styled(MuiTypography)(() => ({
  textOverflow: "ellipsis",
  overflow: "hidden",
  whiteSpace: "nowrap",
  width: "200px",
  color: "gray",
}));

export const CommentDetails = styled(MuiTypography)(() => ({
  flex: 1,
}));

export const CommentMetadata = styled(Box)(() => ({
  display: "flex",
  gap: "8px",
  alignItems: "center",
}));

export const CommentComponent = styled(Box)(() => ({
  display: "flex",
  gap: "12px",
}));

export const CommentAuthorImage = styled("img")(() => ({
  height: "50px",
  borderRadius: "50%",
}));
