import PropTypes from "prop-types";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import SlideshowIcon from "@mui/icons-material/Slideshow";
import LanguageOutlinedIcon from "@mui/icons-material/LanguageOutlined";
import PublicOutlinedIcon from "@mui/icons-material/PublicOutlined";
import RecordVoiceOverOutlinedIcon from "@mui/icons-material/RecordVoiceOverOutlined";
import TrendingUpOutlinedIcon from "@mui/icons-material/TrendingUpOutlined";
import StyledModal from "../StyledModal";
import {
  ChannelDescription,
  DescriptionItem,
  DescriptionItemsWrapper,
  ModalContent,
} from "./ChannelDescriptionModalStyledComponents";
import {
  customParser,
  formatCompactNumber,
  formatDate,
} from "../../utils/utilityFunction";

const ChannelDescriptionModal = ({ onClose, open, channelMetadata }) => {
  const {
    snippet: { description, customUrl, publishedAt, country },
    statistics: { viewCount, subscriberCount, videoCount },
  } = channelMetadata || {};

  const metadataList = [
    {
      icon: <LanguageOutlinedIcon />,
      value: customUrl,
    },
    {
      icon: <RecordVoiceOverOutlinedIcon />,
      value: `${formatCompactNumber(subscriberCount)} subscribers`,
    },
    {
      icon: <SlideshowIcon />,
      value: `${formatCompactNumber(videoCount)} videos`,
    },
    {
      icon: <TrendingUpOutlinedIcon />,
      value: `${formatCompactNumber(viewCount)} views`,
    },
    {
      icon: <InfoOutlinedIcon />,
      value: `Joined ${formatDate(publishedAt)}`,
    },
    {
      icon: <PublicOutlinedIcon />,
      value: country,
    },
  ];

  return (
    <StyledModal open={open} handleClose={onClose}>
      <ModalContent>
        <h2>About</h2>
        <ChannelDescription
          dangerouslySetInnerHTML={{
            __html: customParser(description),
          }}
        />
        <h2>Channel details</h2>
        <DescriptionItemsWrapper>
          {metadataList.map(
            ({ icon, value }, idx) =>
              value && (
                <DescriptionItem key={idx}>
                  {icon} {value}
                </DescriptionItem>
              )
          )}
        </DescriptionItemsWrapper>
      </ModalContent>
    </StyledModal>
  );
};

ChannelDescriptionModal.propTypes = {
  onClose: PropTypes.func,
  open: PropTypes.bool,
  channelMetadata: PropTypes.object,
};

export default ChannelDescriptionModal;
