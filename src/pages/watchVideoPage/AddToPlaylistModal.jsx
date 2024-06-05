import AddIcon from "@mui/icons-material/Add";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import PublicOutlinedIcon from "@mui/icons-material/PublicOutlined";
import {
  Box,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";

import PropTypes from "prop-types";
import { useCallback, useEffect, useState } from "react";
import InfiniteScroll from "../../components/InfiniteScroll";
import useLocalStorage from "../../hooks/useLocalStorage";
import { httpRequest } from "../../services/services";
import { privacyOptions } from "../../utils/constant";
import PlaylistChecklistItemSkeleton from "./PlaylistChecklistItemSkeleton";
import StyledModal from "../../components/StyledModal";
import {
  CreateNewPlaylistButton,
  CreatePlaylistButton,
  FormControlWrapper,
  MenuItemTextWrapper,
  NewPlaylistForm,
} from "./AddToPlaylistStyledComponents";

const renderItem = (props) => {
  const { snippet, id, status, handleCheckboxClick, videoId } = props || {};
  const { title = "" } = snippet || {};
  const { privacyStatus = "" } = status || {};

  return (
    <FormControlWrapper key={id}>
      <FormControlLabel
        control={<Checkbox />}
        label={title}
        onChange={(event) => {
          handleCheckboxClick({ event, playlistId: id, videoId });
        }}
      />
      {privacyStatus === "private" ? (
        <LockOutlinedIcon />
      ) : (
        <PublicOutlinedIcon />
      )}
    </FormControlWrapper>
  );
};

const AddToPlaylistModal = ({ open, handleClose, videoId }) => {
  const [user] = useLocalStorage("user", {});
  const { accessToken } = user;
  const [playlists, setPlaylists] = useState({
    list: [],
    isLoading: true,
    nextPageToken: "",
  });
  const [isCreateNewPlaylistFormOpen, setIsCreateNewPlaylistFormOpen] =
    useState(false);
  const [selectedPrivacyPolicy, setSelectedPrivacyPolicy] = useState("private");

  const handlePrivacyPolicyChange = ({ target: { value } }) => {
    setSelectedPrivacyPolicy(value);
  };

  const createNewPlaylistForm = () => {
    setIsCreateNewPlaylistFormOpen(true);
  };

  const createPlaylistAndAddVideo = async (event) => {
    event.preventDefault();
    const fd = new FormData(event.target);

    const playlistName = fd.get("playlistName");
    const privacyPolicy = fd.get("privacyPolicy");
    if (playlistName !== "" && privacyPolicy) {
      try {
        const queryParams = {
          part: "snippet,status",
        };
        const data = {
          snippet: {
            title: playlistName,
          },
          status: {
            privacyStatus: privacyPolicy,
          },
        };
        const headers = {
          Authorization: `Bearer ${accessToken}`,
        };
        const res = await httpRequest({
          url: "/playlists",
          method: "POST",
          queryParams,
          data,
          headers,
        });

        if (res) {
          const { id: playlistId } = res;
          if (playlistId) {
            addToPlaylist({ playlistId, videoId });
          }
        }
      } catch (error) {
        console.error(error);
      }
    } else {
      return;
    }
  };

  const addToPlaylist = async ({ playlistId, videoId }) => {
    try {
      const queryParams = {
        part: "snippet",
      };
      const headers = {
        Authorization: `Bearer ${accessToken}`,
      };
      const data = {
        snippet: {
          playlistId,
          resourceId: {
            kind: "youtube#video",
            videoId,
          },
        },
      };
      const res = await httpRequest({
        url: "/playlistItems",
        method: "POST",
        queryParams,
        headers,
        data,
      });

      if (res) {
        return true;
      } else {
        return false;
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleCheckboxClick = async ({ event, playlistId, videoId }) => {
    if (event.target.checked) {
      const res = addToPlaylist({ playlistId, videoId });
      if (res) {
        alert("Video added to playlist successfully");
      } else {
        alert("something went wrong");
      }
    }
  };

  const { list, isLoading, nextPageToken } = playlists || {};
  const getPlaylists = useCallback(
    async ({ nextPageToken, abortController } = {}) => {
      try {
        const queryParams = {
          part: "snippet,status",
          maxResults: 10,
          mine: true,
          pageToken: nextPageToken,
        };
        const headers = {
          Authorization: `Bearer ${accessToken}`,
        };
        const res = await httpRequest({
          url: "/playlists",
          queryParams,
          headers,
          abortController,
        });
        if (res) {
          const { items, nextPageToken } = res;
          setPlaylists((prevList) => ({
            list: [...prevList.list, ...items],
            isLoading: false,
            nextPageToken: nextPageToken,
          }));
        }
      } catch (error) {
        console.error(error);
      }
    },
    [accessToken]
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
    getPlaylists({ abortController: abortController });
    return () => {
      abortController.abort();
    };
  }, [getPlaylists]);

  return (
    <StyledModal open={open} handleClose={handleClose}>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: "12px",
        }}
      >
        <Typography variant="h5" gutterBottom>
          Save video to...
        </Typography>
        <FormGroup>
          <InfiniteScroll
            items={list}
            fetchMoreData={loadMorePlaylists}
            renderItem={renderItem}
            isLoading={isLoading}
            handleCheckboxClick={handleCheckboxClick}
            videoId={videoId}
            skeletonItem={<PlaylistChecklistItemSkeleton />}
            numberOfSkeletonItems={6}
          />
        </FormGroup>
        {isCreateNewPlaylistFormOpen ? (
          <NewPlaylistForm action="" onSubmit={createPlaylistAndAddVideo}>
            <TextField label="Name" variant="standard" name="playlistName" />
            <FormControl variant="standard">
              <InputLabel>Privacy</InputLabel>
              <Select
                label="Privacy"
                value={selectedPrivacyPolicy}
                onChange={handlePrivacyPolicyChange}
                name="privacyPolicy"
                renderValue={(selected) => privacyOptions[selected].label}
              >
                {Object.entries(privacyOptions).map(
                  ([value, { label, description, icon }]) => (
                    <MenuItem key={value} value={value}>
                      {icon}
                      <MenuItemTextWrapper>
                        {label}
                        <Typography
                          variant="caption"
                          display="block"
                          gutterBottom
                        >
                          {description}
                        </Typography>
                      </MenuItemTextWrapper>
                    </MenuItem>
                  )
                )}
              </Select>
            </FormControl>
            <CreatePlaylistButton type="submit" variant="text">
              Create
            </CreatePlaylistButton>
          </NewPlaylistForm>
        ) : (
          <CreateNewPlaylistButton
            variant="text"
            onClick={createNewPlaylistForm}
          >
            <AddIcon /> Create new playlist
          </CreateNewPlaylistButton>
        )}
      </Box>
    </StyledModal>
  );
};

AddToPlaylistModal.propTypes = {
  open: PropTypes.bool,
  handleClose: PropTypes.func,
  videoId: PropTypes.string,
};

export default AddToPlaylistModal;
