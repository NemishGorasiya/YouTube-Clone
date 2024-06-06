import { Box, styled, Typography } from "@mui/material";
import MuiCheckCircleIcon from "@mui/icons-material/CheckCircle";

export const SubscribedChannelsPageComponent = styled(Box)({
  maxWidth: "1300px",
  margin: "0 auto",
  display: "flex",
  flexDirection: "column",
  gap: "20px",
});

export const ChannelName = styled(Typography)(({ theme }) => ({
  fontSize: "18px",
  lineHeight: "26px",
  marginBottom: "7px",
  display: "flex",
  alignItems: "center",
  color: theme.palette.primary.main,
}));

export const CheckCircleIcon = styled(MuiCheckCircleIcon)(({ theme }) => ({
  fontSize: "14px",
  marginLeft: "5px",
  color: theme.palette.primary.light,
}));

export const ChannelMetadataWrapper = styled(Box)({
  flex: "1",
  overflow: "hidden",
  textOverflow: "ellipsis",
});

export const ChannelCardComponent = styled(Box)(({ theme }) => ({
  display: "flex",
  gap: "100px",
  [theme.breakpoints.down("md")]: {
    gap: "24px",
  },
  "@media (max-width: 500px)": {
    gap: "12px",
  },
}));

export const ChannelThumbnailWrapper = styled(Box)(({ theme }) => ({
  height: "136px",
  width: "136px",
  minWidth: "136px",
  borderRadius: "50%",
  [theme.breakpoints.down("sm")]: {
    height: "75px",
    width: "75px",
    minWidth: "75px",
  },
  "@media (max-width: 500px)": {
    height: "45px",
    width: "45px",
    minWidth: "45px",
  },
}));
export const ChannelThumbnail = styled("img")({
  height: "100%",
  width: "100%",
  objectFit: "cover",
  borderRadius: "inherit",
});

export const ChannelMetadata = styled(Typography)(({ theme }) => ({
  color: theme.palette.primary.light,
  fontSize: "12px",
  lineHeight: "18px",
  fontWeight: "400",
  fontFamily: "Roboto,Arial,sans-serif",
  overflow: "hidden",
  textOverflow: "ellipsis",
  display: "-webkit-box",
  WebkitBoxOrient: "vertical",
  WebkitLineClamp: "2",
}));
