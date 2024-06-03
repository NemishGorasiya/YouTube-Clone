import { Box, IconButton, Modal, styled } from "@mui/material";
import MuiTypography from "@mui/material/Typography";
import MuiBox from "@mui/material/Box";
import { modalStyle } from "../styles/styles";
import CloseIcon from "@mui/icons-material/Close";
import {
  customParser,
  formatCompactNumber,
  formatDate,
} from "../../utils/utilityFunction";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import SlideshowIcon from "@mui/icons-material/Slideshow";
import PropTypes from "prop-types";
import LanguageOutlinedIcon from "@mui/icons-material/LanguageOutlined";
import PublicOutlinedIcon from "@mui/icons-material/PublicOutlined";
import RecordVoiceOverOutlinedIcon from "@mui/icons-material/RecordVoiceOverOutlined";
import TrendingUpOutlinedIcon from "@mui/icons-material/TrendingUpOutlined";
import {
  ChannelDescription,
  CloseModalButton,
  DescriptionItem,
  DescriptionItemsWrapper,
} from "./ChannelDescriptionModalStyledComponents";

const ChannelDescriptionModal = ({ onClose, open, channelMetadata }) => {
  const {
    snippet: { description, customUrl, publishedAt, country },
    statistics: { viewCount, subscriberCount, videoCount },
  } = channelMetadata;

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
    <Modal open={open} onClose={onClose}>
      <Box
        className="modalContent"
        sx={{
          ...modalStyle,
          padding: "24px",
          display: "flex",
          flexDirection: "column",
          gap: "12px",
        }}
      >
        <CloseModalButton onClick={onClose}>
          <CloseIcon />
        </CloseModalButton>
        <h2>About</h2>
        <ChannelDescription
          dangerouslySetInnerHTML={{
            __html: customParser(description),
          }}
        />
        <h2>Channel details</h2>
        <DescriptionItemsWrapper>
          {metadataList.map(({ icon, value }, idx) => (
            <DescriptionItem key={idx}>
              {icon} {value}
            </DescriptionItem>
          ))}
        </DescriptionItemsWrapper>
      </Box>
    </Modal>
  );
};

ChannelDescriptionModal.propTypes = {
  onClose: PropTypes.func,
  open: PropTypes.bool,
  channelMetadata: PropTypes.object,
};

export default ChannelDescriptionModal;
