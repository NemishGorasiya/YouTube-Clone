import { Box, styled } from "@mui/material";
import MuiDivider from "@mui/material/Divider";
import MuiTypography from "@mui/material/Typography";
import MuiButton from "@mui/material/Button";
import { Link } from "react-router-dom";

export const VideoPageContainer = styled(Box)({
	display: "flex",
	gap: "12px",
	"@media (max-width: 1200px)": {
		flexDirection: "column",
	},
});

export const VideoPageLeftSection = styled(Box)({
	flex: 3,
});

export const RelatedVideosWrapper = styled(Box)({
	flex: 1,
	gap: "12px",
	display: "flex",
	flexDirection: "column",
});

export const RelatedVideosContainer = styled(Box)({
	display: "flex",
	flexDirection: "column",
	gap: "8px",
});

export const VideoPlayerWrapper = styled(Box)({
	display: "flex",
	flexDirection: "column",
	gap: "8px",
});

export const VideoMetadataSkeletonWrapper = styled(Box)({
	display: "flex",
	justifyContent: "space-between",
});

export const VideoFunctionButtonSkeletonWrapper = styled(Box)({
	display: "flex",
	alignItems: "center",
	gap: "8px",
});

export const YouTubeIframeWrapper = styled(Box)({
	width: "100%",
	height: "auto",
	aspectRatio: "16/9",
});

export const VideoTitleSkeletonWrapper = styled(Box)({
	height: "50px",
});

export const YouTubeIframe = styled("iframe")({
	width: "100%",
	height: "100%",
	border: "none",
});

export const Divider = styled(MuiDivider)(({ theme }) => ({
	background: theme.palette.primary.main,
}));

export const ChannelLink = styled(Link)({
	display: "flex",
	gap: "8px",
});

export const VideoMetadataWrapper = styled(Box)(({ theme }) => ({
	display: "flex",
	justifyContent: "space-between",
	alignItems: "center",
	padding: "0 12px",
	flexWrap: "wrap",
	[theme.breakpoints.down("md")]: {
		flexDirection: "column",
		alignItems: "start  ",
	},
}));

export const Tag = styled(MuiTypography)({
	display: "inline-block",
	marginRight: "4px",
	color: "#3EA6FF",
});

export const UserActionButton = styled(MuiButton)(({ theme }) => ({
	background: theme.palette.secondaryBackground.default,
	color: theme.palette.primary.main,
	"&:hover": {
		background: theme.palette.secondaryBackground.light,
	},
}));

export const PlaylistPanelWrapper = styled(Box)(({ theme }) => ({
	maxHeight: "500px",
	background: theme.palette.background.light,
	padding: 3,
	borderRadius: "12px",
}));

export const VideoDescriptionContainer = styled(Box)(({ theme }) => ({
	background: theme.palette.background.secondary,
	borderRadius: "8px",
	padding: "12px",
	scrollMargin: "60px",
}));
