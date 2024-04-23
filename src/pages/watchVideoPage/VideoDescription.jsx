import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import "./VideoDescription.scss";
import { useState } from "react";
import { customParser, htmlParser } from "../../utils/utilityFunction";

const VideoDescription = ({ description }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const handleToggleVisibilityOfText = () => {
    setIsExpanded((prevState) => !prevState);
  };
  return (
    description && (
      <Typography
        className={`videoDescription ${isExpanded ? "expanded" : ""}`}
        variant="body1"
        component="pre"
      >
        <span
          dangerouslySetInnerHTML={{ __html: customParser(description) }}
        ></span>
        <span
          onClick={handleToggleVisibilityOfText}
          className="toggleTextVisibilityButton"
        >
          {isExpanded ? "show less" : "...more"}
        </span>
      </Typography>
    )
  );
};

export default VideoDescription;
