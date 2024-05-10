import {
  FormControl,
  InputAdornment,
  MenuItem,
  Select,
  styled,
} from "@mui/material";
import MuiTypography from "@mui/material/Typography";
import { customParser, formatCompactNumber } from "../../utils/utilityFunction";
import { useCallback, useEffect, useState } from "react";
import { subscriptionStatusList } from "../../utils/constant";
import { fetchChannelDetails } from "../../services/services";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import ChannelDescriptionModal from "../../components/channelPage/ChannelDescriptionModal";
import Loader from "../../components/loader/Loader";
import useLocalStorage from "../../hooks/useLocalStorage";
import "./ChannelMetadata.scss";

const ChannelMetadata = ({ channelId }) => {
  const [channelDetails, setChannelDetails] = useState({
    data: {},
    isLoading: true,
  });
  const { data, isLoading } = channelDetails;
  const { items } = data;
  const channelMetadata = items ? items[0] : {};
  const { snippet, statistics } = channelMetadata;
  const [user] = useLocalStorage("user", {});
  const { accessToken } = user;
  //   const {
  //     snippet: {
  //       title,
  //       description,
  //       customUrl,
  //       thumbnails: {
  //         default: { url },
  //       },
  //     },
  //     statistics: { subscriberCount, videoCount },
  //   } = channelMetadata;

  const { title, description, customUrl, thumbnails } = snippet ?? {};
  const { default: defaultUrl } = thumbnails ?? {};
  const { url } = defaultUrl ?? {};
  const { subscriberCount, videoCount } = statistics ?? {};

  const [isChannelDescriptionModalOpen, setIsChannelDescriptionModalOpen] =
    useState(false);

  const openChannelDescriptionModal = () =>
    setIsChannelDescriptionModalOpen(true);
  const closeChannelDescriptionModal = () =>
    setIsChannelDescriptionModalOpen(false);

  // const [subscriptionStatus, setSubscriptionStatus] = useState(
  //   subscriptionStatusList[0]
  // );

  // const changeSubscriptionStatus = ({ target: { value } }) => {
  //   setSubscriptionStatus(value);
  // };

  // const filteredStatusList = subscriptionStatusList.filter(
  //   ({ label }) => label !== subscriptionStatus.label
  // );

  const Typography = styled(MuiTypography)(({ titleText }) => ({
    ...(titleText
      ? { fontWeight: 700 }
      : {
          color: "#AAAAAA",
          overflow: "hidden",
          display: "-webkit-box",
          WebkitBoxOrient: "vertical",
          WebkitLineClamp: 1,
        }),
  }));

  const getChannelDetails = useCallback(
    async ({ abortController }) => {
      const queryParams = {
        part: "snippet,statistics",
        id: channelId,
        key: import.meta.env.VITE_GOOGLE_API_KEY,
      };
      try {
        const res = await fetchChannelDetails({
          abortController,
          queryParams,
          accessToken,
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
    [accessToken, channelId]
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
        <div className="channelMetadataWrapper">
          <div className="channelThumbnailWrapper">
            <img src={url} alt="" />
          </div>
          <div className="channelDetailsWrapper">
            <Typography variant="h4" component="h1" channelTitle>
              {title}
            </Typography>
            <Typography variant="body2" component="p">
              {customUrl} ‧ {formatCompactNumber(subscriberCount)} subscribers ‧{" "}
              {formatCompactNumber(videoCount)} videos
            </Typography>
            <Typography
              variant="body2"
              component="p"
              className="channelDescription"
              onClick={openChannelDescriptionModal}
            >
              <p
                dangerouslySetInnerHTML={{
                  __html: customParser(description),
                }}
              ></p>
              <KeyboardArrowRightIcon className="showMoreIcon" />
            </Typography>

            {/* <FormControl>
              <Select
                sx={{ borderRadius: 10, height: "35px", width: "fit-content" }}
                value={subscriptionStatus}
                onChange={changeSubscriptionStatus}
                startAdornment={
                  <InputAdornment position="start">
                    {subscriptionStatus.icon} {subscriptionStatus.label}
                  </InputAdornment>
                }
              >
                {filteredStatusList.map((status) => (
                  <MenuItem
                    key={status.label}
                    value={status}
                    disabled={status.label === "Disabled"}
                  >
                    {status.icon}
                    {status.label}
                  </MenuItem>
                ))}
              </Select>
            </FormControl> */}
          </div>
        </div>
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

export default ChannelMetadata;
