import {
  customParser,
  formatCompactNumber,
  highQualityImage,
} from "../../utils/utilityFunction";
import { useCallback, useEffect, useState } from "react";
import { httpRequest } from "../../services/services";
import ChannelDescriptionModal from "../../components/channelPage/ChannelDescriptionModal";
import Loader from "../../components/loader/Loader";
import SubscribeButton from "../../components/SubscribeButton";
import PropTypes from "prop-types";
import {
  ChannelBanner,
  ChannelBannerWrapper,
  ChannelDetailsWrapper,
  ChannelMetadataWrapper,
  ChannelThumbnail,
  ChannelThumbnailWrapper,
  KeyboardArrowRightStyledIcon,
  Typography,
} from "./ChannelPageStyledComponents";
import ChannelMetadataSkeleton from "./ChannelMetadataSkeleton";

const ChannelMetadata = ({ channelId }) => {
  const [channelDetails, setChannelDetails] = useState({
    data: {},
    isLoading: true,
  });
  const { data, isLoading } = channelDetails;
  const { items } = data;
  const channelMetadata = items ? items[0] : {};

  const {
    snippet: {
      title = "",
      description = "",
      customUrl = "",
      thumbnails: { high: { url = "" } = {} } = {},
    } = {},
    statistics: { subscriberCount = "", videoCount = "" } = {},
    brandingSettings: { image: { bannerExternalUrl = "" } = {} } = {},
  } = channelMetadata || {};

  const [isChannelDescriptionModalOpen, setIsChannelDescriptionModalOpen] =
    useState(false);

  const openChannelDescriptionModal = () =>
    setIsChannelDescriptionModalOpen(true);
  const closeChannelDescriptionModal = () =>
    setIsChannelDescriptionModalOpen(false);

  const getChannelDetails = useCallback(
    async ({ abortController }) => {
      const queryParams = {
        part: "snippet,statistics,brandingSettings",
        id: channelId,
      };
      try {
        const res = await httpRequest({
          url: "/channels",
          abortController,
          queryParams,
        });
        if (res) {
          setChannelDetails({
            data: res,
            isLoading: false,
          });
        }
      } catch (error) {
        console.error(error);
      }
    },
    [channelId]
  );

  useEffect(() => {
    const abortController = new AbortController();
    getChannelDetails({ abortController: abortController });
    return () => {
      abortController.abort();
    };
  }, [getChannelDetails]);

  return (
    <>
      {isLoading ? (
        <ChannelMetadataSkeleton />
      ) : (
        <>
          <ChannelBannerWrapper>
            {bannerExternalUrl && (
              <ChannelBanner
                src={highQualityImage(bannerExternalUrl)}
                alt="channel-banner"
                referrerPolicy="no-referrer"
              />
            )}
          </ChannelBannerWrapper>
          <ChannelMetadataWrapper>
            <ChannelThumbnailWrapper>
              <ChannelThumbnail
                src={url}
                alt="channelThumbnail"
                referrerPolicy="no-referrer"
              />
            </ChannelThumbnailWrapper>
            <ChannelDetailsWrapper>
              <Typography variant="h4" component="h1" channelTitle>
                {title}
              </Typography>
              <Typography variant="body2" component="p">
                {customUrl} ‧ {formatCompactNumber(subscriberCount)} subscribers
                ‧ {formatCompactNumber(videoCount)} videos
              </Typography>
              <Typography
                variant="body2"
                component="p"
                channelDescription
                onClick={openChannelDescriptionModal}
              >
                <p
                  dangerouslySetInnerHTML={{
                    __html: customParser(description),
                  }}
                />
                <KeyboardArrowRightStyledIcon />
              </Typography>
              <SubscribeButton channelId={channelId} channelName={title} />
            </ChannelDetailsWrapper>
          </ChannelMetadataWrapper>
        </>
      )}
      {isChannelDescriptionModalOpen && (
        <ChannelDescriptionModal
          open={isChannelDescriptionModalOpen}
          onClose={closeChannelDescriptionModal}
          channelMetadata={channelMetadata}
        />
      )}
    </>
  );
};

ChannelMetadata.propTypes = {
  channelId: PropTypes.string,
};

export default ChannelMetadata;
