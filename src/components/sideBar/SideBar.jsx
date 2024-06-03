import { useTheme } from "@mui/material/styles";
import ListItemText from "@mui/material/ListItemText";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import { SideBarLinks } from "../../utils/constant";
import { Fragment, useCallback, useContext, useEffect, useState } from "react";

import useMediaQuery from "@mui/material/useMediaQuery";
import PropTypes from "prop-types";
import { NavLink, useSearchParams } from "react-router-dom";
import { httpRequest } from "../../services/services";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import SignInButton from "../SignInButton";
import { AuthContext } from "../../context/AuthContext";
import {
  Drawer,
  DrawerHeader,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemIconImage,
  NavBarList,
  NavBarListTitle,
  NavLinkTypography,
  SideBarLinksWrapper,
  SignInSection,
} from "./SideBarStyledComponents";

const SideBar = ({ open, toggleDrawer }) => {
  const theme = useTheme();
  const { isLoggedIn } = useContext(AuthContext);
  const isLargeScreen = useMediaQuery(theme.breakpoints.up("lg"));
  const [subscribedChannels, setSubscribedChannels] = useState({
    list: [],
    isLoading: true,
    hasMore: false,
    nextPageToken: "",
  });
  const {
    list: subscribedChannelsList,
    isLoading: isSubscribedChannelsLoading,
    hasMore: hasMoreSubscribedChannels,
    nextPageToken: subscribedChannelsNextPageToken,
  } = subscribedChannels;

  const [searchParams] = useSearchParams();
  const isActiveByQueryParam = (paramName, paramValue) => {
    const params = new URLSearchParams(searchParams);
    return params.get(paramName) === paramValue;
  };

  const getSubscribedChannels = useCallback(
    async ({ abortController, nextPageToken } = {}) => {
      try {
        const queryParams = {
          part: "snippet,contentDetails",
          mine: true,
          pageToken: nextPageToken,
        };

        const res = await httpRequest({
          url: "/subscriptions",
          queryParams,

          abortController,
        });
        if (res) {
          const { items, nextPageToken: nextPageTokenFromResponse } = res;
          setSubscribedChannels((prevChannels) => ({
            list: nextPageToken ? [...prevChannels.list, ...items] : items,
            isLoading: false,
            hasMore: !!nextPageTokenFromResponse,
            nextPageToken: nextPageTokenFromResponse,
          }));
        }
      } catch (error) {
        console.error(error);
      }
    },
    []
  );

  const handleShowLessBtnClick = () => {
    getSubscribedChannels();
  };

  const loadMoreSubscribedChannels = useCallback(() => {
    if (subscribedChannelsNextPageToken) {
      getSubscribedChannels({ nextPageToken: subscribedChannelsNextPageToken });
    }
  }, [getSubscribedChannels, subscribedChannelsNextPageToken]);

  useEffect(() => {
    if (isLoggedIn) {
      setSubscribedChannels({
        list: [],
        isLoading: true,
        hasMore: false,
        nextPageToken: "",
      });
      const abortController = new AbortController();
      getSubscribedChannels({ abortController });
      return () => {
        abortController.abort();
      };
    }
  }, [getSubscribedChannels, isLoggedIn]);

  return (
    <Drawer
      open={open}
      variant={isLargeScreen ? "permanent" : "temporary"}
      onClose={() => {
        toggleDrawer(false);
      }}
    >
      <DrawerHeader />
      <SideBarLinksWrapper>
        {SideBarLinks.map(
          (sideBarSection, idx) =>
            (!sideBarSection.isProtected || isLoggedIn) && (
              <Fragment key={idx}>
                <NavBarList open={open}>
                  <NavBarListTitle open={open}>
                    {sideBarSection.title}
                    {sideBarSection.titleIcon}
                  </NavBarListTitle>
                  {sideBarSection.links.map((link, idx) => (
                    <NavLink
                      to={link.link}
                      key={idx}
                      style={({ isActive }) =>
                        isActive &&
                        (link.queryKey
                          ? isActiveByQueryParam(link.queryKey, link.queryValue)
                          : true)
                          ? {
                              display: "block",
                              background: theme.palette.background.light,
                              borderRadius: "10px",
                            }
                          : {}
                      }
                    >
                      <ListItem key={idx} open={open}>
                        <ListItemButton open={open}>
                          <ListItemIcon>{link.icon}</ListItemIcon>
                          <ListItemText>
                            <NavLinkTypography
                              variant="body2"
                              noWrap
                              open={open}
                            >
                              {link.label}
                            </NavLinkTypography>
                          </ListItemText>
                        </ListItemButton>
                      </ListItem>
                    </NavLink>
                  ))}
                </NavBarList>
                <Divider />
              </Fragment>
            )
        )}
        {isLoggedIn && open ? (
          <>
            <NavBarList open={open}>
              <NavBarListTitle open={open}>Subscriptions</NavBarListTitle>
              {subscribedChannelsList.map((channel) => {
                const {
                  snippet: {
                    title = "",
                    thumbnails: { default: { url = "" } = {} } = {},
                    resourceId: { channelId = "" } = {},
                  } = {},
                  contentDetails: { newItemCount = 0 } = {},
                } = channel || {};

                return (
                  title && (
                    <NavLink
                      key={channelId}
                      to={`/channel/${channelId}`}
                      style={({ isActive }) =>
                        isActive
                          ? {
                              display: "block",
                              background: theme.palette.background.light,
                              borderRadius: "10px",
                            }
                          : {}
                      }
                    >
                      <ListItem open={open}>
                        <ListItemButton open={open}>
                          <ListItemIcon>
                            <ListItemIconImage
                              src={url}
                              referrerPolicy="no-referrer"
                              alt="channel logo"
                            />
                          </ListItemIcon>
                          <ListItemText>
                            <NavLinkTypography
                              variant="body2"
                              noWrap
                              open={open}
                            >
                              {title}
                            </NavLinkTypography>
                          </ListItemText>
                          {/* {newItemCount > 0 && <NewItemIndicator open={open} />} */}
                        </ListItemButton>
                      </ListItem>
                    </NavLink>
                  )
                );
              })}

              {subscribedChannelsList.length > 0 && (
                <NavLink
                  to="/feed/channels"
                  style={({ isActive }) =>
                    isActive
                      ? {
                          display: "block",
                          background: theme.palette.background.light,
                          borderRadius: "10px",
                        }
                      : {}
                  }
                >
                  <ListItem open={open}>
                    <ListItemButton open={open}>
                      <ListItemIcon>
                        <FormatListBulletedIcon />
                      </ListItemIcon>
                      <ListItemText>
                        <NavLinkTypography variant="body2" noWrap open={open}>
                          All subscription
                        </NavLinkTypography>
                      </ListItemText>
                    </ListItemButton>
                  </ListItem>
                </NavLink>
              )}

              {(subscribedChannelsList.length > 5 ||
                hasMoreSubscribedChannels) && (
                <ListItem
                  open={open}
                  onClick={
                    hasMoreSubscribedChannels
                      ? loadMoreSubscribedChannels
                      : handleShowLessBtnClick
                  }
                >
                  <ListItemButton open={open}>
                    <ListItemIcon>
                      {hasMoreSubscribedChannels ? (
                        <KeyboardArrowDownIcon />
                      ) : (
                        <KeyboardArrowUpIcon />
                      )}
                    </ListItemIcon>
                    <ListItemText>
                      <NavLinkTypography variant="body2" noWrap open={open}>
                        Show {hasMoreSubscribedChannels ? "more" : "less"}
                      </NavLinkTypography>
                    </ListItemText>
                  </ListItemButton>
                </ListItem>
              )}
            </NavBarList>
            <Divider />
          </>
        ) : (
          open && (
            <>
              <SignInSection>
                <Typography variant="body1">
                  Sign in to like videos, comment, and subscribe.
                </Typography>
                <SignInButton />
              </SignInSection>
              <Divider />
            </>
          )
        )}
      </SideBarLinksWrapper>
    </Drawer>
  );
};

SideBar.propTypes = {
  open: PropTypes.bool,
  toggleDrawer: PropTypes.func,
};

export default SideBar;
