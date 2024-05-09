import { Box, IconButton, Modal, styled } from "@mui/material";
import MuiTypography from "@mui/material/Typography";
import { modalStyle } from "../styles/styles";
import CloseIcon from "@mui/icons-material/Close";
import { customParser, formatDate } from "../../utils/utilityFunction";
import InfoIcon from "@mui/icons-material/Info";
import SlideshowIcon from "@mui/icons-material/Slideshow";
import PropTypes from "prop-types";

const ChannelDescriptionModal = ({ onClose, open, channelInfo }) => {
  const {
    snippet: { description, publishedAt },
    contentDetails: { totalItemCount },
  } = channelInfo;

  const DescriptionItem = styled(MuiTypography)(() => ({
    display: "flex",
    gap: "5px",
  }));

  const CloseModalButton = styled(IconButton)(() => ({
    position: "absolute",
    right: 5,
    top: 5,
  }));

  return (
    <Modal open={open} onClose={onClose}>
      <Box className="modalContent" sx={modalStyle}>
        <CloseModalButton
          onClick={onClose}
          // sx={{
          //   position: "absolute",
          //   right: 5,
          //   top: 5,
          // }}
        >
          <CloseIcon />
        </CloseModalButton>
        <h2>About</h2>
        <p
          dangerouslySetInnerHTML={{
            __html: customParser(description),
          }}
        ></p>
        <h2>Channel details</h2>
        {/* <p style={{ display: "flex", gap: "5px" }}> */}
        <DescriptionItem>
          <InfoIcon /> Joined {formatDate(publishedAt)}
        </DescriptionItem>
        {/* </p> */}
        {/* <p style={{ display: "flex", gap: "5px" }}> */}
        <DescriptionItem>
          <SlideshowIcon /> {totalItemCount} videos
        </DescriptionItem>
        {/* </p> */}
      </Box>
    </Modal>
  );
};

ChannelDescriptionModal.propTypes = {
  onClose: PropTypes.func,
  open: PropTypes.bool,
  channelInfo: PropTypes.object,
};

export default ChannelDescriptionModal;
