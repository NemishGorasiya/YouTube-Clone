import "./Comment.scss";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ThumbDownIcon from "@mui/icons-material/ThumbDown";
import { useEffect, useRef } from "react";
import CommentContent from "./CommentContent";

const Comment = () => {
  return (
    <Box className="comment">
      <Box
        component="img"
        alt="Channel Thumbnail"
        src="https://placehold.jp/150x150.png"
      ></Box>
      <Box className="commentDetails">
        <Box className="commentMetadata">
          <Typography
            className="commentAuthorName"
            variant="subtitle1"
            component="span"
          >
            {
              "@nemish dvg hgsdvhdsh hdbhhbd dshbdjhbjd jhdbsjdvg hgsdvhdsh hdbhhbd dshbdjhbjd jhdbsjdb dbj dhbjhbvg hgsdvhdsh hdbhhbd dshbdjhbjd jhdbsjdb dbj dhbjhbvg hgsdvhdsh hdbhhbd dshbdjhbjd vg hgsdvhdsh hdbhhbd dshbdjhbjd jhdbsjdb dbj dhbjhbvg hgsdvhdsh hdbhhbd dshbdjhbjd jhdbsjdb dbj dhbjhbvg hgsdvhdsh hdbhhbd dshbdjhbjd jhdbsjdb dbj dhbjhbvg hgsdvhdsh hdbhhbd dshbdjhbjd jhdbsjdb dbj dhbjhbvg hgsdvhdsh hdbhhbd dshbdjhbjd jhdbsjdb dbj dhbjhbvg hgsdvhdsh hdbhhbd dshbdjhbjd jhdbsjdb dbj dhbjhbvg hgsdvhdsh hdbhhbd dshbdjhbjd jhdbsjdb dbj dhbjhbvg hgsdvhdsh hdbhhbd dshbdjhbjd jhdbsjdb dbj dhbjhbvg hgsdvhdsh hdbhhbd dshbdjhbjd jhdbsjdb dbj dhbjhbvg hgsdvhdsh hdbhhbd dshbdjhbjd jhdbsjdb dbj dhbjhbvg hgsdvhdsh hdbhhbd dshbdjhbjd jhdbsjdb dbj dhbjhbjhdbsjdb dbj dhbjhbvg hgsdvhdsh hdbhhbd dshbdjhbjd jhdbsjdb dbj dhbjhbb dbj dhbjhb sjdbjs dj jsjdj hdbjhbsjbj sdjhdbjbsdj djhbdsjhbdb dhdsjbbjhs dhbshbjhbsbhb d bjhsbdjhsbd hbdhbdsjhbdjh jhdbhbshb djhbhdb jhsb jh "
            }
          </Typography>
          <Typography variant="subtitle1" component="span">
            {"45 minutes ago"}
          </Typography>
        </Box>
        <CommentContent />
        <Box className="commentEngagement">
          <ThumbUpIcon />
          {" 159 "}
          <ThumbDownIcon />
          <Button variant="text">Reply</Button>
        </Box>
      </Box>
    </Box>
  );
};

export default Comment;
