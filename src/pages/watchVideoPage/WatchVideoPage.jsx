import { useSearchParams } from "react-router-dom";

const WatchVideoPage = () => {
  const [searchParams] = useSearchParams();
  const videoId = searchParams.get("v");
  return <div>WatchVideoPage {videoId}</div>;
};

export default WatchVideoPage;
