import { useParams } from "react-router-dom";
import ChannelContent from "./ChannelContent";
import ChannelMetadata from "./ChannelMetadata";
import "./ChannelPage.scss";

const ChannelPage = () => {
  const { channelId } = useParams();

  return (
    <>
      <div className="channelPage">
        <div className="channelBanner">
          <img
            src="https://yt3.googleusercontent.com/DpZFSiLFuhvgUL7b6MqNQZK8mtQBx57BdY3R_xvOnrHpFhkFuzjboz6CMgbnEr8bNiJ91Bwg=w2120-fcrop64=1,00005a57ffffa5a8-k-c0xffffffff-no-nd-rj"
            alt="channel-banner"
          />
        </div>
        <ChannelMetadata channelId={channelId} />
        <ChannelContent channelId={channelId} />
      </div>
    </>
  );
};

export default ChannelPage;
