import React from "react";
import {
  VideoDescriptionContainer,
  VideoFunctionButtonSkeletonWrapper,
  VideoMetadataSkeletonWrapper,
  VideoMetadataWrapper,
  VideoPlayerWrapper,
  VideoTitleSkeletonWrapper,
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
      <VideoTitleSkeletonWrapper>
        <Skeleton animation="wave" variant="text" width="50%" height={70} />
      </VideoTitleSkeletonWrapper>
      <VideoMetadataSkeletonWrapper>
        <Skeleton animation="wave" variant="text" width="40%" height={100} />
        <VideoFunctionButtonSkeletonWrapper>
          <Skeleton
            animation="wave"
            variant="circular"
            height={50}
            width={50}
          />
          <Skeleton
            animation="wave"
            variant="circular"
            height={50}
            width={50}
          />
          <Skeleton
            animation="wave"
            variant="circular"
            height={50}
            width={50}
          />
        </VideoFunctionButtonSkeletonWrapper>
      </VideoMetadataSkeletonWrapper>
      <Skeleton animation="wave" variant="rounded" height={120} width="100%" />
    </VideoPlayerWrapper>
  );
};

export default VideoPlayerSkeleton;
