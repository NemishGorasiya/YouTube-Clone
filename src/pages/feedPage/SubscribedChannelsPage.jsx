import React, { useEffect, useState } from "react";
import { getSubscribedChannels } from "../../services/services";
import useLocalStorage from "../../hooks/useLocalStorage";
import ChannelCard from "./ChannelCard";
import InfiniteScroll from "../../components/InfiniteScroll";

const SubscribedChannelsPage = () => {
  const [channels, setChannels] = useState({
    list: [],
    isLoading: true,
    nextPageToken: "",
  });
  const { list, isLoading } = channels;
  const [user, setUser] = useLocalStorage("user", {});
  const { accessToken } = user;
  const fetchSubscribedChannels = async ({
    nextPageToken,
    abortController,
  } = {}) => {
    try {
      const queryParams = {
        mine: true,
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
          list: [...prevChannels.list, ...res.items],
          isLoading: false,
          nextPageToken: res.nextPageToken,
        }));
      }
    } catch (error) {
      console.error(error);
    }
  };
  const loadMore = () => {
    if (channels.nextPageToken) {
      fetchSubscribedChannels({ nextPageToken: channels.nextPageToken });
    }
  };
  useEffect(() => {
    const abortController = new AbortController();
    fetchSubscribedChannels({ abortController: abortController });
    return () => {
      abortController.abort();
    };
  }, []);

  const renderItem = (channel) => (
    <ChannelCard key={channel.id} channel={channel} />
  );

  return (
    <InfiniteScroll
      items={list}
      fetchMoreData={loadMore}
      renderItem={renderItem}
      isLoading={isLoading}
    ></InfiniteScroll>
  );
};

export default SubscribedChannelsPage;
