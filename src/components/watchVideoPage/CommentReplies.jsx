import React, { useCallback, useEffect, useState } from "react";
import { httpRequest } from "../../services/services";
import Comment from "./Comment";
import { Button } from "@mui/material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import PropTypes from "prop-types";

const CommentReplies = ({ list }) => {
  return (
    <>
      {list.map((commentReply) => (
        <Comment
          key={commentReply.id}
          snippet={commentReply.snippet}
          commentId={commentReply.snippet.parentId}
        />
      ))}
    </>
  );
};

CommentReplies.propTypes = {
  parentId: PropTypes.string,
  accessToken: PropTypes.string,
  totalReplyCount: PropTypes.number,
};

export default CommentReplies;
