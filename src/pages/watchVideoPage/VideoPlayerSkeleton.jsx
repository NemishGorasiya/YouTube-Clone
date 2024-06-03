import React from "react";
import {
	VideoPlayerWrapper,
	YouTubeIframeWrapper,
} from "./WatchVideoPageStyledComponents";
import { Skeleton } from "@mui/material";

const VideoPlayerSkeleton = () => {
	return (
		<VideoPlayerWrapper>
			<YouTubeIframeWrapper>
				<Skeleton
					animation="wave"
					variant="rectangular"
					width="100%"
					height="100%"
				/>
			</YouTubeIframeWrapper>
			{/* {isLoading || isChannelDetailsLoading ? (
				<Loader />
			) : (
				<>
					<h2>{title}</h2>
					<VideoMetadataWrapper>
						<Stack direction="row" spacing={1.5} sx={{ alignItems: "center" }}>
							<ChannelLink to={`/channel/${channelId}`}>
								<Box
									component="img"
									sx={{
										height: 50,
										width: 50,
										borderRadius: "50%",
									}}
									alt="Channel Thumbnail"
									src={url}
									referrerPolicy="no-referrer"
								/>
								<Stack>
									<Typography
										variant="h6"
										color="text.secondary"
										sx={{ display: "flex", alignItems: "center" }}
									>
										{channelTitle}
										<CheckCircleIcon
											fontSize="x-small"
											sx={{ marginLeft: "5px" }}
										/>
									</Typography>
									<Typography variant="body1" color="text.secondary">
										{formatCompactNumber(subscriberCount)} subscribers
									</Typography>
								</Stack>
							</ChannelLink>
							<SubscribeButton channelId={channelId} />
						</Stack>
						<Stack direction="row" spacing={1.5}>
							<LikeDislike
								isLoggedIn={isLoggedIn}
								videoId={videoId}
								likeCount={likeCount}
								updateLikeCount={updateLikeCount}
							/>
							<UserActionButton variant="contained" disabled={!isLoggedIn}>
								<AddToPlaylist videoId={videoId} />
							</UserActionButton>
						</Stack>
					</VideoMetadataWrapper>
					<VideoDescriptionContainer>
						<Typography variant="body1">
							{formatCompactNumber(viewCount)} views{" "}
							{calcDistanceToNow({ time: publishedAt })}{" "}
							{tags && tags.map((tag) => <Tag key={tag}>#{tag} </Tag>)}
						</Typography>
						<VideoDescription description={description} />
					</VideoDescriptionContainer>
				</>
			)} */}
		</VideoPlayerWrapper>
	);
};

export default VideoPlayerSkeleton;
