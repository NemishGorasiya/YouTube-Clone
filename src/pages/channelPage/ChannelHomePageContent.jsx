import { useCallback, useEffect, useState } from "react";
import VideoSlider from "../../components/VideoSlider";
import { fetchChannelSections } from "../../services/services";
import Loader from "../../components/loader/Loader";
import useLocalStorage from "../../hooks/useLocalStorage";

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
        key: import.meta.env.VITE_GOOGLE_API_KEY,
      };
      try {
        const res = await fetchChannelSections({
          queryParams,
          abortController,
          accessToken,
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
  useEffect(() => {
    // const abortController = new AbortController();
    // getChannelSections({ abortController: abortController });
    // return () => {
    //   abortController.abort();
    // };
  }, [getChannelSections]);
  return (
    <>
      {false ? (
        <Loader />
      ) : (
        // list.map((section) => <h1 key={section.id}>{section.snippet.type}</h1>)
        <VideoSlider playlistId={"PL9K3xwFkFqWEUOC39i3GD1mio7QMGveuU"} />
      )}
    </>
  );
};

export default ChannelHomePageContent;
