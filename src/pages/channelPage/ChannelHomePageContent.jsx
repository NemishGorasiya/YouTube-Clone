import { useCallback, useEffect, useState } from "react";
import PropTypes from "prop-types";
import RenderIfVisible from "react-render-if-visible";
import { httpRequest } from "../../services/services";
import VideoSlider from "../../components/VideoSlider";
import { ContentWrapper, Divider } from "./ChannelContentStyledComponents";
import VideoGallery from "../../components/VideoGallery";

const ChannelHomePageContent = ({ channelId }) => {
  const [channelSections, setChannelSections] = useState({
    list: [],
    isLoading: true,
  });
  const [
    isChannelSectionPlaylistsAvailable,
    setIsChannelSectionPlaylistsAvailable,
  ] = useState(false);
  const { list, isLoading } = channelSections;

  const getChannelSections = useCallback(
    async ({ signal } = {}) => {
      const queryParams = {
        part: "snippet,contentDetails",
        channelId,
      };
      try {
        const res = await httpRequest({
          url: "/channelSections",
          queryParams,
          signal,
        });
        if (res) {
          const { items } = res;
          const isChannelSectionPlaylistsAvailable = items.some(
            (section) => section?.contentDetails?.playlists?.length
          );
          setIsChannelSectionPlaylistsAvailable(
            isChannelSectionPlaylistsAvailable
          );
          setChannelSections({
            list: items,
            isLoading: false,
          });
        }
      } catch (error) {
        console.error(error);
      }
    },
    [channelId]
  );

  useEffect(() => {
    const abortController = new AbortController();
    getChannelSections({ signal: abortController.signal });
    return () => {
      abortController.abort();
    };
  }, [getChannelSections]);

  if (!isLoading && !isChannelSectionPlaylistsAvailable) {
    return (
      <VideoGallery
        queryParams={{
          part: "snippet",
          channelId,
          maxResults: 10,
        }}
        url="/search"
      />
    );
  }

  return (
    <ContentWrapper>
      {list.map(
        (section) =>
          section?.contentDetails?.playlists?.length && (
            <RenderIfVisible
              key={section.id}
              stayRendered={true}
              visibleOffset={600}
            >
              <VideoSlider playlistId={section.contentDetails.playlists[0]} />
              <Divider />
            </RenderIfVisible>
          )
      )}
    </ContentWrapper>
  );
};

ChannelHomePageContent.propTypes = {
  channelId: PropTypes.string,
};

export default ChannelHomePageContent;
