import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import {
	calcDistanceToNow,
	formatCompactNumber,
} from "../utils/utilityFunction";
import VideoThumbnailFallbackImage from "../assets/video-placeholder.jpg";
import {
	Card,
	CardActionArea,
	CardContent,
	ChannelName,
	LiveTvStyledIcon,
	UpcomingIndicator,
	VideoDetail,
	VideoIsLiveIndicator,
	VideoMetadata,
	VideoMetadataTypography,
	VideoTitle,
} from "./VideoCardStyledComponents";
import ChannelThumbnail from "./ChannelThumbnail";
import CardThumbnail from "./CardThumbnail";

const VideoCard = ({ video, isListView = false }) => {
	const navigate = useNavigate();
	const {
		id,
		snippet: {
			publishedAt,
			title,
			channelTitle,
			channelId,
			thumbnails: { high: { url = "" } = {} } = {},
			resourceId: { videoId = "" } = {},
			liveBroadcastContent,
		},
		statistics: { viewCount = "" } = {},
		contentDetails: { duration = "" } = {},
	} = video;

	const videoKey = videoId || id.videoId || id;

	const navigateToVideo = () => {
		navigate(`/watch?v=${videoKey}`);
		window.scrollTo({
			top: 0,
			behavior: "smooth",
		});
	};

	const navigateToChannel = (event) => {
		event.stopPropagation();
		navigate(`/channel/${channelId}`);
	};

	return (
		<Card elevation={0} className="videoCard" onClick={navigateToVideo}>
			<CardActionArea $isListView={isListView}>
				<CardThumbnail
					id={videoKey}
					thumbnailUrl={url || VideoThumbnailFallbackImage}
					duration={duration}
				/>
				<CardContent>
					{!isListView && <ChannelThumbnail channelId={channelId} />}
					<VideoDetail>
						<VideoTitle
							dangerouslySetInnerHTML={{
								__html: title,
							}}
						/>

						<VideoMetadata>
							<ChannelName onClick={navigateToChannel}>
								{channelTitle}
							</ChannelName>
							<VideoMetadataTypography>
								{liveBroadcastContent === "live" ? (
									<VideoIsLiveIndicator>
										<LiveTvStyledIcon />
										LIVE
									</VideoIsLiveIndicator>
								) : liveBroadcastContent === "upcoming" ? (
									<UpcomingIndicator>Upcoming</UpcomingIndicator>
								) : (
									viewCount &&
									`${formatCompactNumber(viewCount || "")}${" views • "}`
								)}
								{calcDistanceToNow({ time: publishedAt })}
							</VideoMetadataTypography>
						</VideoMetadata>
					</VideoDetail>
				</CardContent>
			</CardActionArea>
		</Card>
	);
};

VideoCard.propTypes = {
	video: PropTypes.object,
	isListView: PropTypes.bool,
};

export default VideoCard;
