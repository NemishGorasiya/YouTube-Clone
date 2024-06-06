import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { formatCompactNumber } from "../../utils/utilityFunction";
import SubscribeButton from "../../components/SubscribeButton";
import {
  ChannelCardComponent,
  ChannelMetadata,
  ChannelMetadataWrapper,
  ChannelName,
  ChannelThumbnail,
  ChannelThumbnailWrapper,
  CheckCircleIcon,
} from "./SubscribedChannelsPageStyledComponents";

const ChannelCard = ({ channel }) => {
  const {
    id: subscriptionId = "",
    snippet: {
      title = "",
      description = "",
      thumbnails: { high: { url: channelThumbnail = "" } = {} },
      resourceId: { channelId = "" } = {},
    } = {},
    contentDetails: { totalItemCount = "" } = {},
  } = channel || {};

  return (
    <Link to={`/channel/${channelId}`}>
      <ChannelCardComponent>
        <ChannelThumbnailWrapper>
          <ChannelThumbnail
            referrerPolicy="no-referrer"
            src={channelThumbnail}
            alt="channelThumbnail"
          />
        </ChannelThumbnailWrapper>
        <ChannelMetadataWrapper>
          <ChannelName>
            {title}
            <CheckCircleIcon />
          </ChannelName>
          <ChannelMetadata>
            {formatCompactNumber(totalItemCount)} videos
          </ChannelMetadata>
          <ChannelMetadata>{description}</ChannelMetadata>
        </ChannelMetadataWrapper>
        <SubscribeButton
          channelId={channelId}
          channelName={title}
          subscriptionId={subscriptionId}
        />
      </ChannelCardComponent>
    </Link>
  );
};

ChannelCard.propTypes = {
  channel: PropTypes.object,
};

export default ChannelCard;
