import { useParams } from "react-router-dom";
import ChannelContent from "./ChannelContent";
import ChannelMetadata from "./ChannelMetadata";
import "./ChannelPage.scss";

const ChannelPage = () => {
  const { channelId } = useParams();

  return (
    <>
      <div className="channelPage">
        <ChannelMetadata channelId={channelId} />
        {/* <ChannelContent channelId={channelId} /> */}
      </div>
    </>
  );
};

export default ChannelPage;
