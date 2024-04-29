import { useParams } from "react-router-dom";
import "./ChannelPage.scss";
import {
  Box,
  FormControl,
  IconButton,
  InputAdornment,
  MenuItem,
  Modal,
  Select,
  styled,
} from "@mui/material";
import { useState } from "react";
import { AccountCircle } from "@mui/icons-material";
import { subscriptionStatusList } from "../../utils/constant";
import VideoGallery from "../../components/VideoGallery";
import MuiTypography from "@mui/material/Typography";
import CloseIcon from "@mui/icons-material/Close";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import { modalStyle } from "../../components/styles/styles";
import ChannelDescriptionModal from "../../components/channelPage/ChannelDescriptionModal";
import { customParser } from "../../utils/utilityFunction";
import VideoSlider from "../../components/VideoSlider";

const channelInfo = {
  kind: "youtube#subscription",
  etag: "cVgb0BnaI29yKn8r7Zl1YP3QBr4",
  id: "YGWb0aLb58yjmNDYNDLx9HvDLjJ67_FWG6xCppNJiUI",
  snippet: {
    publishedAt: "2024-03-20T08:39:18.409807Z",
    title: "EggyWawa",
    description: `Every day is filled with wonder and surprise for the children of Sunnyside. With their guide Sheldon the elephant the kids hunt for eggy wawas, Magic eggs busting with new ideas. They guide the children on adventures where they sing, dance, and discover a world of friendship, knowledge, and wonder.\n\nEggy Wawa is designed to help kids come out of their shells by encouraging a child's natural curiosity. The content of the series is built around a curriculum for children 1-2 years. The Eggy Wawas are safe, familiar smiling faces that guide the kids to trying new things. They show the viewers that ultimately new experiences are fun.`,
    resourceId: {
      kind: "youtube#channel",
      channelId: "UCRjTtUHdDFHf-vx2vyol1Fg",
    },
    channelId: "UCI-GE2iPiVk-dC5bKIxCjnw",
    thumbnails: {
      default: {
        url: "https://yt3.ggpht.com/by-_mlOjTkdcgg46mUqQY6NYK8MVQl2vIpvN8LI8Jm-FGawwjsCSHzw8fpiYM6fmuHGCtyp1=s88-c-k-c0x00ffffff-no-rj",
      },
      medium: {
        url: "https://yt3.ggpht.com/by-_mlOjTkdcgg46mUqQY6NYK8MVQl2vIpvN8LI8Jm-FGawwjsCSHzw8fpiYM6fmuHGCtyp1=s240-c-k-c0x00ffffff-no-rj",
      },
      high: {
        url: "https://yt3.ggpht.com/by-_mlOjTkdcgg46mUqQY6NYK8MVQl2vIpvN8LI8Jm-FGawwjsCSHzw8fpiYM6fmuHGCtyp1=s800-c-k-c0x00ffffff-no-rj",
      },
    },
  },
  contentDetails: {
    totalItemCount: 23,
    newItemCount: 0,
    activityType: "all",
  },
};

const { snippet, contentDetails } = channelInfo;
const { totalItemCount } = contentDetails;

const ChannelPage = () => {
  const [isChannelDescriptionModalOpen, setIsChannelDescriptionModalOpen] =
    useState(false);

  const openChannelDescriptionModal = () =>
    setIsChannelDescriptionModalOpen(true);
  const closeChannelDescriptionModal = () =>
    setIsChannelDescriptionModalOpen(false);

  const { channelName } = useParams();
  const [subscriptionStatus, setSubscriptionStatus] = useState(
    subscriptionStatusList[0]
  );

  const changeSubscriptionStatus = ({ target: { value } }) => {
    setSubscriptionStatus(value);
  };

  const filteredStatusList = subscriptionStatusList.filter(
    ({ label }) => label !== subscriptionStatus.label
  );

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

  return (
    <>
      <div className="channelPage">
        <div className="channelBanner">
          <img
            src="https://yt3.googleusercontent.com/DpZFSiLFuhvgUL7b6MqNQZK8mtQBx57BdY3R_xvOnrHpFhkFuzjboz6CMgbnEr8bNiJ91Bwg=w2120-fcrop64=1,00005a57ffffa5a8-k-c0xffffffff-no-nd-rj"
            alt="channel-banner"
          />
        </div>
        <div className="channelMetadataWrapper">
          <div className="channelThumbnailWrapper">
            <img src={channelInfo.snippet.thumbnails.default.url} alt="" />
          </div>
          <div className="channelDetailsWrapper">
            <Typography variant="h4" component="h1" channelTitle>
              {channelInfo.snippet.title}
            </Typography>
            <Typography variant="body2" component="p">
              @EggyWawaOfficial ‧ 1.9K subscribers ‧ 23 videos
            </Typography>
            <Typography
              variant="body2"
              component="p"
              className="channelDescription"
              onClick={openChannelDescriptionModal}
            >
              <p
                dangerouslySetInnerHTML={{
                  __html: customParser(channelInfo.snippet.description),
                }}
              ></p>
              <KeyboardArrowRightIcon className="showMoreIcon" />
            </Typography>

            <FormControl>
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
            </FormControl>
          </div>
        </div>
        <div className="channelVideosWrapper">
          <div className="tabsWrapper">
            <ul>
              <li>Home</li>
              <li>Videos</li>
              <li>Shorts</li>
              <li>Playlists</li>
            </ul>
          </div>
          <VideoSlider />
          <div className="videoGalleryWrapper">
            <VideoGallery url="/search?part=snippet&channelId=UCRjTtUHdDFHf-vx2vyol1Fg&maxResults=10" />
          </div>
        </div>
      </div>

      <ChannelDescriptionModal
        open={isChannelDescriptionModalOpen}
        onClose={closeChannelDescriptionModal}
        channelInfo={channelInfo}
      />
    </>
  );
};

export default ChannelPage;
