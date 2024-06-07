import styledConfig from "../../utils/styledConfig";
import { Box, TextField } from "@mui/material";
import MuiTypography from "@mui/material/Typography";

export const AddCommentForm = styledConfig("form")({
  display: "flex",
  width: "100%",
});

export const Typography = styledConfig(MuiTypography)({
  textAlign: "center",
  margin: "24px auto",
});

export const KnowMoreLink = styledConfig("a")({
  color: "#3EA6FF",
});

export const CommentsSectionComponent = styledConfig(Box)({
  display: "flex",
  flexDirection: "column",
  gap: "20px",
  paddingTop: "16px",
});

export const AddComment = styledConfig(Box)({
  display: "flex",
  gap: "12px",
});

export const MyProfileImage = styledConfig("img")({
  height: "50px",
  borderRadius: "50%",
});

export const AddCommentTextField = styledConfig(TextField)({
  flex: "1",
});
