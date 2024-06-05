import { Box, Menu, Typography } from "@mui/material";
import { useNavigate, useSearchParams } from "react-router-dom";
import PlaylistPanel from "../watchVideoPage/PlaylistPanel";
import { useCallback, useEffect, useState } from "react";
import { httpRequest } from "../../services/services";
import useLocalStorage from "../../hooks/useLocalStorage";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import EditableComponent from "./EditableComponent";
import { privacyOptions } from "../../utils/constant";
import {
  BlurredBackground,
  IconButton,
  MenuItem,
  MenuItemTextWrapper,
  PlaylistDetailTypography,
  PlaylistDetails,
  PlaylistImage,
  PlaylistImageWrapper,
  PlaylistPageComponent,
  PlaylistPanelWrapper,
  PlaylistSidebar,
  PrivacyPolicySelect,
  SecondaryTypography,
  UserActionButton,
  UserActionButtonWrapper,
} from "./PlaylistPageStyledComponents";
import PlaylistSidebarSkeleton from "./PlaylistSidebarSkeleton";
import StyledModal from "../../components/StyledModal";
import toast from "react-hot-toast";

const PlaylistPage = () => {
  const [searchParams] = useSearchParams();
  const playlistId = searchParams.get("list");
  const [user] = useLocalStorage("user", {});
  const { accessToken } = user;
  const navigate = useNavigate();

  const [anchorEl, setAnchorEl] = useState(null);
  const isOpenMoreOptions = Boolean(anchorEl);

  const [isOpenConfirmationModal, setIsOpenConfirmationModal] = useState(false);
  const [privacyPolicy, setPrivacyPolicy] = useState("");
  const [playlist, setPlaylist] = useState({
    list: [],
    isLoading: true,
  });
  const { list, isLoading } = playlist || {};
  const { snippet, contentDetails, status } = list[0] || {};

  const {
    publishedAt,
    title: playlistTitle,
    description,
    thumbnails,
    channelTitle,
  } = snippet || {};
  const {
    standard: { url: standardThumbnailUrl = "" } = {},
    high: { url: highThumbnailUrl = "" } = {},
  } = thumbnails || {};

  const { itemCount } = contentDetails || {};
  const { privacyStatus } = status || {};

  const getPlaylistDetails = useCallback(
    async ({ abortController }) => {
      try {
        const queryParams = {
          part: "snippet,contentDetails,status",
          id: playlistId,
        };
        const res = await httpRequest({
          url: "/playlists",
          queryParams,
          abortController,
        });
        if (res) {
          const { items } = res;
          setPlaylist({
            list: items,
            isLoading: false,
          });
        }
      } catch (error) {
        console.error(error);
      }
    },
    [playlistId]
  );

  const handleCloseMoreOptionsMenu = () => {
    setAnchorEl(null);
  };

  const openConfirmationModal = () => {
    setIsOpenConfirmationModal(true);
    setAnchorEl(null);
  };
  const handleCloseConfirmationModal = () => setIsOpenConfirmationModal(false);

  const openMoreOptions = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleDeletePlaylist = async () => {
    try {
      const queryParams = {
        id: playlistId,
      };
      const headers = {
        Authorization: `Bearer ${accessToken}`,
      };
      const res = await httpRequest({
        method: "DELETE",
        url: "/playlists",
        queryParams,
        headers,
        returnEntireResponseWithStatusCode: true,
      });
      if (res.status === 204) {
        navigate("/feed/playlists");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handlePrivacyPolicyChange = async ({ target: { value } }) => {
    setPrivacyPolicy(value);
    if (value === privacyStatus) {
      return;
    }
    try {
      const headers = {
        Authorization: `Bearer ${accessToken}`,
      };
      const queryParams = {
        part: "snippet,status",
      };
      const data = {
        id: playlistId,
        status: {
          privacyStatus: value,
        },
        snippet: {
          title: playlistTitle,
        },
      };
      const res = await httpRequest({
        url: "/playlists",
        method: "PUT",
        queryParams,
        data,
        headers,
      });
      if (res) {
        toast("privacy policy changed successfully");
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    setPlaylist({
      list: [],
      isLoading: true,
    });
    const abortController = new AbortController();
    getPlaylistDetails({ abortController });
    return () => {
      abortController.abort();
    };
  }, [getPlaylistDetails]);

  return (
    <PlaylistPageComponent>
      {isLoading ? (
        <PlaylistSidebarSkeleton />
      ) : (
        <PlaylistSidebar>
          <PlaylistImageWrapper>
            <PlaylistImage
              src={standardThumbnailUrl || highThumbnailUrl}
              alt="playlistThumbnail"
              referrerPolicy="no-referrer"
            />
          </PlaylistImageWrapper>
          <PlaylistDetails>
            <EditableComponent
              playlistId={playlistId}
              currentValue={playlistTitle}
            />
            <PlaylistDetailTypography>{description}</PlaylistDetailTypography>
            <PlaylistDetailTypography>{channelTitle}</PlaylistDetailTypography>
            <PlaylistDetailTypography>
              {itemCount} videos
            </PlaylistDetailTypography>
            <PrivacyPolicySelect
              value={privacyPolicy || privacyStatus}
              onChange={handlePrivacyPolicyChange}
              variant="standard"
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
            </PrivacyPolicySelect>
            {playlistId !== "LL" && (
              <>
                <IconButton variant="contained" onClick={openMoreOptions}>
                  <MoreVertIcon />
                </IconButton>

                <Menu
                  open={isOpenMoreOptions}
                  anchorEl={anchorEl}
                  onClose={handleCloseMoreOptionsMenu}
                  transformOrigin={{ horizontal: "left", vertical: "top" }}
                  anchorOrigin={{ horizontal: "left", vertical: "bottom" }}
                >
                  <MenuItem onClick={openConfirmationModal}>
                    <DeleteOutlineOutlinedIcon />
                    Delete playlist
                  </MenuItem>
                </Menu>

                <StyledModal
                  open={isOpenConfirmationModal}
                  handleClose={handleCloseConfirmationModal}
                >
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      gap: "12px",
                    }}
                  >
                    <Typography variant="subtitle1">Delete playlist</Typography>
                    <SecondaryTypography variant="body2">
                      Are you sure you want to delete {playlistTitle}?
                    </SecondaryTypography>
                    <SecondaryTypography variant="body2">
                      Note: Deleting playlists is a permanent action and cannot
                      be undone.
                    </SecondaryTypography>
                    <UserActionButtonWrapper>
                      <UserActionButton onClick={handleCloseConfirmationModal}>
                        Cancel
                      </UserActionButton>
                      <UserActionButton
                        textColor="#3EA6FF"
                        onClick={handleDeletePlaylist}
                      >
                        Delete
                      </UserActionButton>
                    </UserActionButtonWrapper>
                  </Box>
                </StyledModal>
              </>
            )}
          </PlaylistDetails>
          <BlurredBackground
            playlistThumbnail={standardThumbnailUrl || highThumbnailUrl}
          />
        </PlaylistSidebar>
      )}
      <PlaylistPanelWrapper>
        <PlaylistPanel playlistName={playlistTitle} playlistId={playlistId} />
      </PlaylistPanelWrapper>
    </PlaylistPageComponent>
  );
};

export default PlaylistPage;
