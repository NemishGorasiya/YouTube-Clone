import { createContext, useMemo, useState } from "react";
import PropTypes from "prop-types";

export const SubscriptionListContext = createContext();

export const SubscriptionListContextProvider = ({ children }) => {
	const [channelToAdd, setChannelToAdd] = useState("");
	const [channelToRemove, setChannelToRemove] = useState("");

	const addChannel = (channelId) => {
		setChannelToAdd(channelId);
	};

	const removeChannel = (channelId) => {
		setChannelToRemove(channelId);
		channelId;
	};

	const contextValue = useMemo(
		() => ({
			channelToAdd,
			channelToRemove,
			addChannel,
			removeChannel,
		}),
		[channelToAdd, channelToRemove]
	);

	return (
		<SubscriptionListContext.Provider value={contextValue}>
			{children}
		</SubscriptionListContext.Provider>
	);
};

SubscriptionListContextProvider.propTypes = {
	children: PropTypes.node,
};
