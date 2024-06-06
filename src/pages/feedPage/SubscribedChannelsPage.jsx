import { useCallback, useContext, useEffect, useState } from "react";
import { httpRequest } from "../../services/services";
import { SubscriptionListContext } from "../../context/SubscriptionListContext";
import ChannelCard from "./ChannelCard";
import ChannelCardSkeleton from "./ChannelCardSkeleton";
import { SubscribedChannelsPageComponent } from "./SubscribedChannelsPageStyledComponents";
import InfiniteScroll from "../../components/InfiniteScroll";

const SubscribedChannelsPage = () => {
  const { channelToRemove } = useContext(SubscriptionListContext);
  const [channels, setChannels] = useState({
    list: [],
    isLoading: true,
    nextPageToken: "",
  });

  const { list, isLoading } = channels;

  const getSubscribedChannels = useCallback(
    async ({ nextPageToken, abortController } = {}) => {
      try {
        const queryParams = {
          mine: true,
          part: "snippet,contentDetails",
          pageToken: nextPageToken,
        };
        const res = await httpRequest({
          url: "/subscriptions",
          queryParams,
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
    []
  );

  const loadMore = () => {
    if (channels.nextPageToken) {
      getSubscribedChannels({ nextPageToken: channels.nextPageToken });
    }
  };

  useEffect(() => {
    const abortController = new AbortController();
    setChannels({
      list: [],
      isLoading: true,
      nextPageToken: "",
    });
    getSubscribedChannels({ abortController: abortController });
    return () => {
      abortController.abort();
    };
  }, [getSubscribedChannels]);

  useEffect(() => {
    if (channelToRemove) {
      setChannels((prevChannels) => ({
        ...prevChannels,
        list: prevChannels.list.filter(
          (channel) => channel.id != channelToRemove
        ),
      }));
    }
  }, [channelToRemove]);

  const renderItem = (channel) => (
    <ChannelCard key={channel.id} channel={channel} />
  );

  return (
    <SubscribedChannelsPageComponent>
      <InfiniteScroll
        items={list}
        fetchMoreData={loadMore}
        renderItem={renderItem}
        isLoading={isLoading}
        skeletonItem={<ChannelCardSkeleton />}
      />
    </SubscribedChannelsPageComponent>
  );
};

export default SubscribedChannelsPage;
