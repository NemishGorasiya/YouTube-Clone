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
      },
      {
        icon: <StrikethroughSIcon />,
        label: "Shorts",
      },
      {
        icon: <SubscriptionsIcon />,
        label: "Subscriptions",
      },
    ],
  },
  {
    title: "You >",
    links: [
      {
        icon: <HistoryIcon />,
        label: "History",
      },
      {
        icon: <PlaylistPlayIcon />,
        label: "Playlists",
      },
      {
        icon: <WatchLaterIcon />,
        label: "Watch later",
      },
      {
        icon: <ThumbUpIcon />,
        label: "Liked videos",
      },
    ],
  },
  {
    title: "Subscriptions",
    links: [
      {
        icon: <AddCircleOutlineIcon />,
        label: "Browse channels",
      },
    ],
  },
];
