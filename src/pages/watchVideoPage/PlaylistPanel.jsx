import PropTypes from "prop-types";
import { useCallback, useEffect, useState } from "react";
import InfiniteScroll from "../../components/InfiniteScroll";
import { httpRequest } from "../../services/services";
import PlaylistItem from "./PlaylistItem";
import PlaylistItemSkeleton from "./PlaylistItemSkeleton";
import {
	PlaylistPanelComponent,
	PlaylistPanelTitle,
} from "./PlaylistPanelStyledComponents";

const PlaylistPanel = ({ playlistId, playlistName }) => {
	const [playlist, setPlaylist] = useState({
		list: [],
		isLoading: true,
		nextPageToken: "",
	});

	const { list, isLoading, nextPageToken } = playlist;

	const getPlaylistItems = useCallback(
		async ({ nextPageToken, abortController } = {}) => {
			setPlaylist((prevChannels) => ({
				...prevChannels,
				isLoading: true,
			}));
			const queryParams = {
				part: "snippet",
				playlistId,
				pageToken: nextPageToken,
			};
			try {
				const res = await httpRequest({
					url: "/playlistItems",
					queryParams,
					abortController,
				});
				if (res) {
					const { nextPageToken, items } = res;
					setPlaylist((prevChannels) => ({
						list: [...prevChannels.list, ...items],
						isLoading: false,
						nextPageToken: nextPageToken,
					}));
				}
			} catch (error) {
				console.error(error.message ?? error);
			}
		},
		[playlistId]
	);

	const loadMorePlaylistItems = useCallback(() => {
		if (nextPageToken) {
			getPlaylistItems({ nextPageToken });
		}
	}, [getPlaylistItems, nextPageToken]);

	const filterPlaylist = useCallback(({ playlistItemId }) => {
		setPlaylist((prevPlaylist) => {
			const { list } = prevPlaylist;
			const filteredList = list.filter(
				(playlistItem) => playlistItem.id !== playlistItemId
			);
			return {
				...prevPlaylist,
				list: filteredList,
			};
		});
	}, []);

	const renderItem = useCallback(
		(playlistItem) => (
			<PlaylistItem
				key={playlistItem.id}
				playlistItem={playlistItem}
				playlistName={playlistName}
				filterPlaylist={filterPlaylist}
			/>
		),
		[filterPlaylist, playlistName]
	);

	useEffect(() => {
		const abortController = new AbortController();
		setPlaylist({
			list: [],
			isLoading: true,
			nextPageToken: "",
		});
		getPlaylistItems({ abortController });
		return () => {
			abortController.abort();
		};
	}, [getPlaylistItems]);

	return (
		<PlaylistPanelComponent>
			<PlaylistPanelTitle>{playlistName}</PlaylistPanelTitle>
			{!isLoading && list.length === 0 && (
				<h3>No videos in this playlist yet</h3>
			)}
			<InfiniteScroll
				items={list}
				fetchMoreData={loadMorePlaylistItems}
				isLoading={isLoading}
				renderItem={renderItem}
				skeletonItem={<PlaylistItemSkeleton />}
				numberOfSkeletonItems={5}
			/>
		</PlaylistPanelComponent>
	);
};

PlaylistPanel.propTypes = {
	playlistId: PropTypes.string,
	playlistName: PropTypes.string,
};

export default PlaylistPanel;
