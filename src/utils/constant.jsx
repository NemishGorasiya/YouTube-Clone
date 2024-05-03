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
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import SubscriptionsOutlinedIcon from "@mui/icons-material/SubscriptionsOutlined";
import WatchLaterOutlinedIcon from "@mui/icons-material/WatchLaterOutlined";
import ThumbUpOutlinedIcon from "@mui/icons-material/ThumbUpOutlined";
import AddCircleOutlineOutlinedIcon from "@mui/icons-material/AddCircleOutlineOutlined";

export const SideBarLinks = [
  {
    title: "",
    links: [
      {
        icon: <HomeOutlinedIcon />,
        filledIcon: <HomeIcon />,
        outlinedIcon: <HomeOutlinedIcon />,
        label: "Home",
        link: "/",
      },
      {
        icon: <StrikethroughSIcon />,
        filledIcon: <StrikethroughSIcon />,
        outlinedIcon: <StrikethroughSIcon />,
        label: "Shorts",
        link: "/shorts",
      },
      {
        icon: <SubscriptionsOutlinedIcon />,
        filledIcon: <SubscriptionsIcon />,
        outlinedIcon: <SubscriptionsOutlinedIcon />,
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
        filledIcon: <HistoryIcon />,
        outlinedIcon: <HistoryIcon />,
        label: "History",
        link: "/feed/history",
      },
      {
        icon: <PlaylistPlayIcon />,
        filledIcon: <PlaylistPlayIcon />,
        outlinedIcon: <PlaylistPlayIcon />,
        label: "Playlists",
        link: "/feed/playlists",
      },
      {
        icon: <WatchLaterOutlinedIcon />,
        filledIcon: <WatchLaterIcon />,
        outlinedIcon: <WatchLaterOutlinedIcon />,
        label: "Watch later",
        link: "/playlist?list=WL",
      },
      {
        icon: <ThumbUpOutlinedIcon />,
        filledIcon: <ThumbUpIcon />,
        outlinedIcon: <ThumbUpOutlinedIcon />,
        label: "Liked videos",
        link: "/playlist?list=LL",
      },
      {
        icon: <SubscriptionsOutlinedIcon />,
        filledIcon: <SubscriptionsIcon />,
        outlinedIcon: <SubscriptionsOutlinedIcon />,
        label: "Subscriptions",
        link: "/feed/channels",
      },
    ],
  },
  {
    title: "Browse Channels",
    links: [
      {
        icon: <AddCircleOutlineIcon />,
        filledIcon: <AddCircleOutlineOutlinedIcon />,
        outlinedIcon: <AddCircleOutlineIcon />,
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
