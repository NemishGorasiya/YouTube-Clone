import Typography from "@mui/material/Typography";
import { useState } from "react";
import { customParser } from "../../utils/utilityFunction";
import PropTypes from "prop-types";
import { styled } from "@mui/material";

const VideoDescriptionComponent = styled(Typography)(({ isExpanded }) => ({
  display: isExpanded ? "block" : "-webkit-box",
  WebkitLineClamp: 2,
  WebkitBoxOrient: "vertical",
  overflow: "hidden",
  textOverflow: "ellipsis",
  position: "relative",
  textWrap: "wrap",
  wordBreak: "break-word",
}));

const ToggleButton = styled("span")(({ theme }) => ({
  position: "absolute",
  paddingLeft: "8px",
  cursor: "pointer",
  bottom: 0,
  right: 0,
  background: theme.palette.background.secondary,
}));

const VideoDescription = ({ description }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const handleToggleVisibilityOfText = () => {
    setIsExpanded((prevState) => !prevState);
  };
  return (
    description && (
      <VideoDescriptionComponent
        isExpanded={isExpanded}
        className={`videoDescription ${isExpanded ? "expanded" : ""}`}
        variant="body1"
        component="pre"
      >
        <span dangerouslySetInnerHTML={{ __html: customParser(description) }} />
        <ToggleButton
          onClick={handleToggleVisibilityOfText}
          className="toggleTextVisibilityButton"
        >
          {isExpanded ? "show less" : "...more"}
        </ToggleButton>
      </VideoDescriptionComponent>
    )
  );
};

VideoDescription.propTypes = {
  description: PropTypes.string,
};

export default VideoDescription;
