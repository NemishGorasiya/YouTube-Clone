import { Box, Skeleton, styled } from "@mui/material";
import {
  PlaylistContent,
  PlaylistItemComponent,
  VideoImageWrapper,
} from "./PlaylistItemStyledComponents";

const VideoThumbnailSkeleton = styled(Skeleton)(() => ({
  borderRadius: "inherit",
}));

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
        <Box sx={{ flex: 1 }}>
          <Skeleton variant="text" width="100%" />
          <Skeleton variant="text" width="30%" />
        </Box>
      </PlaylistContent>
    </PlaylistItemComponent>
  );
};

export default PlaylistItemSkeleton;
