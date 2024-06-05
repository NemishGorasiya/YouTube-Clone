import { Box, Skeleton } from "@mui/material";
import {
  PlaylistContent,
  PlaylistItemComponent,
  VideoImageWrapper,
  VideoThumbnailSkeleton,
  VideoTitleWrapper,
} from "./PlaylistItemStyledComponents";

const PlaylistItemSkeleton = () => {
  return (
    <PlaylistItemComponent>
      <PlaylistContent>
        <VideoImageWrapper>
          <VideoThumbnailSkeleton
            variant="rounded"
            width="100%"
            height="100%"
          />
        </VideoImageWrapper>
        <VideoTitleWrapper>
          <Skeleton variant="text" width="100%" />
          <Skeleton variant="text" width="30%" />
        </VideoTitleWrapper>
      </PlaylistContent>
    </PlaylistItemComponent>
  );
};

export default PlaylistItemSkeleton;
