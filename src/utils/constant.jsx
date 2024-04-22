import HomeIcon from "@mui/icons-material/Home";
import SubscriptionsIcon from "@mui/icons-material/Subscriptions";
import StrikethroughSIcon from "@mui/icons-material/StrikethroughS";
import HistoryIcon from "@mui/icons-material/History";
import PlaylistPlayIcon from "@mui/icons-material/PlaylistPlay";
import WatchLaterIcon from "@mui/icons-material/WatchLater";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";

export const SideBarLinks = [
  {
    title: "",
    links: [
      {
        icon: <HomeIcon />,
        label: "Home",
        navigateTo: "/",
      },
      {
        icon: <StrikethroughSIcon />,
        label: "Shorts",
        navigateTo: "/",
      },
      {
        icon: <SubscriptionsIcon />,
        label: "Subscriptions",
        navigateTo: "/",
      },
    ],
  },
  {
    title: "You >",
    links: [
      {
        icon: <HistoryIcon />,
        label: "History",
        navigateTo: "/",
      },
      {
        icon: <PlaylistPlayIcon />,
        label: "Playlists",
        navigateTo: "/",
      },
      {
        icon: <WatchLaterIcon />,
        label: "Watch later",
        navigateTo: "/",
      },
      {
        icon: <ThumbUpIcon />,
        label: "Liked videos",
        navigateTo: "/",
      },
    ],
  },
  {
    title: "Subscriptions",
    links: [
      {
        icon: <AddCircleOutlineIcon />,
        label: "Browse channels",
        navigateTo: "/",
      },
    ],
  },
];
