import PropTypes from "prop-types";
import { useCallback, useContext, useEffect, useState } from "react";
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";
import Box from "@mui/material/Box";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { httpRequest } from "../../services/services";
import { SubscriptionListContext } from "../../context/SubscriptionListContext";
import {
  ListItem,
  ListItemButton,
  ListItemIcon,
  NavBarList,
  NavBarListTitle,
  NavLinkTypography,
  StyledNavLink,
} from "./SideBarStyledComponents";
import SubscribedChannelSideBarLink from "./SubscribedChannelSideBarLink";

const SubscriptionList = ({ open }) => {
  const { channelToAdd, channelToRemove } = useContext(SubscriptionListContext);

  const [subscribedChannels, setSubscribedChannels] = useState({
    list: [],
    hasMore: false,
    nextPageToken: "",
  });

  const {
    list: subscribedChannelsList,
    hasMore: hasMoreSubscribedChannels,
    nextPageToken: subscribedChannelsNextPageToken,
  } = subscribedChannels;

  const getSubscribedChannels = useCallback(
    async ({ abortController, nextPageToken, subscriptionId } = {}) => {
      try {
        const queryParams = {
          part: "snippet,contentDetails",
          ...(subscriptionId
            ? { id: subscriptionId }
            : { mine: true, pageToken: nextPageToken }),
        };

        const res = await httpRequest({
          url: "/subscriptions",
          queryParams,
          abortController,
        });

        if (res) {
          const { items, nextPageToken: nextPageTokenFromResponse } = res;
          if (subscriptionId) {
            setSubscribedChannels((prevChannels) => ({
              ...prevChannels,
              list: [...items, ...prevChannels.list],
            }));
          } else {
            setSubscribedChannels((prevChannels) => ({
              list: nextPageToken ? [...prevChannels.list, ...items] : items,
              hasMore: !!nextPageTokenFromResponse,
              nextPageToken: nextPageTokenFromResponse,
            }));
          }
        }
      } catch (error) {
        console.error(error);
      }
    },
    []
  );

  const loadMoreSubscribedChannels = useCallback(() => {
    if (subscribedChannelsNextPageToken) {
      getSubscribedChannels({
        nextPageToken: subscribedChannelsNextPageToken,
      });
    }
  }, [getSubscribedChannels, subscribedChannelsNextPageToken]);

  useEffect(() => {
    setSubscribedChannels({
      list: [],
      hasMore: false,
      nextPageToken: "",
    });
    const abortController = new AbortController();
    getSubscribedChannels({ abortController });
    return () => {
      abortController.abort();
    };
  }, [getSubscribedChannels]);

  useEffect(() => {
    if (channelToAdd) {
      getSubscribedChannels({ subscriptionId: channelToAdd });
    }
  }, [channelToAdd, getSubscribedChannels]);

  useEffect(() => {
    if (channelToRemove) {
      setSubscribedChannels((prevChannels) => ({
        ...prevChannels,
        list: prevChannels.list.filter(
          (channel) => channel.id != channelToRemove
        ),
      }));
    }
  }, [channelToRemove]);

  return (
    open && (
      <Box>
        <NavBarList $open={open}>
          <NavBarListTitle $open={open}>Subscriptions</NavBarListTitle>
          {subscribedChannelsList.map((channel) => (
            <SubscribedChannelSideBarLink key={channel.id} channel={channel} />
          ))}

          {subscribedChannelsList.length > 0 && (
            <StyledNavLink to="/feed/channels">
              <ListItem open={open}>
                <ListItemButton $open={open}>
                  <ListItemIcon>
                    <FormatListBulletedIcon />
                  </ListItemIcon>
                  <ListItemText>
                    <NavLinkTypography variant="body2" noWrap $open={open}>
                      All subscription
                    </NavLinkTypography>
                  </ListItemText>
                </ListItemButton>
              </ListItem>
            </StyledNavLink>
          )}

          {(subscribedChannelsList.length > 5 || hasMoreSubscribedChannels) && (
            <ListItem
              open={open}
              onClick={
                hasMoreSubscribedChannels
                  ? loadMoreSubscribedChannels
                  : getSubscribedChannels
              }
            >
              <ListItemButton $open={open}>
                <ListItemIcon>
                  {hasMoreSubscribedChannels ? (
                    <KeyboardArrowDownIcon />
                  ) : (
                    <KeyboardArrowUpIcon />
                  )}
                </ListItemIcon>
                <ListItemText>
                  <NavLinkTypography variant="body2" noWrap $open={open}>
                    Show {hasMoreSubscribedChannels ? "more" : "less"}
                  </NavLinkTypography>
                </ListItemText>
              </ListItemButton>
            </ListItem>
          )}
        </NavBarList>
        <Divider />
      </Box>
    )
  );
};

SubscriptionList.propTypes = {
  open: PropTypes.bool,
};

export default SubscriptionList;
