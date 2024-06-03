import { Box } from "@mui/material";
import PlaylistPlayIcon from "@mui/icons-material/PlaylistPlay";
import { calcDistanceToNow } from "../../utils/utilityFunction";
import { httpRequest } from "../../services/services";
import useLocalStorage from "../../hooks/useLocalStorage";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import {
  PlaylistCardComponent,
  PlaylistCardStackLayer,
  PlaylistCardThumbnail,
  PlaylistCardThumbnailWrapper,
  PlaylistMetadata,
  VideoCountBadge,
} from "./PlaylistsStyledComponents";

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
    };
    const headers = {
      Authorization: `Bearer ${accessToken}`,
    };
    try {
      const res = await httpRequest({
        url: "/playlistItems",
        queryParams,
        accessToken,
        headers,
      });

      if (res) {
        const { items } = res;
        const {
          snippet: {
            resourceId: { videoId },
          },
        } = items[0];
        navigate(
          `/watch?v=${videoId}&list=${id}&listName=${
            id === "LL" ? "Liked Videos" : title
          }`
        );
      }
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
      <PlaylistCardThumbnailWrapper>
        <PlaylistCardThumbnail src={url} alt="playlist Thumbnail" />
        <PlaylistCardStackLayer layer={1} />
        <PlaylistCardStackLayer layer={2} />
        <VideoCountBadge>
          <PlaylistPlayIcon sx={{ fontSize: "18px" }} />
          {itemCount === 0 ? "No" : itemCount} videos
        </VideoCountBadge>
      </PlaylistCardThumbnailWrapper>
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
