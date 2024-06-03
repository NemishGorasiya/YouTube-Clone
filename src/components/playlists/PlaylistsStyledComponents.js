import { Skeleton, styled } from "@mui/material";
import MuiGrid from "@mui/material/Grid";
import MuiBox from "@mui/material/Box";
import MuiTypography from "@mui/material/Typography";

export const PlaylistGrid = styled(MuiGrid)(() => ({
  display: "grid",
  gap: "16px",
  rowGap: "16px",
  gridTemplateColumns: "repeat(auto-fill, minmax(230px, 1fr))",
  paddingTop: "15px",
}));

export const VideoCountBadge = styled(MuiBox)(() => ({
  position: "absolute",
  bottom: "3px",
  right: "3px",
  display: "flex",
  alignItems: "center",
  fontSize: "12px",
  background: "#000",
  padding: "1px 4px",
  borderRadius: "4px",
  color: "#fff",
}));

export const PlaylistCardThumbnail = styled(MuiBox)(({ theme }) => ({
  display: "flex",
  aspectRatio: "16/9",
  borderRadius: "8px",
  position: "relative",
  zIndex: "1",
  outline: `1px solid ${theme.palette.background.default}`,
}));

export const PlaylistMetadata = styled(MuiTypography)(({ theme, isTitle }) => ({
  fontSize: "13px",
  lineHeight: "18px",
  fontFamily: "Roboto, Arial, sans-serif",
  color: theme.palette.primary.light,
  ...(isTitle
    ? { color: theme.palette.primary.main, fontSize: "15px", fontWeight: 600 }
    : {}),
}));

export const PlaylistCardStackLayer = styled(MuiBox)(({ theme, layer }) => ({
  position: "absolute",
  height: "98%",
  left: "50%",
  transform: "translateX(-50%)",
  borderRadius: "10px",
  ...(layer === 1
    ? {
        background: "#868686",
        outline: `1px solid ${theme.palette.background.default}`,
        width: "93%",
        zIndex: "-1",
        top: "-5px",
      }
    : layer === 2
    ? {
        width: "85%",
        height: "95%",
        background: "rgb(96, 96, 96)",
        top: "-10px",
        zIndex: "-2",
      }
    : {}),
}));

export const PlaylistCardComponent = styled(MuiGrid)(() => ({
  gap: "10px",
  display: "grid",
  cursor: "pointer",
}));

export const PlaylistCardLayerSkeleton = styled(Skeleton)(() => ({
  borderRadius: "inherit",
}));
