import { createBrowserRouter } from "react-router-dom";
import Layout from "../layout/Layout";
import ProtectedRoute from "./ProtectedRoute";
import HomePage from "../pages/homePage/HomePage";
import FeedPage from "../pages/feedPage/FeedPage";
import SubscribedChannelsPage from "../pages/feedPage/SubscribedChannelsPage";
import Playlists from "../components/playlists/Playlists";
import PlaylistPage from "../pages/playlistPage/PlaylistPage";
import SearchResultPage from "../pages/searchResultPage/SearchResultPage";
import WatchVideoPage from "../pages/watchVideoPage/WatchVideoPage";
import ChannelPage from "../pages/channelPage/ChannelPage";

export const router = createBrowserRouter([
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
]);
