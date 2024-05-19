import { Box, styled } from "@mui/material";
import PlaylistPlayIcon from "@mui/icons-material/PlaylistPlay";
import MuiBox from "@mui/material/Box";
import MuiGrid from "@mui/material/Grid";
import MuiTypography from "@mui/material/Typography";
import { calcDistanceToNow } from "../../utils/utilityFunction";
import { fetchPlaylistItems } from "../../services/services";
import useLocalStorage from "../../hooks/useLocalStorage";
import { Link, useNavigate } from "react-router-dom";
import PropTypes from "prop-types";

const VideoCountBadge = styled(MuiBox)(() => ({
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

const PlaylistCardThumbnail = styled(MuiBox)(({ theme }) => ({
	display: "flex",
	aspectRatio: "16/9",
	borderRadius: "8px",
	position: "relative",
	zIndex: "1",
	outline: `1px solid ${theme.palette.background.default}`,
}));

const PlaylistMetadata = styled(MuiTypography)(({ theme, isTitle }) => ({
	fontSize: "13px",
	lineHeight: "18px",
	fontFamily: "Roboto, Arial, sans-serif",
	color: theme.palette.primary.light,
	...(isTitle
		? { color: theme.palette.primary.main, fontSize: "15px", fontWeight: 600 }
		: {}),
}));

const PlaylistCardStackLayer = styled(MuiBox)(({ theme, layer }) => ({
	position: "absolute",
	height: "90%",
	left: "50%",
	transform: "translateX(-50%)",
	borderRadius: "inherit",
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
				background: "rgb(96, 96, 96)",
				top: "-9px",
				zIndex: "-2",
		  }
		: {}),
}));

const PlaylistCardComponent = styled(MuiGrid)(() => ({
	gap: "10px",
	display: "grid",
	cursor: "pointer",
}));

const PlaylistCard = ({ playlist }) => {
	const {
		id: playlistId,
		snippet: {
			title,
			publishedAt,
			thumbnails: {
				high: { url },
			},
		},
		status: { privacyStatus },
		contentDetails: { itemCount },
	} = playlist;

	const navigate = useNavigate();

	const [user] = useLocalStorage("user", {});
	const { accessToken } = user;

	const handelPlaylistClick = async (id) => {
		const queryParams = {
			part: "snippet",
			playlistId: id,
			maxResults: 1,
			key: import.meta.env.VITE_GOOGLE_API_KEY,
		};
		try {
			const res = await fetchPlaylistItems({
				queryParams,
				accessToken,
			});

			if (res) {
				const { items } = res;
				const {
					snippet: {
						resourceId: { videoId },
					},
				} = items[0];
				navigate(`/watch?v=${videoId}&list=${id}&listName=${title}`);
			} else {
				console.log("something went wrong");
			}
			console.log("res", res);
		} catch (error) {
			console.error(error.message ?? error);
		}
	};

	return (
		<PlaylistCardComponent
			item
			onClick={() => {
				handelPlaylistClick(playlistId);
			}}
		>
			<PlaylistCardThumbnail>
				<img
					style={{
						width: "100%",
						height: "100%",
						objectFit: "cover",
						borderRadius: "inherit",
					}}
					src={url}
					alt="playlist Thumbnail"
				/>
				<PlaylistCardStackLayer layer={1} />
				<PlaylistCardStackLayer layer={2} />
				<VideoCountBadge>
					<PlaylistPlayIcon sx={{ fontSize: "18px" }} />
					{itemCount === 0 ? "No" : itemCount} videos
				</VideoCountBadge>
			</PlaylistCardThumbnail>
			<Box>
				<PlaylistMetadata isTitle>{title}</PlaylistMetadata>
				<PlaylistMetadata>{privacyStatus}</PlaylistMetadata>
				<PlaylistMetadata>
					published {calcDistanceToNow({ time: publishedAt })}
				</PlaylistMetadata>
				<PlaylistMetadata
					onClick={(event) => {
						event.stopPropagation();
						navigate(`/playlist?list=${playlistId}`);
					}}
				>
					View full playlist
				</PlaylistMetadata>
			</Box>
		</PlaylistCardComponent>
	);
};

PlaylistCard.propTypes = {
	playlist: PropTypes.object,
};

export default PlaylistCard;
