import { useSearchParams } from "react-router-dom";
import { useCallback, useEffect, useState } from "react";
import { styled } from "@mui/material";
import MuiGrid from "@mui/material/Grid";
import { httpRequest } from "../../services/services";
import useLocalStorage from "../../hooks/useLocalStorage";
import PlaylistCard from "./PlaylistCard";
import InfiniteScroll from "../InfiniteScroll";
import PropTypes from "prop-types";

const renderItem = (playlist) => (
	<PlaylistCard key={playlist.id} playlist={playlist} />
);

const PlaylistGrid = styled(MuiGrid)(() => ({
	display: "grid",
	gap: "16px",
	rowGap: "16px",
	gridTemplateColumns: "repeat(auto-fill, minmax(230px, 1fr))",
	paddingTop: "15px",
}));

const Playlists = ({ channelId }) => {
	const [searchParams] = useSearchParams();
	const [playlists, setPlaylists] = useState({
		list: [],
		isLoading: true,
		nextPageToken: "",
	});
	const { list, isLoading, nextPageToken } = playlists;
	const listQuery = searchParams.get("list");
	const [user] = useLocalStorage("user", {});
	const { accessToken } = user;

	const getPlaylists = useCallback(
		async ({ nextPageToken, abortController } = {}) => {
			const queryParams = {
				part: "snippet,contentDetails,status",
				...(listQuery === "LL"
					? { id: "LL" }
					: channelId
					? { channelId, pageToken: nextPageToken }
					: { mine: true, pageToken: nextPageToken }),
			};
			try {
				const res = await httpRequest({
					url: "/playlists",
					queryParams,
					abortController,
				});
				if (res) {
					const { nextPageToken, items } = res;
					setPlaylists((prevPlaylists) => ({
						list: [...prevPlaylists.list, ...items],
						isLoading: false,
						nextPageToken: nextPageToken,
					}));
				}
			} catch (error) {
				console.error(error.message);
			}
		},
		[channelId, listQuery]
	);

	const loadMorePlaylists = () => {
		if (nextPageToken) {
			getPlaylists({ nextPageToken: nextPageToken });
		}
	};

	useEffect(() => {
		setPlaylists({
			list: [],
			isLoading: true,
			nextPageToken: "",
		});
		const abortController = new AbortController();
		getPlaylists({ abortController });
		return () => {
			abortController.abort();
		};
	}, [getPlaylists]);

	if (list.length === 0) return <h1>No Playlists</h1>;

	return (
		<PlaylistGrid container>
			<InfiniteScroll
				items={list}
				fetchMoreData={loadMorePlaylists}
				renderItem={renderItem}
				isLoading={isLoading}
			></InfiniteScroll>
		</PlaylistGrid>
	);
};

Playlists.propTypes = {
	channelId: PropTypes.string,
};

export default Playlists;
