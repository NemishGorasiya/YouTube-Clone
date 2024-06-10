import styledConfig from "../../utils/styledConfig";
import { Box, Skeleton } from "@mui/material";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import MuiTypography from "@mui/material/Typography";

export const ChannelPageComponent = styledConfig(Box)({
  padding: "0 12px",
  width: "100%",
  maxWidth: "1280px",
  margin: "0 auto",
});

export const ChannelBannerWrapper = styledConfig(Box)({
  width: "100%",
  borderRadius: "13px",
  display: "flex",
  aspectRatio: "569/94",
});

export const ChannelBanner = styledConfig("img")({
  width: "100%",
  height: "100%",
  objectFit: "cover",
  borderRadius: "inherit",
});

export const KeyboardArrowRightStyledIcon = styledConfig(
  KeyboardArrowRightIcon
)(({ theme }) => ({
  position: "absolute",
  top: 0,
  right: 0,
  height: "100%",
  background: theme.palette.background.default,
}));

export const ChannelDetailsWrapper = styledConfig(Box)({
  display: "flex",
  flexDirection: "column",
  gap: "12px",
});

export const ChannelMetadataWrapper = styledConfig(Box)({
  display: "flex",
  margin: "16px 0",
  width: "100%",
  gap: "16px",
  "@media (max-width: 480px)": {
    flexDirection: "column",
  },
});

export const ChannelThumbnailWrapper = styledConfig(Box)(({ theme }) => ({
  height: "160px",
  width: "160px",
  minWidth: "160px",
  minHeight: "160px",
  borderRadius: "50%",
  [theme.breakpoints.down("md")]: {
    height: "60px",
    width: "60px",
    minWidth: "60px",
    minHeight: "60px",
  },
}));

export const ChannelThumbnail = styledConfig("img")({
  height: "100%",
  width: "100%",
  objectFit: "cover",
  borderRadius: "inherit",
});

export const ChannelBannerSkeleton = styledConfig(Skeleton)({
  borderRadius: "inherit",
});

export const Typography = styledConfig(MuiTypography)(
  ({ $channelTitle, $channelDescription }) => ({
    ...($channelTitle
      ? {
          fontWeight: 500,
        }
      : {
          color: "#AAAAAA",
          overflow: "hidden",
          display: "-webkit-box",
          WebkitBoxOrient: "vertical",
          WebkitLineClamp: 1,
        }),
    ...($channelDescription && {
      position: "relative",
      cursor: "pointer",
    }),
    "@media (max-width: 480px)": {
      ...($channelTitle && {
        fontSize: "22px",
        fontWeight: 400,
      }),
    },
  })
);
