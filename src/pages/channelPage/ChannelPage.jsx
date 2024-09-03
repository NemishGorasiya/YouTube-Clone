import { useParams } from "react-router-dom";
import ChannelContent from "./ChannelContent";
import ChannelMetadata from "./ChannelMetadata";
import { ChannelPageComponent } from "./ChannelPageStyledComponents";

const ChannelPage = () => {
  const { channelId } = useParams();

  return (
    <>
      <ChannelPageComponent>
        <ChannelMetadata channelId={channelId} />
        <ChannelContent channelId={channelId} />
      </ChannelPageComponent>
    </>
  );
};

export default ChannelPage;
