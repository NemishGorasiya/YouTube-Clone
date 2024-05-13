import MuiBox from "@mui/material/Box";
import MuiCard from "@mui/material/Card";
import MuiCardContent from "@mui/material/CardContent";
import MuiCardMedia from "@mui/material/CardMedia";
import MuiTypography from "@mui/material/Typography";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import LiveTvIcon from "@mui/icons-material/LiveTv";
import MuiCardActionArea from "@mui/material/CardActionArea";
import Grid from "@mui/material/Grid";
import { styled } from "@mui/material/styles";
import { formatDistanceToNow } from "date-fns";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import { formatCompactNumber } from "../utils/utilityFunction";
import "./VideoCard.scss";
import { useCallback, useEffect, useState } from "react";
import { fetchChannelDetails } from "../services/services";
import useLocalStorage from "../hooks/useLocalStorage";

const Card = styled(MuiCard)(({ theme }) => ({
  background: theme.palette.background.default,
  color: theme.palette.primary.main,
}));

const CardMedia = styled(MuiCardMedia)(() => ({
  borderRadius: "14px",
  aspectRatio: "25/14",
  height: "auto",
}));

const CardContent = styled(MuiCardContent)(() => ({
  padding: "8px 0",
  display: "flex",
  gap: "8px",
}));
const ChannelThumbnail = styled("img")(() => ({
  height: "36px",
  width: "36px",
  borderRadius: "50%",
}));

const CardActionArea = styled(MuiCardActionArea)(({ isListView }) => ({
  ...(isListView
    ? {
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        placeItems: "start",
        gap: "8px",
      }
    : null),
}));

const VideoTitle = styled(MuiTypography)(() => ({
  lineHeight: "1.5",
  fontSize: "16px",
  fontWeight: "500",
  overflow: "hidden",
  textOverflow: "ellipsis",
  display: "-webkit-box",
  WebkitBoxOrient: "vertical",
  WebkitLineClamp: "2",
}));

const ChannelName = styled(MuiTypography)(() => ({
  display: "flex",
  alignItems: "center",
  fontSize: "14px",
}));
const VideoMetadata = styled(MuiBox)(({ theme }) => ({
  color: theme.palette.primary.light,
  fontSize: "14px",
}));
const VideoDetail = styled(MuiBox)(() => ({
  flex: 1,
  overflow: "hidden",
}));

const VideoCard = ({ video, isListView = false }) => {
  const navigate = useNavigate();
  const [channelThumbnail, setChannelThumbnail] = useState({
    url: "",
    isLoading: true,
  });

  const [user] = useLocalStorage("user", {});
  const { accessToken } = user;
  const { url: channelThumbnailUrl, isLoading: channelThumbnailIsLoading } =
    channelThumbnail;
  const { id, snippet, statistics: { viewCount } = {} } = video;
  const {
    publishedAt,
    title,
    channelTitle,
    channelId,
    thumbnails,
    liveBroadcastContent,
  } = snippet || {};
  const { high } = thumbnails || {};
  const { url } = high || {};

  const handleVideoCardClick = () => {
    console.log("first");
    navigate(`/watch?v=${id.videoId ?? id}`);
  };

  const navigateToChannelPage = (event) => {
    console.log("second");
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
        const res = await fetchChannelDetails({
          queryParams,
          accessToken,
          abortController,
        });
        if (res) {
          const { items } = res ?? {};
          const { snippet } = items[0] ?? {};
          const { thumbnails } = snippet ?? {};
          const { high } = thumbnails ?? {};
          const { url } = high ?? {};
          console.log(url);
          setChannelThumbnail({
            url: url,
            isLoading: false,
          });
        }
      } catch (error) {
        console.error(error);
      }
    },
    [accessToken, channelId]
  );

  // useEffect(() => {
  //   const abortController = new AbortController();
  //   getChannelDetails({ abortController: abortController });
  //   return () => {
  //     abortController.abort();
  //   };
  // }, [getChannelDetails]);
  return (
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
              // <ChannelThumbnail
              //   src={
              //     channelThumbnailUrl
              //       ? channelThumbnailUrl
              //       : "https://placehold.jp/150x150.png"
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
              <VideoTitle>{title}</VideoTitle>
              <VideoMetadata>
                <ChannelName onClick={navigateToChannelPage}>
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
