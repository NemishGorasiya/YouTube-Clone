import { Box, styled } from "@mui/material";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import MuiTypography from "@mui/material/Typography";
import MuiBox from "@mui/material/Box";

export const ChannelPageComponent = styled(Box)({
  padding: "0 12px",
  width: "100%",
  maxWidth: "1280px",
  margin: "0 auto",
});

export const ChannelBannerWrapper = styled(Box)({
  width: "100%",
  borderRadius: "13px",
  display: "flex",
  aspectRatio: "569/94",
});

export const ChannelBanner = styled("img")({
  width: "100%",
  height: "100%",
  objectFit: "cover",
  borderRadius: "inherit",
});

export const KeyboardArrowRightStyledIcon = styled(KeyboardArrowRightIcon)(
  ({ theme }) => ({
    position: "absolute",
    top: 0,
    right: 0,
    height: "100%",
    background: theme.palette.background.default,
  })
);

export const ChannelDetailsWrapper = styled(MuiBox)(() => ({
  display: "flex",
  flexDirection: "column",
  gap: "12px",
}));

export const ChannelMetadataWrapper = styled(MuiBox)(() => ({
  display: "flex",
  margin: "16px 0",
  width: "100%",
  gap: "16px",
  "@media (max-width: 480px)": {
    flexDirection: "column",
  },
}));

export const ChannelThumbnailWrapper = styled(MuiBox)(({ theme }) => ({
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

export const ChannelThumbnail = styled("img")(() => ({
  height: "100%",
  width: "100%",
  objectFit: "cover",
  borderRadius: "inherit",
}));

export const Typography = styled(MuiTypography)(
  ({ channelTitle, channelDescription }) => ({
    ...(channelTitle
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
    ...(channelDescription && {
      position: "relative",
      cursor: "pointer",
    }),
    "@media (max-width: 480px)": {
      ...(channelTitle && {
        fontSize: "22px",
        fontWeight: 400,
      }),
    },
  })
);
