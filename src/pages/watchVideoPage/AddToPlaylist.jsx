import PlaylistAddIcon from "@mui/icons-material/PlaylistAdd";
import { styled } from "@mui/material";
import MuiBox from "@mui/material/Box";
import { useState } from "react";
import AddToPlaylistModal from "./AddToPlaylistModal";
import PropTypes from "prop-types";

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

AddToPlaylist.propTypes = {
  videoId: PropTypes.string,
};

export default AddToPlaylist;
