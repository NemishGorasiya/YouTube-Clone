import { useState } from "react";
import { customParser } from "../../utils/utilityFunction";
import PropTypes from "prop-types";
import {
  ToggleButton,
  VideoDescriptionComponent,
} from "./VideoDescriptionStyledComponents";

const VideoDescription = ({ description, parentRef }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const handleToggleVisibilityOfText = () => {
    setIsExpanded((prevState) => !prevState);

    parentRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
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
  parentRef: PropTypes.object,
};

export default VideoDescription;
