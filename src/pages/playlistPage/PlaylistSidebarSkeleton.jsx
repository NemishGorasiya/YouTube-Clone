import { Skeleton, styled } from "@mui/material";
import { PlaylistSidebar } from "./PlaylistPageStyledComponents";

const PlaylistSidebarSkeletonWrapper = styled(PlaylistSidebar)(() => ({
  padding: 0,
}));

const PlaylistSidebarSkeleton = () => {
  return (
    <PlaylistSidebarSkeletonWrapper>
      <Skeleton variant="rectangular" width="100%" height="100%" />
    </PlaylistSidebarSkeletonWrapper>
  );
};

export default PlaylistSidebarSkeleton;
