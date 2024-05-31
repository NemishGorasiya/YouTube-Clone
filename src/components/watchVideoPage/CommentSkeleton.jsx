import { Skeleton, styled } from "@mui/material";
import {
  CommentComponent,
  CommentDetails,
  CommentEngagement,
  CommentMetadata,
} from "./CommentsStyledComponents";

const CommentAuthorThumbnailSkeleton = styled(Skeleton)(() => ({
  minWidth: "50px",
}));

const CommentSkeleton = () => {
  return (
    <CommentComponent>
      <CommentAuthorThumbnailSkeleton
        variant="circular"
        minWidth={50}
        height={50}
      />
      <CommentDetails>
        <CommentMetadata>
          <Skeleton variant="text" width="250px" />
        </CommentMetadata>
        <Skeleton variant="text" width="100%" />
        <CommentEngagement className="commentEngagement">
          <Skeleton variant="text" width="150px" />
        </CommentEngagement>
      </CommentDetails>
    </CommentComponent>
  );
};

export default CommentSkeleton;
