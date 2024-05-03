import React, { useCallback, useEffect, useState } from "react";
import { getSubscribedChannels } from "../../services/services";
import useLocalStorage from "../../hooks/useLocalStorage";
import ChannelCard from "./ChannelCard";
import InfiniteScroll from "../../components/InfiniteScroll";
import Box from "@mui/material/Box";

const SubscribedChannelsPage = () => {
  const [channels, setChannels] = useState({
    list: [],
    isLoading: true,
    nextPageToken: "",
  });
  const { list, isLoading } = channels;
  const [user, setUser] = useLocalStorage("user", {});
  const { accessToken } = user;

  const fetchSubscribedChannels = useCallback(
    async ({ nextPageToken, abortController } = {}) => {
      try {
        console.log("====", {
          nextPageToken,
          abortController,
        });
        const queryParams = {
          mine: true,
          part: "snippet,contentDetails",
          pageToken: nextPageToken,
        };
        const res = await getSubscribedChannels({
          queryParams,
          accessToken,
          abortController: abortController,
        });

        if (res) {
          const { nextPageToken, items } = res;
          setChannels((prevChannels) => ({
            list: [...prevChannels.list, ...items],
            isLoading: false,
            nextPageToken: nextPageToken,
          }));
        }
      } catch (error) {
        console.error(error);
      }
    },
    [accessToken]
  );

  const loadMore = () => {
    if (channels.nextPageToken) {
      fetchSubscribedChannels({ nextPageToken: channels.nextPageToken });
    }
  };

  useEffect(() => {
    const abortController = new AbortController();
    setChannels({
      list: [],
      isLoading: true,
      nextPageToken: "",
    });
    fetchSubscribedChannels({ abortController: abortController });

    return () => {
      abortController.abort();
    };
  }, [fetchSubscribedChannels]);

  const renderItem = (channel) => (
    <ChannelCard key={channel.id} channel={channel} />
  );

  console.log("first");

  return (
    <Box
      sx={{
        maxWidth: "1300px",
        margin: "0 auto",
        display: "flex",
        flexDirection: "column",
        gap: "20px",
      }}
    >
      <InfiniteScroll
        items={list}
        fetchMoreData={loadMore}
        renderItem={renderItem}
        isLoading={isLoading}
      ></InfiniteScroll>
    </Box>
  );
};

export default SubscribedChannelsPage;
