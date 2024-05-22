import HomeIcon from "@mui/icons-material/Home";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import NotificationsOffIcon from "@mui/icons-material/NotificationsOff";
import PersonRemoveIcon from "@mui/icons-material/PersonRemove";
import PlaylistPlayIcon from "@mui/icons-material/PlaylistPlay";
import PublicOutlinedIcon from "@mui/icons-material/PublicOutlined";
import SubscriptionsIcon from "@mui/icons-material/Subscriptions";
import SubscriptionsOutlinedIcon from "@mui/icons-material/SubscriptionsOutlined";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ThumbUpOutlinedIcon from "@mui/icons-material/ThumbUpOutlined";

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
    ],
  },
  {
    title: "You ",
    isProtected: true,
    titleIcon: <KeyboardArrowRightIcon />,
    links: [
      {
        icon: <PlaylistPlayIcon />,
        filledIcon: <PlaylistPlayIcon />,
        outlinedIcon: <PlaylistPlayIcon />,
        label: "Playlists",
        link: "/feed/playlists",
      },
      {
        icon: <ThumbUpOutlinedIcon />,
        filledIcon: <ThumbUpIcon />,
        outlinedIcon: <ThumbUpOutlinedIcon />,
        label: "Liked videos",
        link: "/playlist?list=LL",
        queryKey: "list",
        queryValue: "LL",
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

export const privacyOptions = {
  public: {
    label: "Public",
    description: "Anyone can search for and view",
    icon: <PublicOutlinedIcon />,
  },
  private: {
    label: "Private",
    description: "Only you can view",
    icon: <LockOutlinedIcon />,
  },
};
