import PlaylistAddIcon from "@mui/icons-material/PlaylistAdd";
import { Button, styled } from "@mui/material";
import MuiBox from "@mui/material/Box";
import MuiButton from "@mui/material/Button";
import { useContext, useState } from "react";
import AddToPlaylistModal from "./AddToPlaylistModal";
import PropTypes from "prop-types";
import { AuthContext } from "../../context/AuthContext";

const AddToPlaylistButton = styled(MuiBox)(() => ({
	display: "flex",
	alignItems: "center",
	gap: "4px",
	width: "100%",
}));

const AddToPlaylist = ({ videoId }) => {
	const { isLoggedIn } = useContext(AuthContext);
	const [open, setOpen] = useState(false);
	const handleOpen = () => setOpen(true);
	const handleClose = () => setOpen(false);
	return (
		<>
			<AddToPlaylistButton disabled={!isLoggedIn} onClick={handleOpen}>
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
