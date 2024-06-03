import Grid from "@mui/material/Grid";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import {
	calcDistanceToNow,
	formatCompactNumber,
	isoDurationToDDHHMM,
} from "../utils/utilityFunction";
import { useCallback, useState } from "react";
import { httpRequest } from "../services/services";
import VideoThumbnailFallbackImage from "../assets/video-placeholder.jpg";
import {
	Card,
	CardActionArea,
	CardContent,
	CardMedia,
	CardMediaWrapper,
	ChannelName,
	ChannelThumbnail,
	CheckCircleStyledIcon,
	LiveTvStyledIcon,
	VideoDetail,
	VideoDurationBadge,
	VideoIsLiveIndicator,
	VideoMetadata,
	VideoTitle,
} from "./VideoCardStyledComponents";

const VideoCard = ({ video, isListView = false }) => {
	const navigate = useNavigate();
	const [channelThumbnail, setChannelThumbnail] = useState({
		url: "",
		isLoading: true,
	});

	const {
		url: channelThumbnailUrl,
		isLoading: channelThumbnailIsLoading,
	} = channelThumbnail;
	const { id, snippet, statistics: { viewCount } = {}, contentDetails } = video;
	const {
		publishedAt,
		title,
		channelTitle,
		channelId,
		thumbnails,
		resourceId: { videoId = "" } = {},
		liveBroadcastContent,
	} = snippet || {};
	const { high } = thumbnails || {};
	const { url } = high || {};

	const { duration = "" } = contentDetails || {};

	const handleVideoCardClick = () => {
		navigate(`/watch?v=${videoId || id.videoId || id}`);
	};

	const navigateToChannelPage = (event) => {
		event.stopPropagation();
		navigate(`/channel/${channelId}`);
	};

	const getChannelDetails = useCallback(
		async ({ abortController }) => {
			const queryParams = {
				part: "snippet",
				id: channelId,
			};
			try {
				const res = await httpRequest({
					url: "/channels",
					queryParams,

					abortController,
				});
				if (res) {
					const { items } = res ?? {};
					const { snippet } = items[0] ?? {};
					const { thumbnails } = snippet ?? {};
					const { high } = thumbnails ?? {};
					const { url } = high ?? {};
					setChannelThumbnail({
						url: url,
						isLoading: false,
					});
				}
			} catch (error) {
				console.error(error);
			}
		},
		[channelId]
	);

	// useEffect(() => {
	//   const abortController = new AbortController();
	//   getChannelDetails({ abortController: abortController });
	//   return () => {
	//     abortController.abort();
	//   };
	// }, [getChannelDetails]);

	return (
		<Card elevation={0} className="videoCard" onClick={handleVideoCardClick}>
			<CardActionArea isListView={isListView}>
				<CardMediaWrapper>
					<CardMedia
						isListView={isListView}
						component="img"
						image={url || VideoThumbnailFallbackImage}
						alt="Video Thumbnail"
					/>
					{duration && (
						<VideoDurationBadge>
							{isoDurationToDDHHMM(duration)}
						</VideoDurationBadge>
					)}
				</CardMediaWrapper>
				<CardContent>
					{!isListView && (
						// <ChannelThumbnail
						//   src={
						//     !channelThumbnailUrl || channelThumbnailIsLoading
						//       ? "https://placehold.jp/150x150.png"
						//       : channelThumbnailUrl
						//   }
						//   alt="Channel Thumbnail"
						//   referrerPolicy="no-referrer"
						// />
						<ChannelThumbnail
							src={"https://placehold.jp/150x150.png"}
							alt="Channel Thumbnail"
							referrerPolicy="no-referrer"
						/>
					)}

					<VideoDetail>
						<VideoTitle
							dangerouslySetInnerHTML={{
								__html: title,
							}}
						/>

						<VideoMetadata>
							<ChannelName onClick={navigateToChannelPage}>
								{" "}
								{channelTitle}
								<CheckCircleStyledIcon fontSize="x-small" />
							</ChannelName>

							{liveBroadcastContent === "live" ? (
								<VideoIsLiveIndicator>
									<LiveTvStyledIcon />
									LIVE
								</VideoIsLiveIndicator>
							) : (
								viewCount &&
								`${formatCompactNumber(viewCount || "")}${" views • "}`
							)}
							{calcDistanceToNow({ time: publishedAt })}
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
