import styledConfig from "../../utils/styledConfig";
import { Box } from "@mui/material";
import MuiDivider from "@mui/material/Divider";

export const TabsWrapper = styledConfig(Box)({
  position: "relative",
  marginBottom: "16px",
});

export const TabsList = styledConfig("ul")({
  display: "flex",
  listStyle: "none",
  gap: "8px",
  position: "relative",
  "&:after": {
    content: `""`,
    position: "absolute",
    height: "1px",
    width: "100%",
    background: "grey",
    bottom: 0,
  },
});

export const ChannelSectionTab = styledConfig("li")(({ theme, $isActive }) => ({
  cursor: "pointer",
  padding: "8px 4px",
  position: "relative",
  color: theme.palette.primary.light,

  ...($isActive && {
    color: theme.palette.primary.main,

    "&:after": {
      content: `""`,
      position: "absolute",
      height: "4px",
      bottom: 0,
      left: 0,
      width: "100%",
      background: theme.palette.primary.main,
      display: "block",
    },
  }),
}));

export const VideoGalleryWrapper = styledConfig(Box)({
  margin: "8px 0",
});

export const ContentWrapper = styledConfig(Box)({
  display: "flex",
  flexDirection: "column",
  gap: "8px",
});

export const Divider = styledConfig(MuiDivider)({
  borderBottomWidth: "1px",
  background: "grey",
});
