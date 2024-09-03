import { Skeleton } from "@mui/material";
import SubscribeButton from "../../components/SubscribeButton";
import { SubscribeButtonSkeleton } from "../../components/SubscribeButtonStyledComponents";
import {
  ChannelCardComponent,
  ChannelMetadata,
  ChannelMetadataWrapper,
  ChannelName,
  ChannelThumbnailWrapper,
} from "./SubscribedChannelsPageStyledComponents";

const ChannelCardSkeleton = () => {
  return (
    <ChannelCardComponent>
      <ChannelThumbnailWrapper>
        <Skeleton
          animation="wave"
          variant="circular"
          width="100%"
          height="100%"
        />
      </ChannelThumbnailWrapper>
      <ChannelMetadataWrapper>
        <ChannelName>
          <Skeleton animation="wave" variant="text" width={100} />
        </ChannelName>
        <ChannelMetadata>
          <Skeleton animation="wave" variant="text" width={70} />
        </ChannelMetadata>
        <ChannelMetadata>
          <Skeleton animation="wave" variant="text" />
          <Skeleton animation="wave" variant="text" />
        </ChannelMetadata>
      </ChannelMetadataWrapper>
      <SubscribeButton>
        <SubscribeButtonSkeleton />
      </SubscribeButton>
    </ChannelCardComponent>
  );
};

export default ChannelCardSkeleton;
