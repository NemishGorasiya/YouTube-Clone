import { createContext, useState } from "react";
import PropTypes from "prop-types";

export const SubscriptionListContext = createContext();

export const SubscriptionListContextProvider = ({ children }) => {
  const [channelToAdd, setChannelToAdd] = useState("");
  const [channelToRemove, setChannelToRemove] = useState("");

  const handleAddChannel = (channelId) => {
    setChannelToAdd(channelId);
  };

  const handleRemoveChannel = (channelId) => {
    setChannelToRemove(channelId);
    channelId;
  };

  return (
    <SubscriptionListContext.Provider
      value={{
        channelToAdd,
        channelToRemove,
        handleAddChannel,
        handleRemoveChannel,
      }}
    >
      {children}
    </SubscriptionListContext.Provider>
  );
};

SubscriptionListContextProvider.propTypes = {
  children: PropTypes.node,
};
