import { Box, IconButton, Modal } from "@mui/material";
import React from "react";
import { modalStyle } from "../styles/styles";
import CloseIcon from "@mui/icons-material/Close";

const ChannelDescriptionModal = ({ onClose, open }) => {
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
      </Box>
    </Modal>
  );
};

export default ChannelDescriptionModal;
