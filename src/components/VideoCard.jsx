import MuiCard from "@mui/material/Card";
// import Card from "@mui/material/Card";
// import CardContent from "@mui/material/CardContent";
import MuiCardContent from "@mui/material/CardContent";
// import CardMedia from "@mui/material/CardMedia";
import MuiCardMedia from "@mui/material/CardMedia";
import Box from "@mui/material/Box";
import MuiBox from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import MuiTypography from "@mui/material/Typography";
// import { CardActionArea } from "@mui/material";
import MuiCardActionArea from "@mui/material/CardActionArea";
import Grid from "@mui/material/Grid";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { formatDistanceToNow } from "date-fns";
import { formatCompactNumber } from "../utils/utilityFunction";
import PropTypes from "prop-types";
import { styled } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import "./VideoCard.scss";
import LiveTvIcon from "@mui/icons-material/LiveTv";

const Card = styled(MuiCard)(({ theme }) => ({
	background: theme.palette.background.default,
	color: theme.palette.primary.main,
}));

const CardMedia = styled(MuiCardMedia)(({ theme, isListView }) => ({
	borderRadius: "14px",
	aspectRatio: "25/14",
	height: "auto",
	...(isListView ? {} : null),
}));

const CardContent = styled(MuiCardContent)(({ theme, isListView }) => ({
	padding: "8px 0",
	display: "flex",
	gap: "8px",
}));
const ChannelThumbnail = styled("img")(() => ({
	height: "36px",
	width: "36px",
	borderRadius: "50%",
}));

const CardActionArea = styled(MuiCardActionArea)(({ theme, isListView }) => ({
	...(isListView
		? {
				display: "grid",
				gridTemplateColumns: "1fr 1fr",
				placeItems: "start",
				gap: "8px",
		  }
		: null),
}));

const VideoTitle = styled(MuiTypography)(({ theme, isListView }) => ({
	lineHeight: "1.5",
	fontSize: "16px",
	fontWeight: "500",
	overflow: "hidden",
	textOverflow: "ellipsis",
	display: "-webkit-box",
	WebkitBoxOrient: "vertical",
	WebkitLineClamp: "2",
	// flex: 1,
}));

const ChannelName = styled(MuiTypography)(({ theme }) => ({
	display: "flex",
	alignItems: "center",
	fontSize: "14px",
}));
const VideoMetadata = styled(MuiBox)(({ theme }) => ({
	color: theme.palette.primary.light,
	fontSize: "14px",
}));
const VideoDetail = styled(MuiBox)(({ theme }) => ({
	flex: 1,
	overflow: "hidden",
}));

const VideoCard = ({ video, isListView = false }) => {
	const navigate = useNavigate();
	const { id, snippet, statistics: { viewCount } = {}, isLoading } = video;
	console.log("isLoading", isLoading);
	const {
		publishedAt,
		title,
		channelTitle,
		thumbnails: {
			medium: { url },
		},
		liveBroadcastContent,
	} = snippet || {};

	const handleVideoCardClick = () => {
		navigate(`/watch?v=${id.videoId ?? id}`);
	};

	return isLoading ? (
		<h1>Loading...</h1>
	) : (
		<Grid item onClick={handleVideoCardClick}>
			<Card elevation={0} className="videoCard">
				<CardActionArea isListView={isListView}>
					<CardMedia
						isListView={isListView}
						component="img"
						image={url}
						alt="Video Thumbnail"
					/>
					<CardContent>
						{!isListView && (
							<ChannelThumbnail
								src="https://placehold.jp/150x150.png"
								alt="Channel Thumbnail"
							/>
						)}

						<VideoDetail>
							<VideoTitle>{title}</VideoTitle>
							<VideoMetadata>
								<ChannelName>
									{" "}
									{channelTitle}
									<CheckCircleIcon
										fontSize="x-small"
										sx={{ marginLeft: "5px" }}
									/>
								</ChannelName>
								{liveBroadcastContent === "live" ? (
									<span className="live">
										<LiveTvIcon />
										LIVE
									</span>
								) : (
									`${formatCompactNumber(viewCount || "")}${" views "}`
								)}
								{" • "}
								{formatDistanceToNow(publishedAt, { addSuffix: true })}
							</VideoMetadata>
						</VideoDetail>
					</CardContent>
				</CardActionArea>
			</Card>
		</Grid>
	);
};

VideoCard.propTypes = {
	video: PropTypes.object,
	isListView: PropTypes.bool,
};

export default VideoCard;
