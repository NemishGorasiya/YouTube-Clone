import { useCallback, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Skeleton } from "@mui/material";
import { httpRequest } from "../services/services";
import {
	ChannelThumbnailWrapper,
	StyledChannelThumbnail,
} from "./ChannelThumbnailStyledComponents";

const ChannelThumbnail = ({ channelId }) => {
	const [channelThumbnail, setChannelThumbnail] = useState({
		url: "",
		isLoading: true,
	});
	const { url: thumbnailUrl, isLoading } = channelThumbnail;

	const getChannelDetails = useCallback(
		async ({ abortController }) => {
			const queryParams = {
				part: "snippet",
				id: channelId,
			};
			try {
				const res = await httpRequest({
					url: "/channels",
					queryParams,

					abortController,
				});
				if (res) {
					setChannelThumbnail({
						url: res?.items?.[0]?.snippet?.thumbnails?.high?.url || "",
						isLoading: false,
					});
				}
			} catch (error) {
				console.error(error);
			}
		},
		[channelId]
	);
	useEffect(() => {
		const abortController = new AbortController();
		getChannelDetails({ abortController });
		return () => {
			abortController.abort();
		};
	}, [getChannelDetails]);
	return (
		<>
			<ChannelThumbnailWrapper>
				{isLoading ? (
					<Skeleton
						animation="wave"
						variant="circular"
						width="100%"
						height="100%"
					/>
				) : (
					<StyledChannelThumbnail
						src={thumbnailUrl || "https://placehold.jp/150x150.png"}
						alt="Channel Thumbnail"
						referrerPolicy="no-referrer"
					/>
				)}
			</ChannelThumbnailWrapper>
		</>
	);
};

ChannelThumbnail.propTypes = {
	channelId: PropTypes.string,
};

export default ChannelThumbnail;
