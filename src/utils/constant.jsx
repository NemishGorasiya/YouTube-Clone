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
import {
	getDateOfToday,
	getDateOfStartOfCurrentHour,
	getDateOfStartOfMonth,
	getDateOfStartOfWeek,
	getDateOfStartOfYear,
} from "./utilityFunction.js";
import ContrastIcon from "@mui/icons-material/Contrast";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";

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
			// {
			//   icon: <SubscriptionsOutlinedIcon />,
			//   filledIcon: <SubscriptionsIcon />,
			//   outlinedIcon: <SubscriptionsOutlinedIcon />,
			//   label: "Subscriptions",
			//   link: "/feed/channels",
			// },
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

export const channelSectionTabs = [
	{
		label: "Home",
		value: "home",
	},
	{
		label: "Videos",
		value: "videos",
	},
	{
		label: "Playlists",
		value: "playlists",
	},
];

export const commentsAreOffGooglePageLink =
	"https://support.google.com/youtube/answer/9706180?hl=en";

export const filterFields = [
	{
		title: "SORT BY",
		filterKey: "order",
		fields: [
			{
				label: "Relevance",
				value: "relevance",
			},
			{
				label: "Upload date",
				value: "date",
			},
			{
				label: "View count",
				value: "viewCount",
			},
			{
				label: "Rating",
				value: "rating",
			},
			{
				label: "By title",
				value: "title",
			},
			{
				label: "Video count",
				value: "videoCount",
			},
		],
	},
	{
		title: "DIMENSIONS",
		filterKey: "videoDimension",
		fields: [
			{
				label: "2D",
				value: "2d",
			},
			{
				label: "3D",
				value: "3d",
			},
		],
	},
	{
		title: "DURATION",
		filterKey: "videoDuration",
		fields: [
			{
				label: "Under 4 minutes",
				value: "short",
			},
			{
				label: "4 - 20 minutes",
				value: "medium",
			},
			{
				label: "Over 20 minutes",
				value: "long",
			},
		],
	},
	{
		title: "EVENT TYPE",
		filterKey: "eventType",
		fields: [
			{
				label: "Completed",
				value: "completed",
			},
			{
				label: "live",
				value: "live",
			},
			{
				label: "Upcoming",
				value: "upcoming",
			},
		],
	},
	{
		title: "UPLOAD DATE",
		filterKey: "publishedAfter",
		fields: [
			{
				label: "Last hour",
				value: getDateOfStartOfCurrentHour(),
			},
			{
				label: "Today",
				value: getDateOfToday(),
			},
			{
				label: "This week",
				value: getDateOfStartOfWeek(),
			},
			{
				label: "This month",
				value: getDateOfStartOfMonth(),
			},
			{
				label: "This year",
				value: getDateOfStartOfYear(),
			},
		],
	},
	{
		title: "SAFE SEARCH",
		filterKey: "safeSearch",
		fields: [
			{
				label: "Moderate",
				value: "moderate",
			},
			{
				label: "None",
				value: "none",
			},
			{
				label: "Strict",
				value: "strict",
			},
		],
	},
];

export const themeMenuList = [
	{
		label: "Use device theme",
		value: "systemPreference",
		icon: <ContrastIcon fontSize="small" />,
	},
	{
		label: "Dark theme",
		value: "dark",
		icon: <DarkModeIcon fontSize="small" />,
	},
	{
		label: "Light theme",
		value: "light",
		icon: <LightModeIcon fontSize="small" />,
	},
];

export const nprogressConfig = {
	showSpinner: false,
	easing: "ease",
	speed: 1000,
};

export const noInternetBase64Url =
	"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";
