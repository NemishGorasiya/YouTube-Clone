import styledConfig from "../../utils/styledConfig";
import { Link } from "react-router-dom";
import { Box, Skeleton } from "@mui/material";
import MuiDivider from "@mui/material/Divider";
import MuiTypography from "@mui/material/Typography";
import MuiButton from "@mui/material/Button";

export const VideoPageContainer = styledConfig(Box)({
	display: "flex",
	gap: "12px",
	"@media (max-width: 1200px)": {
		flexDirection: "column",
	},
});

export const VideoPageLeftSection = styledConfig(Box)({
	flex: 3,
});

export const RelatedVideosWrapper = styledConfig(Box)({
	flex: 1,
	gap: "12px",
	display: "flex",
	flexDirection: "column",
});

export const RelatedVideosContainer = styledConfig(Box)({
	display: "flex",
	flexDirection: "column",
	gap: "8px",
});

export const VideoPlayerWrapper = styledConfig(Box)({
	display: "flex",
	flexDirection: "column",
	gap: "8px",
});

export const ChannelDetailsWrapper = styledConfig(Box)({
	display: "flex",
	gap: "12px",
	alignItems: "center",
});

export const ChannelTitleTypography = styledConfig(MuiTypography)({
	display: "flex",
	alignItems: "center",
	fontSize: "18px",
});

export const SubscriberCountTypography = styledConfig(MuiTypography)({
	fontSize: "15px",
});

export const ChannelThumbnail = styledConfig("img")({
	height: 50,
	width: 50,
	borderRadius: "50%",
});

export const CommentSectionSkeleton = styledConfig(Skeleton)({
	margin: "24px 0",
	transform: "scale(1)",
});

export const VideoMetadataSkeletonWrapper = styledConfig(Box)({
	display: "flex",
	justifyContent: "space-between",
});

export const VideoFunctionButtonSkeletonWrapper = styledConfig(Box)({
	display: "flex",
	alignItems: "center",
	gap: "8px",
});

export const YouTubeIframeWrapper = styledConfig(Box)({
	width: "100%",
	height: "auto",
	aspectRatio: "16/9",
});

export const VideoTitleSkeletonWrapper = styledConfig(Box)({
	height: "50px",
});

export const VideoTitle = styledConfig(MuiTypography)({
	overflow: "hidden",
	textOverflow: "ellipsis",
	display: "-webkit-box",
	WebkitLineClamp: 2,
	WebkitBoxOrient: "vertical",
	fontWeight: 700,
});

export const YouTubeIframe = styledConfig("iframe")({
	width: "100%",
	height: "100%",
	border: "none",
});

export const Divider = styledConfig(MuiDivider)(({ theme }) => ({
	background: theme.palette.primary.main,
}));

export const ChannelLink = styledConfig(Link)({
	display: "flex",
	gap: "8px",
});

export const VideoMetadataWrapper = styledConfig(Box)(({ theme }) => ({
	display: "flex",
	justifyContent: "space-between",
	alignItems: "center",
	padding: "0 12px",
	flexWrap: "wrap",
	[theme.breakpoints.down("md")]: {
		flexDirection: "column",
		alignItems: "start  ",
		gap: "8px",
	},
}));

export const Tag = styledConfig(MuiTypography)({
	display: "inline-block",
	marginRight: "4px",
	color: "#3EA6FF",
});

export const UserActionButton = styledConfig(MuiButton)(({ theme }) => ({
	background: theme.palette.secondaryBackground.default,
	color: theme.palette.primary.main,
	"&:hover": {
		background: theme.palette.secondaryBackground.light,
	},
}));

export const PlaylistPanelWrapper = styledConfig(Box)(({ theme }) => ({
	maxHeight: "500px",
	background: theme.palette.background.light,
	padding: 3,
	borderRadius: "12px",
	overflow: "auto",
	"&::-webkit-scrollbar-track": {
		boxShadow: "inset 0 0 6px rgba(0,0,0,0.3)",
		borderRadius: "12px",
	},
	"&::-webkit-scrollbar": {
		width: "12px",
	},
	"&::-webkit-scrollbar-thumb": {
		borderRadius: "10px",
		boxShadow: "inset 0 0 6px rgba(0,0,0,0.3)",
		backgroundColor: "#555",
	},
	[theme.breakpoints.down("lg")]: {
		maxWidth: "768px",
		margin: "0 auto",
		minWidth: "100%",
	},
}));

export const VideoDescriptionContainer = styledConfig(Box)(({ theme }) => ({
	background: theme.palette.background.secondary,
	borderRadius: "8px",
	padding: "12px",
	scrollMargin: "60px",
}));
