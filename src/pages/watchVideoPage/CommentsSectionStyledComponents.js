import { Box, styled } from "@mui/material";
import MuiTypography from "@mui/material/Typography";

export const AddCommentForm = styled("form")({
  display: "flex",
  width: "100%",
});

export const Typography = styled(MuiTypography)(() => ({
  textAlign: "center",
  margin: "24px auto",
}));

export const KnowMoreLink = styled("a")(() => ({
  color: "#3EA6FF",
}));

export const CommentsSectionComponent = styled(Box)(() => ({
  display: "flex",
  flexDirection: "column",
  gap: "20px",
}));

export const AddComment = styled(Box)(() => ({
  display: "flex",
  gap: "12px",
}));

export const MyProfileImage = styled("img")(() => ({
  height: "50px",
  borderRadius: "50%",
}));
