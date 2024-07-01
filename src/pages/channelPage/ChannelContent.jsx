import { useCallback, useState } from "react";
import PropTypes from "prop-types";
import { Box } from "@mui/material";
import VideoGallery from "../../components/VideoGallery";
import ChannelHomePageContent from "./ChannelHomePageContent";
import Playlists from "../../components/playlists/Playlists";
import { channelSectionTabs } from "../../utils/constant";
import {
	ChannelSectionTab,
	TabsList,
	TabsWrapper,
	VideoGalleryWrapper,
} from "./ChannelContentStyledComponents";

const ChannelContent = ({ channelId }) => {
	const [currentContentCategory, setCurrentContentCategory] = useState("home");

	const handleTabClick = useCallback((event) => {
		const category = event.target
			.closest("[data-category]")
			.getAttribute("data-category");
		setCurrentContentCategory(category);
	}, []);

	return (
		<div>
			<TabsWrapper>
				<TabsList>
					{channelSectionTabs.map((tab) => {
						const { label, value } = tab || {};
						return (
							<ChannelSectionTab
								key={value}
								data-category={value}
								onClick={handleTabClick}
								$isActive={value === currentContentCategory}
							>
								{label}
							</ChannelSectionTab>
						);
					})}
				</TabsList>
			</TabsWrapper>
			<Box>
				{currentContentCategory === "home" && (
					<ChannelHomePageContent channelId={channelId} />
				)}
				{currentContentCategory === "videos" && (
					<VideoGalleryWrapper>
						<VideoGallery
							queryParams={{
								part: "snippet",
								channelId,
								maxResults: 10,
							}}
							url="/search"
						/>
					</VideoGalleryWrapper>
				)}
				{currentContentCategory === "playlists" && (
					<Playlists channelId={channelId} />
				)}
			</Box>
		</div>
	);
};

ChannelContent.propTypes = {
	channelId: PropTypes.string.isRequired,
};

export default ChannelContent;
