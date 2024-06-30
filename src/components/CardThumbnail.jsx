import { useState } from "react";
import PropTypes from "prop-types";
import { isoDurationToDDHHMM } from "../utils/utilityFunction";
import {
	CardMedia,
	CardMediaWrapper,
	VideoDurationBadge,
} from "./VideoCardStyledComponents";
import { YouTubeIframe } from "../pages/watchVideoPage/WatchVideoPageStyledComponents";

const CardThumbnail = ({ id, thumbnailUrl, duration }) => {
	const [isHovered, setIsHovered] = useState(false);

	const handleMouseOutEvent = (event) => {
		setTimeout(() => setIsHovered(false), 100);
		event.stopPropagation();
	};

	const handleMouseInEvent = () => {
		setIsHovered(true);
	};

	return (
		<CardMediaWrapper
			onMouseEnter={handleMouseInEvent}
			onMouseLeave={handleMouseOutEvent}
		>
			{isHovered ? (
				<YouTubeIframe
					src={`https:/www.youtube-nocookie.com/embed/${id}?autoplay=1&mute=1&controls=0&disablekb=1&loop=1`}
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
