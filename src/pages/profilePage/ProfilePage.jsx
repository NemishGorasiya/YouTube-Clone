import WatchLater from "../../components/watchLaterPage/WatchLater";
import Profile from "../../components/profile/Profile";
import Liked from "../../components/liked/Liked";
import History from "../../components/history/History";

const ProfilePage = () => {
  return (
    <div>
      <Profile />
      <History />
      <WatchLater />
      <Liked />
    </div>
  );
};

export default ProfilePage;
