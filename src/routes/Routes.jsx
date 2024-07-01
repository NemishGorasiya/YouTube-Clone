import { lazy } from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Layout from "../layout/Layout";
import ProtectedRoute from "./ProtectedRoute";
import HomePage from "../pages/homePage/HomePage";
const FeedPage = lazy(() => import("../pages/feedPage/FeedPage"));
const SubscribedChannelsPage = lazy(() =>
	import("../pages/feedPage/SubscribedChannelsPage")
);
const Playlists = lazy(() => import("../components/playlists/Playlists"));
const PlaylistPage = lazy(() => import("../pages/playlistPage/PlaylistPage"));
const SearchResultPage = lazy(() =>
	import("../pages/searchResultPage/SearchResultPage")
);
const WatchVideoPage = lazy(() =>
	import("../pages/watchVideoPage/WatchVideoPage")
);
const ChannelPage = lazy(() => import("../pages/channelPage/ChannelPage"));

const route = [
	{
		path: "/",
		element: <Layout />,
		errorElement: <h1>Error</h1>,
		children: [
			{
				index: true,
				element: <HomePage />,
			},
			{
				path: "/results",
				element: <SearchResultPage />,
			},
			{
				path: "/watch",
				element: <WatchVideoPage />,
			},
			{
				path: "/channel/:channelId",
				element: <ChannelPage />,
			},
			{
				element: <ProtectedRoute />,
				children: [
					{
						path: "/feed",
						element: <FeedPage />,
						children: [
							{
								path: "playlists",
								element: <Playlists />,
							},
							{
								path: "channels",
								element: <SubscribedChannelsPage />,
							},
						],
					},
					{
						path: "/playlist",
						element: <PlaylistPage />,
					},
				],
			},
		],
	},
];

const Routes = () => {
	return <RouterProvider router={createBrowserRouter(route)} />;
};

export default Routes;
