import { Box, Modal, styled, useScrollTrigger } from "@mui/material";
import MuiButton from "@mui/material/Button";
import MuiBox from "@mui/material/Box";
import PlaylistAddIcon from "@mui/icons-material/PlaylistAdd";
import { Fragment, useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import { modalStyle } from "../../components/styles/styles";
import IconButton from "@mui/material/IconButton";
import AddToPlaylistModal from "./AddToPlaylistModal";

const ButtonWrapper = styled(MuiBox)(() => ({
  display: "flex",
  alignItems: "center",
  gap: "4px",
}));

const AddToPlaylist = ({ videoId }) => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  return (
    <>
      <ButtonWrapper onClick={handleOpen}>
        <PlaylistAddIcon /> Save
      </ButtonWrapper>
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
