import {
  Box,
  Button,
  SwipeableDrawer,
  TextField,
  useMediaQuery,
} from "@mui/material";
import "./CommentsSection.scss";
import InfiniteScroll from "../../components/InfiniteScroll";
import Comment from "../../components/watchVideoPage/Comment";
import SwipeableCommentsSection from "./SwipeableCommentsSection";
import { useState } from "react";

const CommentsSection = ({ comments, loadMoreComments }) => {
  const isWideScreen = useMediaQuery("(min-width:1200px)");
  const { list: commentsList, isLoading: isCommentsLoading } = comments;
  // const [open, setOpen] = useState(false);

  // const toggleDrawer = (newOpen) => () => {
  //   setOpen(newOpen);
  // };

  return (
    <>
      {/* <h1>Comments</h1>
      <Box sx={{ textAlign: "center", pt: 1 }}>
        <Button onClick={toggleDrawer(true)}>Open</Button>
      </Box> */}
      {isWideScreen ? (
        <Box className="commentsSection">
          <h1>comments</h1>
          <Box className="addComment">
            <Box
              component="img"
              alt="Channel Thumbnail"
              src="https://placehold.jp/150x150.png"
            ></Box>
            <TextField
              id="standard-basic"
              label="Add a comment..."
              variant="standard"
            />
          </Box>
          <Box className="commentsContainer">
            <InfiniteScroll
              items={commentsList}
              fetchMoreData={loadMoreComments}
              renderItem={(comment) => (
                <Comment key={comment.id} snippet={comment.snippet} />
              )}
              isLoading={isCommentsLoading}
            ></InfiniteScroll>
          </Box>
        </Box>
      ) : (
        <SwipeableCommentsSection>
          <Box className="commentsSection">
            <Box className="addComment">
              <Box
                component="img"
                alt="Channel Thumbnail"
                src="https://placehold.jp/150x150.png"
              ></Box>
              <TextField
                id="standard-basic"
                label="Add a comment..."
                variant="standard"
              />
            </Box>
            <Box className="commentsContainer">
              <InfiniteScroll
                items={commentsList}
                fetchMoreData={loadMoreComments}
                renderItem={(comment) => (
                  <Comment key={comment.id} snippet={comment.snippet} />
                )}
                isLoading={isCommentsLoading}
              ></InfiniteScroll>
            </Box>
          </Box>
        </SwipeableCommentsSection>
      )}
    </>
  );
};

export default CommentsSection;
