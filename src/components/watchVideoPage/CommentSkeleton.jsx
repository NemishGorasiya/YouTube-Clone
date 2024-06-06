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
