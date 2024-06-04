import { formatCompactNumber } from "../../utils/utilityFunction";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
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
  const { id: subscriptionId = "", snippet, contentDetails } = channel ?? {};
  const { title, description, thumbnails, resourceId } = snippet;
  const { channelId } = resourceId;
  const { totalItemCount } = contentDetails;
  const {
    high: { url: channelThumbnail },
  } = thumbnails;

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
