import { Button, styled } from "@mui/material";
import TuneIcon from "@mui/icons-material/Tune";
import { useState } from "react";
import StyledModal from "../../components/StyledModal";

const FiltersButton = styled(Button)(() => ({
  "&:hover": {
    background: "rgba(255, 255, 255, 0.2)",
  },
}));

const VideoFilter = () => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <>
      <FiltersButton
        onClick={handleOpen}
        variant="text"
        startIcon={<TuneIcon />}
      >
        Filters
      </FiltersButton>
      <StyledModal open={open} handleClose={handleClose}>
        hello
      </StyledModal>
    </>
  );
};

export default VideoFilter;
