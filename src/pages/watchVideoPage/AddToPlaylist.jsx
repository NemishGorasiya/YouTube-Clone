import { Box, Modal, styled, useScrollTrigger } from "@mui/material";
import MuiButton from "@mui/material/Button";
import PlaylistAddIcon from "@mui/icons-material/PlaylistAdd";
import { useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import { modalStyle } from "../../components/styles/styles";
import IconButton from "@mui/material/IconButton";
import AddToPlaylistModal from "./AddToPlaylistModal";

const UserActionButton = styled(MuiButton)(({ theme }) => ({
  background: theme.palette.secondaryBackground.default,
  color: theme.palette.primary.main,
  "&:hover": {
    background: theme.palette.secondaryBackground.light,
  },
}));

const AddToPlaylist = ({ videoId }) => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  return (
    <>
      <UserActionButton variant="contained" onClick={handleOpen}>
        <PlaylistAddIcon /> Save
      </UserActionButton>
      {open && (
        <AddToPlaylistModal
          videoId={videoId}
          open={open}
          handleClose={handleClose}
        />
      )}
    </>
  );
};

export default AddToPlaylist;
