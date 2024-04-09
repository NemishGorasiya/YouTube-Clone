import { createBrowserRouter } from "react-router-dom";
import Layout from "../layout/Layout";
import HomePage from "../pages/homePage/HomePage";
import ShortsPage from "../pages/shortsPage/ShortsPage";
import ProfilePage from "../pages/profilePage/ProfilePage";
import FeedPage from "../pages/feedPage/FeedPage";
import SubscriptionPage from "../pages/subscriptionPage/SubscriptionPage";
import History from "../components/history/History";
import Playlists from "../components/playlists/Playlists";
import SearchResultPage from "../pages/searchResultPage/SearchResultPage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: "/shorts",
        element: <ShortsPage />,
      },
      {
        path: "/results",
        element: <SearchResultPage />,
      },
      {
        path: "/feed",
        element: <FeedPage />,
        children: [
          {
            path: "you",
            element: <ProfilePage />,
          },
          {
            path: "subscription",
            element: <SubscriptionPage />,
          },
          {
            path: "history",
            element: <History />,
          },
          {
            path: "playlists",
            element: <Playlists />,
          },
        ],
      },
      {
        path: "playlists",
        element: <Playlists />,
      },
    ],
  },
]);
