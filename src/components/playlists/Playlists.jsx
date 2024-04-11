import WatchLater from "../watchLaterPage/WatchLater";
import Liked from "../liked/Liked";
import { useSearchParams } from "react-router-dom";

const Playlists = () => {
  const [searchParams] = useSearchParams();
  const listQuery = searchParams.get("list");

  return listQuery === null ? (
    <>
      <WatchLater />
      <Liked />
    </>
  ) : listQuery === "WL" ? (
    <WatchLater />
  ) : listQuery === "LL" ? (
    <Liked />
  ) : null;
};

export default Playlists;
