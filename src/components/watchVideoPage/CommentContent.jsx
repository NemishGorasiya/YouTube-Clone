import { useEffect, useRef, useState } from "react";
import "./CommentContent.scss";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";

const CommentContent = () => {
  const commentContentRef = useRef(null);
  const [isExpanded, setIsExpanded] = useState(false);
  const [isExpandable, setIsExpandable] = useState(false);

  const handleReadMoreBtnClick = () => {
    setIsExpanded((prevState) => !prevState);
  };

  useEffect(() => {
    if (commentContentRef.current.scrollHeight > 80) {
      setIsExpandable(true);
    }
  }, []);

  return (
    <Box className="commentContentWrapper">
      <Typography
        variant="subtitle1"
        component="p"
        ref={commentContentRef}
        className={`commentContent ${isExpanded ? "expanded" : ""}`}
      >
        {"comment will go here..."}
      </Typography>
      {isExpandable && (
        <Button
          className="readMoreBtn"
          variant="text"
          onClick={handleReadMoreBtnClick}
        >
          Read {isExpanded ? "less" : "more"}
        </Button>
      )}
    </Box>
  );
};

export default CommentContent;
