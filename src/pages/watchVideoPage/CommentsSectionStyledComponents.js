import { styled } from "@mui/material";
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
