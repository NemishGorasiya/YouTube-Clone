import { memo } from "react";
import PropTypes from "prop-types";
import { IconButton, styled, Modal } from "@mui/material";
import MuiBox from "@mui/material/Box";
import CloseIcon from "@mui/icons-material/Close";

const ModalContentWrapper = styled(MuiBox)(({ theme }) => ({
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  minWidth: 300,
  maxWidth: "90%",
  boxShadow: 24,
  padding: "40px 16px",
  borderRadius: "12px",
  outline: "none",
  background: theme.palette.background.light,
}));

const CloseModalButton = styled(IconButton)(() => ({
  position: "absolute",
  right: 5,
  top: 5,
}));

const StyledModal = memo(({ children, open, handleClose }) => {
  return (
    <Modal open={open} onClose={handleClose}>
      <div>
        <ModalContentWrapper>
          <div>
            <CloseModalButton onClick={handleClose}>
              <CloseIcon />
            </CloseModalButton>
            {children}
          </div>
        </ModalContentWrapper>
      </div>
    </Modal>
  );
});

StyledModal.propTypes = {
  children: PropTypes.node.isRequired,
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
};

StyledModal.displayName = "StyledModal";

export default StyledModal;
