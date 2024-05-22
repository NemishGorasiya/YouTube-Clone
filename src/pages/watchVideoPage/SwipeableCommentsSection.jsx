import { Box, Button, Skeleton, Typography, styled } from "@mui/material";
import MuiSwipeableDrawer from "@mui/material/SwipeableDrawer";
import React from "react";
import PropTypes from "prop-types";
import { formatCompactNumber } from "../../utils/utilityFunction";

const StyledBox = styled("div")(() => ({
  backgroundColor: "grey",
}));

const Puller = styled("div")(() => ({
  width: 60,
  height: 6,
  backgroundColor: "#fff",
  borderRadius: 3,
  position: "absolute",
  top: 8,
  left: "50%",
  transform: "translateX(-50%)",
}));

const SwipeableDrawer = styled(MuiSwipeableDrawer)(() => ({
  ".MuiPaper-root": {
    height: "75%",
    overflow: "visible",
    width: "calc(100% - 24px)",
    margin: "0 auto",
    paddingTop: "56px",
  },
}));

const drawerBleeding = 0;

const SwipeableCommentsSection = ({ children, commentCount }) => {
  const [open, setOpen] = React.useState(false);

  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };

  return (
    <>
      <Box sx={{ p: 1, background: "grey", borderRadius: 2, mt: 2 }}>
        <h1>{formatCompactNumber(commentCount)} Comments</h1>
        <Button onClick={toggleDrawer(true)}>View comments</Button>
      </Box>
      <SwipeableDrawer
        anchor="bottom"
        open={open}
        onClose={toggleDrawer(false)}
        onOpen={toggleDrawer(true)}
        swipeAreaWidth={drawerBleeding}
        disableSwipeToOpen={false}
        ModalProps={{
          keepMounted: true,
        }}
      >
        <StyledBox
          sx={{
            position: "absolute",
            top: -drawerBleeding,
            borderTopLeftRadius: 8,
            borderTopRightRadius: 8,
            visibility: "visible",
            right: 0,
            left: 0,
          }}
        >
          <Puller />
          <Typography
            variant="h4"
            component={"h1"}
            sx={{ p: 1, color: "#fff", fontWeight: "700" }}
          >
            Comments
          </Typography>
        </StyledBox>
        <StyledBox
          sx={{
            px: 2,
            p: 2,
            height: "100%",
            overflow: "auto",
          }}
        >
          {children}
          <Skeleton variant="rectangular" height="100%" />
        </StyledBox>
      </SwipeableDrawer>
    </>
  );
};

SwipeableCommentsSection.propTypes = {
  children: PropTypes.node,
};

export default SwipeableCommentsSection;
