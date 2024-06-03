import { Box, Skeleton, styled } from "@mui/material";
import React from "react";

const PlaylistChecklistItemSkeletonComponent = styled(Box)(() => ({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  gap: 8,
  margin: "8px 0",
}));

const PlaylistChecklistLeftSkeleton = styled(Box)(() => ({
  display: "flex",
  alignItems: "center",
  gap: 8,
  flex: 1,
}));

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
