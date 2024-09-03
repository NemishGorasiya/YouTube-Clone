import { Skeleton } from "@mui/material";
import {
  PlaylistChecklistItemSkeletonComponent,
  PlaylistChecklistLeftSkeleton,
} from "./PlaylistChecklistItemSkeletonStyledComponents";

const PlaylistChecklistItemSkeleton = () => {
  return (
    <PlaylistChecklistItemSkeletonComponent>
      <PlaylistChecklistLeftSkeleton>
        <Skeleton animation="wave" variant="rounded" height={20} width={20} />
        <Skeleton animation="wave" variant="text" width="70%" />
      </PlaylistChecklistLeftSkeleton>
      <Skeleton animation="wave" variant="circular" height={25} width={25} />
    </PlaylistChecklistItemSkeletonComponent>
  );
};

export default PlaylistChecklistItemSkeleton;
