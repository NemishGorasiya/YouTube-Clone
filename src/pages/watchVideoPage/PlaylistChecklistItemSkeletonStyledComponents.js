import { Box, styled } from "@mui/material";

export const PlaylistChecklistItemSkeletonComponent = styled(Box)(() => ({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  gap: 8,
  margin: "8px 0",
}));

export const PlaylistChecklistLeftSkeleton = styled(Box)(() => ({
  display: "flex",
  alignItems: "center",
  gap: 8,
  flex: 1,
}));
