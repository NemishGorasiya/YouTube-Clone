import { styled } from "@mui/material/styles";
import { useTheme } from "@mui/material/styles";
import List from "@mui/material/List";
import MuiListItem from "@mui/material/ListItem";
import MuiListItemButton from "@mui/material/ListItemButton";
import MuiListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Typography from "@mui/material/Typography";
import MuiTypography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import MuiBox from "@mui/material/Box";
import { SideBarLinks } from "../../utils/constant";
import { Fragment, useCallback, useContext, useEffect, useState } from "react";
import MuiDrawer from "@mui/material/Drawer";
import useMediaQuery from "@mui/material/useMediaQuery";
import PropTypes from "prop-types";
import { NavLink, useSearchParams } from "react-router-dom";
import { httpRequest } from "../../services/services";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import SignInButton from "../SignInButton";
import { AuthContext } from "../../context/AuthContext";

const DrawerHeader = styled("div")(({ theme }) => ({
  ...theme.mixins.toolbar,
}));

const ListItemButton = styled(MuiListItemButton)(({ open }) => ({
  paddingRight: "12px",
  paddingLeft: "12px",
  gap: "24px",
  height: "40px",
  position: "relative",
  ...(open
    ? {}
    : {
        flexDirection: "column",
        gap: "0",
        height: "auto",
      }),
}));

const ListItem = styled(MuiListItem)(({ theme }) => ({
  color: theme.palette.primary.main,
  borderRadius: "10px",
  padding: "0",
  "&:hover": {
    background: theme.palette.background.light,
  },
}));

const SignInSection = styled(MuiBox)(() => ({
  padding: "12px 0",
  display: "flex",
  flexDirection: "column",
  gap: "10px",
}));

const Drawer = styled(MuiDrawer)(({ theme, open }) => ({
  display: "flex",
  justifyContent: "center",
  ...(open && {
    width: "224px", // 220 + 12 + 12 (paddingX=12)
  }),
  ...(!open && {
    width: "74px",
  }),

  "& .MuiPaper-root": {
    background: theme.palette.background.default,
    color: theme.palette.primary.main,
    padding: "0 4px",
    border: "none",
    ...(open && {
      width: "224px",
      padding: "0 12px",
    }),
    ...(!open && {
      width: "72px",
    }),
  },
}));

const ListItemIcon = styled(MuiListItemIcon)(({ theme }) => ({
  color: theme.palette.primary.light,
  minWidth: 0,
  height: "24px",
  width: "24px",
}));

const ListItemIconImage = styled("img")({
  height: "100%",
  width: "100%",
  borderRadius: "50%",
  objectFit: "cover",
});
const NewItemIndicator = styled(MuiBox)(({ open }) => ({
  position: "absolute",
  height: "4px",
  width: "4px",
  borderRadius: "50%",
  top: "50%",
  right: "5px",
  transform: "translateY(-50%)",
  background: "#3EA6FF",
  ...(!open && {
    display: "none",
  }),
}));

const NavBarListTitle = styled("p")(({ open }) => ({
  paddingLeft: "13px",
  display: "flex",
  alignItems: "center",
  ...(!open && {
    display: "none",
  }),
}));

const SideBarLinksWrapper = styled(MuiBox)(() => ({
  overflowY: "auto",
  overflowX: "hidden",
  "&::-webkit-scrollbar": {
    width: "0",
  },
}));

const NavBarList = styled(List)(({ open }) =>
  open ? { maxWidth: "200px" } : { maxWidth: "100%" }
);

const NavLinkTypography = styled(MuiTypography)(({ open }) =>
  open
    ? {}
    : {
        fontSize: "10px",
        maxWidth: "50px",
      }
);

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
