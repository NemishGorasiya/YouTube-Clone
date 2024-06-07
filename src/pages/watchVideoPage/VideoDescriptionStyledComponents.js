import styledConfig from "../../utils/styledConfig";
import { Typography } from "@mui/material";

export const VideoDescriptionComponent = styledConfig(Typography)(
  ({ $isExpanded }) => ({
    display: $isExpanded ? "block" : "-webkit-box",
    WebkitLineClamp: 2,
    WebkitBoxOrient: "vertical",
    overflow: "hidden",
    textOverflow: "ellipsis",
    position: "relative",
    textWrap: "wrap",
    wordBreak: "break-word",
  })
);

export const ToggleButton = styledConfig("span")(({ theme }) => ({
  position: "absolute",
  paddingLeft: "8px",
  cursor: "pointer",
  bottom: 0,
  right: 0,
  background: theme.palette.background.secondary,
}));
