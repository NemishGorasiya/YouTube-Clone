import styledConfig from "../../utils/styledConfig";
import { Skeleton } from "@mui/material";
import MuiBox from "@mui/material/Box";
import MuiGrid from "@mui/material/Grid";
import MuiTypography from "@mui/material/Typography";
import PlaylistPlayIcon from "@mui/icons-material/PlaylistPlay";

export const VideoCountBadge = styledConfig(MuiBox)({
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
});

export const PlaylistCardThumbnailWrapper = styledConfig(MuiBox)(
  ({ theme }) => ({
    display: "flex",
    aspectRatio: "16/9",
    borderRadius: "8px",
    position: "relative",
    zIndex: "1",
    outline: `1px solid ${theme.palette.background.default}`,
  })
);

export const PlaylistPlayStyledIcon = styledConfig(PlaylistPlayIcon)({
  fontSize: "18px",
});

export const PlaylistCardThumbnail = styledConfig("img")({
  width: "100%",
  height: "100%",
  objectFit: "cover",
  borderRadius: "inherit",
});

export const PlaylistMetadata = styledConfig(MuiTypography)(
  ({ theme, $isTitle }) => ({
    fontSize: "13px",
    lineHeight: "18px",
    fontFamily: "Roboto, Arial, sans-serif",
    color: theme.palette.primary.light,
    ...($isTitle && {
      color: theme.palette.primary.main,
      fontSize: "15px",
      fontWeight: 600,
    }),
  })
);

export const PlaylistCardStackLayer = styledConfig(MuiBox)(
  ({ theme, $layer }) => ({
    position: "absolute",
    height: "90%",
    left: "50%",
    transform: "translateX(-50%)",
    borderRadius: "inherit",
    ...($layer === 1
      ? {
          background: "#868686",
          outline: `1px solid ${theme.palette.background.default}`,
          width: "93%",
          zIndex: "-1",
          top: "-5px",
        }
      : $layer === 2
      ? {
          width: "85%",
          background: "rgb(96, 96, 96)",
          top: "-9px",
          zIndex: "-2",
        }
      : {}),
  })
);

export const PlaylistCardComponent = styledConfig(MuiGrid)({
  gap: "10px",
  display: "grid",
  cursor: "pointer",
});

export const PlaylistGrid = styledConfig(MuiGrid)({
  display: "grid",
  gap: "16px",
  rowGap: "16px",
  gridTemplateColumns: "repeat(auto-fill, minmax(230px, 1fr))",
  paddingTop: "15px",
});

export const PlaylistCardThumbnailSkeleton = styledConfig(Skeleton)({
  borderRadius: "inherit",
});
