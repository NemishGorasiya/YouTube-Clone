import HomeIcon from "@mui/icons-material/Home";
import SubscriptionsIcon from "@mui/icons-material/Subscriptions";
import StrikethroughSIcon from "@mui/icons-material/StrikethroughS";
import HistoryIcon from "@mui/icons-material/History";
import PlaylistPlayIcon from "@mui/icons-material/PlaylistPlay";
import WatchLaterIcon from "@mui/icons-material/WatchLater";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import NotificationsOffIcon from "@mui/icons-material/NotificationsOff";
import PersonRemoveIcon from "@mui/icons-material/PersonRemove";

export const SideBarLinks = [
  {
    title: "",
    links: [
      {
        icon: <HomeIcon />,
        label: "Home",
        link: "/",
      },
      {
        icon: <StrikethroughSIcon />,
        label: "Shorts",
        link: "/shorts",
      },
      {
        icon: <SubscriptionsIcon />,
        label: "Subscriptions",
        link: "/feed/subscription",
      },
    ],
  },
  {
    title: "You >",
    links: [
      {
        icon: <HistoryIcon />,
        label: "History",
        link: "/feed/history",
      },
      {
        icon: <PlaylistPlayIcon />,
        label: "Playlists",
        link: "/feed/playlists",
      },
      {
        icon: <WatchLaterIcon />,
        label: "Watch later",
        link: "/",
      },
      {
        icon: <ThumbUpIcon />,
        label: "Liked videos",
        link: "/",
      },
    ],
  },
  {
    title: "Subscriptions",
    links: [
      {
        icon: <AddCircleOutlineIcon />,
        label: "Browse channels",
        link: "/feed/subscription",
      },
    ],
  },
];

export const subscriptionStatusList = [
  {
    icon: <NotificationsNoneIcon />,
    label: "Subscribed",
  },
  {
    icon: <NotificationsOffIcon />,
    label: "Disabled",
  },
  {
    icon: <PersonRemoveIcon />,
    label: "Unsubscribe",
  },
];
