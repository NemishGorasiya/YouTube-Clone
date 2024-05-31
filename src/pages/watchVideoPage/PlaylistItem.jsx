import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { Box, Menu } from "@mui/material";
import PropTypes from "prop-types";
import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import useLocalStorage from "../../hooks/useLocalStorage";
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
} from "./PlaylistItemStyledComponents";

// const VideoImageWrapper = styled(MuiBox)(({ theme }) => ({
//   width: "140px",
//   aspectRatio: "16/9",
//   [theme.breakpoints.down("sm")]: {
//     width: "100px",
//   },
// }));

// const VideoImage = styled("img")(() => ({
//   height: "100%",
//   width: "100%",
//   objectFit: "cover",
//   borderRadius: "8px",
// }));

// const PlaylistItemComponent = styled(MuiBox)(() => ({
//   display: "flex",
//   justifyContent: "space-between",
//   gap: "12px",
// }));
// const PlaylistContent = styled(MuiBox)(() => ({
//   display: "flex",
//   gap: "12px",
// }));

// const VideoTitle = styled(MuiTypography)(({ theme }) => ({
//   overflow: "hidden",
//   textOverflow: "ellipsis",
//   display: "-webkit-box",
//   WebkitBoxOrient: "vertical",
//   WebkitLineClamp: "2",
//   color: theme.palette.primary.main,
//   fontWeight: 600,
// }));

// const ChannelName = styled(MuiTypography)(({ theme }) => ({
//   overflow: "hidden",
//   textOverflow: "ellipsis",
//   color: theme.palette.primary.light,
//   fontSize: "14px",
// }));

// const IconButton = styled(MuiIconButton)(() => ({
//   height: "35px",
//   width: "35px",
//   padding: "5px",
// }));

// const MenuItem = styled(MuiMenuItem)(() => ({
//   gap: "4px",
// }));

const PlaylistItem = ({ playlistItem, playlistName, filterPlaylist }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const isOpenMoreOptions = Boolean(anchorEl);
  const [user] = useLocalStorage("user", {});
  const { accessToken } = user;
  const { isLoggedIn } = useContext(AuthContext);

  const {
    id: playlistItemId,
    snippet: {
      title,
      playlistId,
      resourceId: { videoId },
      thumbnails: {
        high: { url },
      },
      videoOwnerChannelTitle,
    },
  } = playlistItem;

  const openMoreOptionsMenu = (event) => {
    event.preventDefault();
    setAnchorEl(event.currentTarget);
  };

  const handleCloseMoreOptionsMenu = (event) => {
    event.stopPropagation();
    setAnchorEl(null);
  };

  const handleRemoveFromPlaylist = async () => {
    try {
      const queryParams = {
        id: playlistItemId,
      };
      const headers = {
        Authorization: `Bearer ${accessToken}`,
      };
      const res = await httpRequest({
        method: "DELETE",
        url: "/playlistItems",
        queryParams,
        headers,
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
        to={`/watch?v=${videoId}&list=${playlistId}&listName=${playlistName}`}
      >
        <PlaylistContent>
          <VideoImageWrapper>
            <VideoImage src={url} alt="Video Thumbnail" />
          </VideoImageWrapper>
          <Box sx={{ flex: 1 }}>
            <VideoTitle>{title}</VideoTitle>
            <ChannelName>{videoOwnerChannelTitle}</ChannelName>
          </Box>
        </PlaylistContent>
      </Link>
      <IconButton onClick={openMoreOptionsMenu}>
        <MoreVertIcon />
      </IconButton>
      <Menu
        open={isOpenMoreOptions}
        anchorEl={anchorEl}
        onClose={handleCloseMoreOptionsMenu}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        <MenuItem disabled={!isLoggedIn}>
          <AddToPlaylist videoId={videoId} />
        </MenuItem>
        <MenuItem onClick={handleRemoveFromPlaylist}>
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
