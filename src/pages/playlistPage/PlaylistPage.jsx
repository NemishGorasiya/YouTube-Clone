import { Box, Menu, Modal, Typography, styled } from "@mui/material";
import MuiTypography from "@mui/material/Typography";
import MuiSelect from "@mui/material/Select";
import MuiIconButton from "@mui/material/IconButton";
import MuiBox from "@mui/material/Box";
import MuiButton from "@mui/material/Button";
import MuiMenuItem from "@mui/material/MenuItem";
import { useNavigate, useSearchParams } from "react-router-dom";
import PlaylistPanel from "../watchVideoPage/PlaylistPanel";
import { useCallback, useEffect, useState } from "react";
import PlaylistItem from "../watchVideoPage/PlaylistItem";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import { modalStyle } from "../../components/styles/styles";
import {
  fetchData,
  fetchPlaylistItems,
  fetchPlaylists,
} from "../../services/services";
import InfiniteScroll from "../../components/InfiniteScroll";
import useLocalStorage from "../../hooks/useLocalStorage";
import { Margin } from "@mui/icons-material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import LockOpenOutlinedIcon from "@mui/icons-material/LockOpenOutlined";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import EditableComponent from "./EditableComponent";
import { privacyOptions } from "../../utils/constant";
import Loader from "../../components/loader/Loader";

const PlaylistPageComponent = styled(Box)(({ theme }) => ({
  display: "flex",
  height: "calc(100vh - 56px)",
  overflow: "hidden",
  gap: "8px",
  [theme.breakpoints.down("lg")]: {
    overflowY: "auto",
    flexDirection: "column",
    height: "auto",
  },
}));

const PlaylistSidebar = styled(Box)(({ theme }) => ({
  width: "360px",
  height: "calc(100vh - 56px)",
  borderRadius: 16,
  padding: 24,
  borderBottomLeftRadius: 0,
  borderBottomRightRadius: 0,
  zIndex: 2,
  position: "relative",
  overflow: "hidden",
  [theme.breakpoints.down("lg")]: {
    overflow: "visible",
    height: "auto",
    width: "100%",
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
    borderBottomLeftRadius: 16,
    borderBottomRightRadius: 16,
    gap: "16px",
    maxWidth: "768px",
    margin: "0 auto",
    padding: 12,
  },
}));

const BlurredBackground = styled(Box)(({ theme, playlistThumbnail }) => ({
  position: "absolute",
  backgroundImage: `url(${playlistThumbnail})`,
  filter: "blur(75px)",
  backdropFilter: "blur(5px)",
  height: "100%",
  width: "100%",
  top: 0,
  left: 0,
  right: 0,
  zIndex: -1,
  borderRadius: "inherit",
}));

const PlaylistPanelWrapper = styled(Box)(({ theme }) => ({
  flex: 1,
  overflow: "auto",
  height: "calc(100vh - 56px)",
  [theme.breakpoints.down("lg")]: {
    maxWidth: "768px",
    margin: "0 auto",
  },
}));

const PlaylistImageWrapper = styled(Box)(({ theme }) => ({
  width: "100%",
  aspectRatio: "16/9",
  borderRadius: 12,
  [theme.breakpoints.down("lg")]: {
    width: "100%",
    maxWidth: "400px",
  },
}));
const PlaylistImage = styled("img")(() => ({
  width: "100%",
  height: "100%",
  borderRadius: "inherit",
  objectFit: "cover",
}));

const SecondaryTypography = styled(MuiTypography)(({ theme }) => ({
  color: theme.palette.primary.light,
}));

const PlaylistDetails = styled(Box)(() => ({
  display: "flex",
  flexDirection: "column",
  width: "100%",
  gap: 5,
  color: "#F1F1F1",
}));

const PlaylistDetailTypography = styled(MuiTypography)(() => ({
  display: "flex",
  alignItems: "center",
  gap: 2,
}));

const MenuItem = styled(MuiMenuItem)(() => ({
  gap: 4,
}));

const UserActionButtonWrapper = styled(MuiBox)(() => ({
  textAlign: "end",
}));

const IconButton = styled(MuiIconButton)(() => ({
  background: "rgba(255,255,255,0.2)",
  width: "fit-content",
}));

const PrivacyPolicySelect = styled(MuiSelect)(() => ({
  width: "fit-content",
}));

const MenuItemTextWrapper = styled(MuiMenuItem)(() => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "start",
  "&:hover": {
    background: "none",
  },
}));

const UserActionButton = styled(MuiButton)(({ theme, textColor }) => ({
  color: textColor || theme.palette.primary.main,
}));

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

  const getPlaylistDetails = useCallback(async () => {
    try {
      const queryParams = {
        part: "snippet,contentDetails,status",
        id: playlistId,
        key: import.meta.env.VITE_GOOGLE_API_KEY,
      };
      const res = await fetchPlaylists({ queryParams, accessToken });
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
  }, [accessToken, playlistId]);

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
      const res = await fetchData({
        method: "DELETE",
        url: "/playlists",
        queryParams,
        headers,
        returnEntireResponseWithStatusCode: true,
      });
      if (res.status === 204) {
        navigate("/feed/playlists");
        console.log("playlist deleted successfully");
      } else {
        console.log("something went wrong while deleting playlist");
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
      const res = await fetchData({
        url: "/playlists",
        method: "PUT",
        queryParams,
        data,
        headers,
      });
      if (res) {
        console.log("privacy policy changed successfully");
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
    getPlaylistDetails();
  }, [getPlaylistDetails]);

  return (
    <PlaylistPageComponent>
      {isLoading ? (
        <Loader />
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

                <Modal
                  open={isOpenConfirmationModal}
                  onClose={handleCloseConfirmationModal}
                >
                  <Box
                    sx={{
                      ...modalStyle,
                      padding: "24px",
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
                </Modal>
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
