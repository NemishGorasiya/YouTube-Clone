import PropTypes from "prop-types";
import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { httpRequest } from "../../services/services";
import AddToPlaylist from "./AddToPlaylist";
import { AuthContext } from "../../context/AuthContext";
import {
	ChannelName,
	IconButton,
	MenuItem,
	PlaylistContent,
	PlaylistItemComponent,
	VideoImage,
	VideoImageWrapper,
	VideoTitle,
	VideoTitleWrapper,
} from "./PlaylistItemStyledComponents";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { Menu } from "@mui/material";
import VideoFallbackImage from "../../assets/video-placeholder.jpg";

const PlaylistItem = ({ playlistItem, playlistName, filterPlaylist }) => {
	const [anchorEl, setAnchorEl] = useState(null);
	const { isLoggedIn } = useContext(AuthContext);

	const isOpenMoreOptions = Boolean(anchorEl);

	const {
		id: playlistItemId = "",
		snippet: {
			title = "",
			playlistId = "",
			resourceId: { videoId = "" } = {},
			thumbnails: { high: { url = "" } = {} } = {},
			videoOwnerChannelTitle = "",
		} = {},
	} = playlistItem || {};

	const openMenu = (event) => {
		event.preventDefault();
		setAnchorEl(event.currentTarget);
	};

	const closeMenu = (event) => {
		event.stopPropagation();
		setAnchorEl(null);
	};

	const removeFromPlaylist = async () => {
		try {
			const queryParams = {
				id: playlistItemId,
			};

			const res = await httpRequest({
				method: "DELETE",
				url: "/playlistItems",
				queryParams,
				returnEntireResponseWithStatusCode: true,
			});
			if (res.status === 204) {
				filterPlaylist({ playlistItemId });
			}
		} catch (error) {
			console.error(error);
		}
	};

	return (
		<PlaylistItemComponent>
			<Link
				to={`/watch?v=${videoId}&list=${playlistId}&listName=${encodeURIComponent(
					playlistName
				)}`}
			>
				<PlaylistContent>
					<VideoImageWrapper>
						<VideoImage src={url || VideoFallbackImage} alt="Video Thumbnail" />
					</VideoImageWrapper>
					<VideoTitleWrapper>
						<VideoTitle>{title}</VideoTitle>
						<ChannelName>{videoOwnerChannelTitle}</ChannelName>
					</VideoTitleWrapper>
				</PlaylistContent>
			</Link>
			<IconButton onClick={openMenu}>
				<MoreVertIcon />
			</IconButton>
			<Menu
				open={isOpenMoreOptions}
				anchorEl={anchorEl}
				onClose={closeMenu}
				transformOrigin={{ horizontal: "right", vertical: "top" }}
				anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
			>
				<MenuItem disabled={!isLoggedIn}>
					<AddToPlaylist videoId={videoId} />
				</MenuItem>
				<MenuItem onClick={removeFromPlaylist}>
					<DeleteOutlineOutlinedIcon />
					Remove from {playlistName}
				</MenuItem>
			</Menu>
		</PlaylistItemComponent>
	);
};

PlaylistItem.propTypes = {
	playlistItem: PropTypes.object,
	playlistName: PropTypes.string,
	filterPlaylist: PropTypes.func,
};

export default PlaylistItem;
