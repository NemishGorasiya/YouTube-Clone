import styledConfig from "../../utils/styledConfig";
import { Box } from "@mui/material";

export const PlaylistChecklistItemSkeletonComponent = styledConfig(Box)({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  gap: 8,
  margin: "8px 0",
});

export const PlaylistChecklistLeftSkeleton = styledConfig(Box)({
  display: "flex",
  alignItems: "center",
  gap: 8,
  flex: 1,
});
