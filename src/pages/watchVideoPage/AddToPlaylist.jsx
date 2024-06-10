import { useContext, useState } from "react";
import PropTypes from "prop-types";
import PlaylistAddIcon from "@mui/icons-material/PlaylistAdd";
import AddToPlaylistModal from "./AddToPlaylistModal";
import { AuthContext } from "../../context/AuthContext";
import { AddToPlaylistButton } from "./AddToPlaylistStyledComponents";

const AddToPlaylist = ({ videoId }) => {
  const [open, setOpen] = useState(false);

  const { isLoggedIn } = useContext(AuthContext);

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
