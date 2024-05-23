import AddIcon from "@mui/icons-material/Add";
import CloseIcon from "@mui/icons-material/Close";
import LockOpenOutlinedIcon from "@mui/icons-material/LockOpenOutlined";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import {
  Box,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  InputLabel,
  MenuItem,
  Modal,
  Select,
  TextField,
  Typography,
  styled,
} from "@mui/material";
import MuiBox from "@mui/material/Box";
import MuiButton from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MuiMenuItem from "@mui/material/MenuItem";
import PropTypes from "prop-types";
import { useCallback, useEffect, useState } from "react";
import InfiniteScroll from "../../components/InfiniteScroll";
import Loader from "../../components/loader/Loader";
import { modalStyle } from "../../components/styles/styles";
import useLocalStorage from "../../hooks/useLocalStorage";
import { httpRequest } from "../../services/services";
import { privacyOptions } from "../../utils/constant";

const CloseModalButton = styled(IconButton)(() => ({
  position: "absolute",
  right: 5,
  top: 5,
}));

const CreatePlaylistButton = styled(MuiButton)(() => ({
  width: "fit-content",
  alignSelf: "end",
  padding: "8px",
}));

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
        <LockOpenOutlinedIcon />
      )}
    </FormControlWrapper>
  );
};

const CreateNewPlaylistButton = styled(MuiButton)(() => ({
  display: "flex",
  justifyContent: "flex-start",
  paddingLeft: 0,
  gap: 8,
  borderRadius: 4,
  textTransform: "capitalize",
}));

const FormControlWrapper = styled(MuiBox)(() => ({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
}));

const NewPlaylistForm = styled("form")(() => ({
  display: "flex",
  flexDirection: "column",
  gap: 16,
}));

const MenuItemTextWrapper = styled(MuiMenuItem)(() => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "start",
  "&:hover": {
    background: "none",
  },
}));

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
    <Modal open={open} onClose={handleClose}>
      <Box
        className="modalContent"
        sx={{
          ...modalStyle,
          padding: "24px",
          display: "flex",
          flexDirection: "column",
          gap: "12px",
        }}
      >
        <CloseModalButton onClick={handleClose}>
          <CloseIcon />
        </CloseModalButton>
        <Typography variant="h5" gutterBottom>
          Save video to...
        </Typography>
        {isLoading ? (
          <Loader />
        ) : (
          <FormGroup>
            <InfiniteScroll
              items={list}
              fetchMoreData={loadMorePlaylists}
              renderItem={renderItem}
              isLoading={isLoading}
              handleCheckboxClick={handleCheckboxClick}
              videoId={videoId}
            />
          </FormGroup>
        )}
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
    </Modal>
  );
};

AddToPlaylistModal.propTypes = {
  open: PropTypes.bool,
  handleClose: PropTypes.func,
  videoId: PropTypes.string,
};

export default AddToPlaylistModal;
