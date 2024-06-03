import { Box, styled } from "@mui/material";

export const TabsWrapper = styled(Box)(() => ({
  position: "relative",
  marginBottom: "16px",
}));

export const TabsList = styled("ul")(() => ({
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
}));

export const ChannelSectionTab = styled("li")({
  cursor: "pointer",
  padding: "8px 4px",
});

export const VideoGalleryWrapper = styled(Box)({
  margin: "8px 0",
});
