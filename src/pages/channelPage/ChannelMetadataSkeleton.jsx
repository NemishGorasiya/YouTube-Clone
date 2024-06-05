import { Skeleton } from "@mui/material";
import { SubscribeButtonSkeleton } from "../../components/SubscribeButtonStyledComponents";
import {
  ChannelBannerSkeleton,
  ChannelBannerWrapper,
  ChannelDetailsWrapper,
  ChannelMetadataWrapper,
  ChannelThumbnailWrapper,
} from "./ChannelPageStyledComponents";
import SubscribeButton from "../../components/SubscribeButton";

const ChannelMetadataSkeleton = () => {
  return (
    <>
      <ChannelBannerWrapper>
        <ChannelBannerSkeleton
          animation="wave"
          variant="rounded"
          width="100%"
          height="100%"
        />
      </ChannelBannerWrapper>
      <ChannelMetadataWrapper>
        <ChannelThumbnailWrapper>
          <Skeleton
            animation="wave"
            variant="circular"
            width="100%"
            height="100%"
          />
        </ChannelThumbnailWrapper>
        <ChannelDetailsWrapper>
          <Skeleton
            animation="wave"
            variant="rounded"
            width={250}
            height={40}
          />
          <Skeleton animation="wave" variant="text" />
          <Skeleton animation="wave" variant="text" />
          <SubscribeButton>
            <SubscribeButtonSkeleton />
          </SubscribeButton>
        </ChannelDetailsWrapper>
      </ChannelMetadataWrapper>
    </>
  );
};

export default ChannelMetadataSkeleton;
