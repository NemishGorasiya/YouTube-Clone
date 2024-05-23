import { useCallback, useEffect, useState } from "react";
import VideoSlider from "../../components/VideoSlider";
import { httpRequest } from "../../services/services";
import Loader from "../../components/loader/Loader";
import useLocalStorage from "../../hooks/useLocalStorage";
import { styled } from "@mui/material";
import MuiDivider from "@mui/material/Divider";
import MuiBox from "@mui/material/Box";

const ChannelHomePageContent = ({ channelId }) => {
  const [channelSections, setChannelSections] = useState({
    list: [],
    isLoading: true,
  });
  const [user] = useLocalStorage("user", {});
  const { accessToken } = user;
  const { list, isLoading } = channelSections;
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
            isLoading: false,
          });
        }
      } catch (error) {
        console.error(error);
      }
    },
    [accessToken, channelId]
  );

  const ContentWrapper = styled(MuiBox)(() => ({
    display: "flex",
    flexDirection: "column",
    gap: "16px",
  }));

  const Divider = styled(MuiDivider)(() => ({
    borderBottomWidth: "1px",
    background: "grey",
  }));

  useEffect(() => {
    const abortController = new AbortController();
    getChannelSections({ abortController: abortController });
    return () => {
      abortController.abort();
    };
  }, [getChannelSections]);
  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <ContentWrapper>
          {list.map(
            (section) =>
              section?.contentDetails?.playlists?.length && (
                <>
                  <VideoSlider
                    key={section.id}
                    playlistId={section.contentDetails.playlists[0]}
                  />
                  <Divider />
                </>
              )
          )}
        </ContentWrapper>
      )}
    </>
  );
};

export default ChannelHomePageContent;
