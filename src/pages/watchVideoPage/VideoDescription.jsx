import Typography from "@mui/material/Typography";
import { useState } from "react";
import { customParser } from "../../utils/utilityFunction";
import "./VideoDescription.scss";
import PropTypes from "prop-types";

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

VideoDescription.propTypes = {
  description: PropTypes.string,
};

export default VideoDescription;
