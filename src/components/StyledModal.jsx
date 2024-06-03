import { memo } from "react";
import PropTypes from "prop-types";
import { Modal } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import {
  CloseModalButton,
  ModalContentComponent,
  ModalContentWrapper,
} from "./StyledModalStyledComponents";

const StyledModal = memo(({ children, open, handleClose }) => {
  return (
    <Modal open={open} onClose={handleClose}>
      <div>
        <ModalContentWrapper>
          <div>
            <CloseModalButton onClick={handleClose}>
              <CloseIcon />
            </CloseModalButton>
            <ModalContentComponent>{children}</ModalContentComponent>
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
