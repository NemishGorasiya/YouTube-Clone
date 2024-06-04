import PlaylistAddIcon from "@mui/icons-material/PlaylistAdd";
import { useContext, useState } from "react";
import AddToPlaylistModal from "./AddToPlaylistModal";
import PropTypes from "prop-types";
import { AuthContext } from "../../context/AuthContext";
import { AddToPlaylistButton } from "./AddToPlaylistStyledComponents";

const AddToPlaylist = ({ videoId }) => {
  const { isLoggedIn } = useContext(AuthContext);
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  return (
    <>
      <AddToPlaylistButton onClick={isLoggedIn ? handleOpen : null}>
        <PlaylistAddIcon /> Save
      </AddToPlaylistButton>
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
