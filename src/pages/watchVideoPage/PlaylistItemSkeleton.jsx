import { Skeleton } from "@mui/material";
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
            animation="wave"
            variant="rounded"
            width="100%"
            height="100%"
          />
        </VideoImageWrapper>
        <VideoTitleWrapper>
          <Skeleton animation="wave" variant="text" width="100%" />
          <Skeleton animation="wave" variant="text" width="30%" />
        </VideoTitleWrapper>
      </PlaylistContent>
    </PlaylistItemComponent>
  );
};

export default PlaylistItemSkeleton;
