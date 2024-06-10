import { Skeleton } from "@mui/material";
import {
  CommentAuthorThumbnailSkeleton,
  CommentComponent,
  CommentDetails,
  CommentEngagement,
  CommentMetadata,
} from "./CommentsStyledComponents";

const CommentSkeleton = () => {
  return (
    <CommentComponent>
      <CommentAuthorThumbnailSkeleton
        animation="wave"
        variant="circular"
        width={50}
        height={50}
      />
      <CommentDetails>
        <CommentMetadata>
          <Skeleton animation="wave" variant="text" width="250px" />
        </CommentMetadata>
        <Skeleton animation="wave" variant="text" width="100%" />
        <CommentEngagement className="commentEngagement">
          <Skeleton animation="wave" variant="text" width="150px" />
        </CommentEngagement>
      </CommentDetails>
    </CommentComponent>
  );
};

export default CommentSkeleton;
