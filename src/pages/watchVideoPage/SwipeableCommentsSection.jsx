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
        swipeAreaWidth={0}
        disableSwipeToOpen={false}
        ModalProps={{
          keepMounted: true,
        }}
      >
        <SwipeableDrawerContent>
          <Puller />
          <SwipeableDrawerHeader variant="h4" component="h1">
            {formatCompactNumber(commentCount)} Comments
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
