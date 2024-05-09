import { useEffect, useRef, useState } from "react";
import "./CommentContent.scss";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import { customParser } from "../../utils/utilityFunction";
import PropTypes from "prop-types";

const CommentContent = ({ textDisplay }) => {
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
        component="pre"
        style={{ textWrap: "wrap" }}
        ref={commentContentRef}
        className={`commentContent ${isExpanded ? "expanded" : ""}`}
      >
        <span
          dangerouslySetInnerHTML={{ __html: customParser(textDisplay) }}
        ></span>
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
CommentContent.propTypes = {
  textDisplay: PropTypes.string,
};
export default CommentContent;
