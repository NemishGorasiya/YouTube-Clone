import { Box, Skeleton } from "@mui/material";
import {
  PlaylistCardComponent,
  PlaylistCardLayerSkeleton,
  PlaylistCardThumbnail,
  PlaylistMetadata,
} from "./PlaylistsStyledComponents";

const PlaylistCardSkeleton = () => {
  return (
    <PlaylistCardComponent item>
      <PlaylistCardThumbnail>
        <PlaylistCardLayerSkeleton
          animation="wave"
          variant="rectangular"
          width="100%"
          height="100%"
        />
      </PlaylistCardThumbnail>
      <Box>
        <PlaylistMetadata isTitle>
          <Skeleton animation="wave" variant="text" width="50%" />
        </PlaylistMetadata>
        <PlaylistMetadata>
          <Skeleton animation="wave" variant="text" width="20%" />
        </PlaylistMetadata>
        <PlaylistMetadata>
          <Skeleton animation="wave" variant="text" width="60%" />
        </PlaylistMetadata>
        <PlaylistMetadata>
          <Skeleton animation="wave" variant="text" width="40%" />
        </PlaylistMetadata>
      </Box>
    </PlaylistCardComponent>
  );
};

export default PlaylistCardSkeleton;
