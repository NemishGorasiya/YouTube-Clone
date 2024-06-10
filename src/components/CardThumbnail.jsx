import { useState } from "react";
import PropTypes from "prop-types";
import { isoDurationToDDHHMM } from "../utils/utilityFunction";
import {
  CardMedia,
  CardMediaWrapper,
  VideoDurationBadge,
} from "./VideoCardStyledComponents";

const CardThumbnail = ({ id, thumbnailUrl, duration }) => {
  const [isHovered, setIsHovered] = useState(false);
  return (
    <CardMediaWrapper
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {isHovered ? (
        <iframe
          src={`https:/www.youtube-nocookie.com/embed/${id}?autoplay=1&mute=1&controls=0&disablekb=1&loop=1&showinfo=0`}
          title="YouTube video player"
          allow="fullscreen"
        />
      ) : (
        <>
          <CardMedia
            component="img"
            image={thumbnailUrl}
            alt="Video Thumbnail"
          />
          {duration && (
            <VideoDurationBadge className="videoDuration">
              {isoDurationToDDHHMM(duration)}
            </VideoDurationBadge>
          )}
        </>
      )}
    </CardMediaWrapper>
  );
};

CardThumbnail.propTypes = {
  id: PropTypes.string,
  thumbnailUrl: PropTypes.string,
  duration: PropTypes.string,
};

export default CardThumbnail;
