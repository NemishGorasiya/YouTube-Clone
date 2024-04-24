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
            src="https://yt3.googleusercontent.com/ASgokTJ4O37KDTfhBAn5g5r78AlY8P6643_2YVaR6RfAjtf-nkuPApWqjxn2pF6PtRMiZvCocA=w2120-fcrop64=1,00005a57ffffa5a8-k-c0xffffffff-no-nd-rj"
            alt=""
          />
        </div>
        <div className="channelMetadataWrapper">
          <div className="channelThumbnailWrapper">
            <img
              src="https://yt3.googleusercontent.com/by-_mlOjTkdcgg46mUqQY6NYK8MVQl2vIpvN8LI8Jm-FGawwjsCSHzw8fpiYM6fmuHGCtyp1=s176-c-k-c0x00ffffff-no-rj"
              alt=""
            />
          </div>
          <div className="channelDetailsWrapper">
            <Typography variant="h4" component="h1" channelTitle>
              EggyWawa
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
              Every day is filled with wonder and surprise for the children of
              Sunnyside. With their guide Sheldon the elephant the kids hunt for
              eggy wawas, Magic eggs busting with new ideas. They guide the
              children on adventures where they sing, dance, and discover a
              world of friendship, knowledge, and wonder. Eggy Wawa is designed
              to help kids come out of their shells by encouraging a child's
              natural curiosity. The content of the series is built around a
              curriculum for children 1-2 years. The Eggy Wawas are safe,
              familiar smiling faces that guide the kids to trying new things.
              They show the viewers that ultimately new experiences are fun.
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
          <div className="videoGalleryWrapper">
            <VideoGallery url="/search?part=snippet&channelId=UCRjTtUHdDFHf-vx2vyol1Fg&maxResults=10" />
          </div>
        </div>
      </div>
      {/* <Modal
        open={isChannelDescriptionModalOpen}
        onClose={closeChannelDescriptionModal}
      >
        <Box className="modalContent" sx={modalStyle}>
          <IconButton
            onClick={closeChannelDescriptionModal}
            sx={{
              position: "absolute",
              right: 5,
              top: 5,
            }}
          >
            <CloseIcon />
          </IconButton>
          <h2>About</h2>
        </Box>
      </Modal> */}
      <ChannelDescriptionModal
        open={isChannelDescriptionModalOpen}
        onClose={closeChannelDescriptionModal}
      />
    </>
  );
};

export default ChannelPage;
