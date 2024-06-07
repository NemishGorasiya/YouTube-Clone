import { useCallback, useEffect, useState } from "react";
import PropTypes from "prop-types";
import RenderIfVisible from "react-render-if-visible";
import { httpRequest } from "../../services/services";
import useLocalStorage from "../../hooks/useLocalStorage";
import VideoSlider from "../../components/VideoSlider";
import { ContentWrapper, Divider } from "./ChannelContentStyledComponents";

const ChannelHomePageContent = ({ channelId }) => {
	const [channelSections, setChannelSections] = useState({
		list: [],
	});
	const [user] = useLocalStorage("user", {});
	const { accessToken } = user;
	const { list } = channelSections;
	const getChannelSections = useCallback(
		async ({ abortController }) => {
			const queryParams = {
				part: "snippet,contentDetails",
				channelId,
			};
			const headers = {
				Authorization: `Bearer ${accessToken}`,
			};
			try {
				const res = await httpRequest({
					url: "/channelSections",
					queryParams,
					abortController,
					headers,
				});
				if (res) {
					const { items } = res;
					setChannelSections({
						list: items,
					});
				}
			} catch (error) {
				console.error(error);
			}
		},
		[accessToken, channelId]
	);

	useEffect(() => {
		const abortController = new AbortController();
		getChannelSections({ abortController: abortController });
		return () => {
			abortController.abort();
		};
	}, [getChannelSections]);

	return (
		<>
			<ContentWrapper>
				{list.map(
					(section) =>
						section?.contentDetails?.playlists?.length && (
							<>
								<RenderIfVisible stayRendered={true}>
									<VideoSlider
										key={section.id}
										playlistId={section.contentDetails.playlists[0]}
									/>
									<Divider />
								</RenderIfVisible>
							</>
						)
				)}
			</ContentWrapper>
		</>
	);
};

ChannelHomePageContent.propTypes = {
	channelId: PropTypes.string,
};

export default ChannelHomePageContent;
