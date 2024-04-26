import { Box, IconButton, Modal } from "@mui/material";
import React from "react";
import { modalStyle } from "../styles/styles";
import CloseIcon from "@mui/icons-material/Close";
import { customParser, formatDate } from "../../utils/utilityFunction";
import InfoIcon from "@mui/icons-material/Info";

const ChannelDescriptionModal = ({ onClose, open, channelInfo }) => {
  return (
    <Modal open={open} onClose={onClose}>
      <Box className="modalContent" sx={modalStyle}>
        <IconButton
          onClick={onClose}
          sx={{
            position: "absolute",
            right: 5,
            top: 5,
          }}
        >
          <CloseIcon />
        </IconButton>
        <h2>About</h2>
        <p
          dangerouslySetInnerHTML={{
            __html: customParser(channelInfo.snippet.description),
          }}
        ></p>
        <h2>Channel details</h2>
        <p style={{ display: "flex", gap: "5px" }}>
          <InfoIcon /> Joined {formatDate(channelInfo.snippet.publishedAt)}
        </p>
      </Box>
    </Modal>
  );
};

export default ChannelDescriptionModal;
