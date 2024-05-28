import { styled } from "@mui/material";
import MuiTypography from "@mui/material/Typography";
import MuiBox from "@mui/material/Box";
import {
  customParser,
  formatCompactNumber,
  highQualityImage,
} from "../../utils/utilityFunction";
import { useCallback, useEffect, useState } from "react";
import { httpRequest } from "../../services/services";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import ChannelDescriptionModal from "../../components/channelPage/ChannelDescriptionModal";
import Loader from "../../components/loader/Loader";
import useLocalStorage from "../../hooks/useLocalStorage";
import SubscribeButton from "../../components/SubscribeButton";
import PropTypes from "prop-types";

const KeyboardArrowRightStyledIcon = styled(KeyboardArrowRightIcon)(
  ({ theme }) => ({
    position: "absolute",
    top: 0,
    right: 0,
    height: "100%",
    background: theme.palette.background.default,
  })
);
const ChannelDetailsWrapper = styled(MuiBox)(() => ({
  display: "flex",
  flexDirection: "column",
  gap: "12px",
}));

const ChannelMetadataWrapper = styled(MuiBox)(() => ({
  display: "flex",
  margin: "16px 0",
  width: "100%",
  gap: "16px",
  "@media (max-width: 480px)": {
    flexDirection: "column",
  },
}));
const ChannelThumbnailWrapper = styled(MuiBox)(({ theme }) => ({
  height: "160px",
  width: "160px",
  minWidth: "160px",
  minHeight: "160px",
  borderRadius: "50%",
  [theme.breakpoints.down("md")]: {
    height: "60px",
    width: "60px",
    minWidth: "60px",
    minHeight: "60px",
  },
}));

const ChannelThumbnail = styled("img")(() => ({
  height: "100%",
  width: "100%",
  objectFit: "cover",
  borderRadius: "inherit",
}));

const Typography = styled(MuiTypography)(
  ({ channelTitle, channelDescription }) => ({
    ...(channelTitle
      ? {
          fontWeight: 500,
        }
      : {
          color: "#AAAAAA",
          overflow: "hidden",
          display: "-webkit-box",
          WebkitBoxOrient: "vertical",
          WebkitLineClamp: 1,
        }),
    ...(channelDescription && {
      position: "relative",
      cursor: "pointer",
    }),
    "@media (max-width: 480px)": {
      ...(channelTitle
        ? {
            fontSize: "22px",
            fontWeight: 400,
          }
        : {}),
    },
  })
);

const ChannelMetadata = ({ channelId }) => {
  const [channelDetails, setChannelDetails] = useState({
    data: {},
    isLoading: true,
  });
  const { data, isLoading } = channelDetails;
  const { items } = data;
  const channelMetadata = items ? items[0] : {};
  const [user] = useLocalStorage("user", {});
  const { accessToken } = user;

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
        <Loader />
      ) : (
        <>
          <div
            className="channelBanner"
            style={{
              background: "grey",
              display: "flex",
              aspectRatio: "569/94",
            }}
          >
            {bannerExternalUrl && (
              <img
                style={{ height: "100%", width: "100%", objectFit: "cover" }}
                src={highQualityImage(bannerExternalUrl)}
                alt="channel-banner"
                referrerPolicy="no-referrer"
              />
            )}
          </div>
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
                ></p>
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
