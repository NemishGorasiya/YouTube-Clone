import { useContext, useState } from "react";
import PropTypes from "prop-types";
import PlaylistAddIcon from "@mui/icons-material/PlaylistAdd";
import AddToPlaylistModal from "./AddToPlaylistModal";
import { AuthContext } from "../../context/AuthContext";
import { AddToPlaylistButton } from "./AddToPlaylistStyledComponents";

const AddToPlaylist = ({ videoId }) => {
	const [isModalOpen, setIsModalOpen] = useState(false);

	const { isLoggedIn } = useContext(AuthContext);

	const openModal = () => {
		if (isLoggedIn) {
			setIsModalOpen(true);
		}
	};

	const closeModal = () => {
		setIsModalOpen(false);
	};

	return (
		<>
			<AddToPlaylistButton onClick={openModal}>
				<PlaylistAddIcon /> Save
			</AddToPlaylistButton>
			{isModalOpen && (
				<AddToPlaylistModal
					videoId={videoId}
					open={isModalOpen}
					handleClose={closeModal}
				/>
			)}
		</>
	);
};

AddToPlaylist.propTypes = {
	videoId: PropTypes.string,
};

export default AddToPlaylist;
