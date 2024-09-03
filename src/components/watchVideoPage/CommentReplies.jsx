import Comment from "./Comment";
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
  list: PropTypes.array,
};

export default CommentReplies;
