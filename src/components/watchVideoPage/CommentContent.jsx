import { useEffect, useRef, useState } from "react";
import Box from "@mui/material/Box";
import { customParser } from "../../utils/utilityFunction";
import PropTypes from "prop-types";
import {
  CommentContentTypography,
  ReadMoreCommentContent,
} from "./CommentsStyledComponents";

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
      <CommentContentTypography
        variant="subtitle1"
        component="pre"
        ref={commentContentRef}
        $isExpanded={isExpanded}
      >
        <span dangerouslySetInnerHTML={{ __html: customParser(textDisplay) }} />
      </CommentContentTypography>
      {isExpandable && (
        <ReadMoreCommentContent variant="text" onClick={handleReadMoreBtnClick}>
          Read {isExpanded ? "less" : "more"}
        </ReadMoreCommentContent>
      )}
    </Box>
  );
};
CommentContent.propTypes = {
  textDisplay: PropTypes.string,
};
export default CommentContent;
