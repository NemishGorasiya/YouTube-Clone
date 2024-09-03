import { Skeleton } from "@mui/material";
import { PlaylistSidebarSkeletonWrapper } from "./PlaylistPageStyledComponents";

const PlaylistSidebarSkeleton = () => {
	return (
		<PlaylistSidebarSkeletonWrapper>
			<Skeleton
				animation="wave"
				variant="rectangular"
				width="100%"
				height="100%"
			/>
		</PlaylistSidebarSkeletonWrapper>
	);
};

export default PlaylistSidebarSkeleton;
