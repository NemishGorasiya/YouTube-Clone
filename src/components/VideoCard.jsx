import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import {
  calcDistanceToNow,
  formatCompactNumber,
  isoDurationToDDHHMM,
} from "../utils/utilityFunction";
import VideoThumbnailFallbackImage from "../assets/video-placeholder.jpg";
import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  CardMediaWrapper,
  ChannelName,
  LiveTvStyledIcon,
  UpcomingIndicator,
  VideoDetail,
  VideoDurationBadge,
  VideoIsLiveIndicator,
  VideoMetadata,
  VideoMetadataTypography,
  VideoTitle,
} from "./VideoCardStyledComponents";
import ChannelThumbnail from "./ChannelThumbnail";

const VideoCard = ({ video, isListView = false }) => {
  const navigate = useNavigate();
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
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const navigateToChannelPage = (event) => {
    event.stopPropagation();
    navigate(`/channel/${channelId}`);
  };

  return (
    <Card elevation={0} className="videoCard" onClick={handleVideoCardClick}>
      <CardActionArea $isListView={isListView}>
        <CardMediaWrapper>
          <CardMedia
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
          {!isListView && <ChannelThumbnail channelId={channelId} />}
          <VideoDetail>
            <VideoTitle
              dangerouslySetInnerHTML={{
                __html: title,
              }}
            />

            <VideoMetadata>
              <ChannelName onClick={navigateToChannelPage}>
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
