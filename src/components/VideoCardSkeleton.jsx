import { Grid, Skeleton, styled } from "@mui/material";
import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  CardMediaWrapper,
  VideoDetail,
  VideoMetadata,
  VideoTitle,
} from "./VideoCardStyledComponents";

const VideoThumbnailSkeleton = styled(Skeleton)(() => ({
  borderRadius: "inherit",
}));

const VideoCardSkeleton = ({ isListView }) => {
  return (
    <Grid item>
      <Card elevation={0}>
        <CardActionArea isListView={isListView}>
          <CardMediaWrapper>
            <CardMedia isListView={isListView}>
              <VideoThumbnailSkeleton
                variant="rectangular"
                width="100%"
                height="100%"
              />
            </CardMedia>
          </CardMediaWrapper>
          <CardContent>
            {!isListView && (
              <Skeleton variant="circular" width={36} height={36} />
            )}
            <VideoDetail>
              <VideoTitle>
                <Skeleton variant="text" width="80%" />
              </VideoTitle>
              <VideoMetadata>
                <Skeleton variant="text" width="60%" />
                <Skeleton variant="text" width="40%" />
              </VideoMetadata>
            </VideoDetail>
          </CardContent>
        </CardActionArea>
      </Card>
    </Grid>
  );
};

export default VideoCardSkeleton;
