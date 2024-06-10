import { useState } from "react";
import PropTypes from "prop-types";
import { Button } from "@mui/material";
import { formatCompactNumber } from "../../utils/utilityFunction";
import {
  Puller,
  SwipeableCommentsSectionComponent,
  SwipeableDrawer,
  SwipeableDrawerCommentsWrapper,
  SwipeableDrawerContent,
  SwipeableDrawerHeader,
} from "./SwipeableCommentsSectionStyledComponents";

const drawerBleeding = 0;

const SwipeableCommentsSection = ({ children, commentCount }) => {
  const [open, setOpen] = useState(false);

  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };

  return (
    <>
      <SwipeableCommentsSectionComponent>
        <h1>{formatCompactNumber(commentCount)} Comments</h1>
        <Button onClick={toggleDrawer(true)}>View comments</Button>
      </SwipeableCommentsSectionComponent>
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
        <SwipeableDrawerContent
          drawerBleeding={drawerBleeding}
          // sx={{
          //   position: "absolute",
          //   top: -drawerBleeding,
          //   borderTopLeftRadius: 8,
          //   borderTopRightRadius: 8,
          //   visibility: "visible",
          //   right: 0,
          //   left: 0,
          // }}
        >
          <Puller />
          <SwipeableDrawerHeader variant="h4" component="h1">
            Comments
          </SwipeableDrawerHeader>
        </SwipeableDrawerContent>
        <SwipeableDrawerCommentsWrapper>
          {children}
        </SwipeableDrawerCommentsWrapper>
      </SwipeableDrawer>
    </>
  );
};

SwipeableCommentsSection.propTypes = {
  children: PropTypes.node,
  commentCount: PropTypes.string,
};

export default SwipeableCommentsSection;
