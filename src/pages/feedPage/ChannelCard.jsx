import MuiCheckCircleIcon from "@mui/icons-material/CheckCircle";
import { styled } from "@mui/material";
import MuiTypography from "@mui/material/Typography";
import MuiBox from "@mui/material/Box";
import { formatCompactNumber } from "../../utils/utilityFunction";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import SubscribeButton from "../../components/SubscribeButton";

const ChannelName = styled(MuiTypography)(({ theme }) => ({
  fontSize: "18px",
  lineHeight: "26px",
  marginBottom: "7px",
  display: "flex",
  alignItems: "center",
  color: theme.palette.primary.main,
}));

const CheckCircleIcon = styled(MuiCheckCircleIcon)(({ theme }) => ({
  fontSize: "14px",
  marginLeft: "5px",
  color: theme.palette.primary.light,
}));

const ChannelMetadataWrapper = styled(MuiBox)(() => ({
  flex: "1",
}));

const ChannelCardComponent = styled(MuiBox)(({ theme }) => ({
  display: "flex",
  gap: "100px",
  [theme.breakpoints.down("md")]: {
    gap: "24px",
  },
  "@media (max-width: 500px)": {
    gap: "12px",
  },
}));

const ChannelThumbnailWrapper = styled(MuiBox)(({ theme }) => ({
  height: "136px",
  width: "136px",
  minWidth: "136px",
  borderRadius: "50%",
  [theme.breakpoints.down("sm")]: {
    height: "75px",
    width: "75px",
    minWidth: "75px",
  },
  "@media (max-width: 500px)": {
    height: "45px",
    width: "45px",
    minWidth: "45px",
  },
}));
const ChannelThumbnail = styled("img")(() => ({
  height: "100%",
  width: "100%",
  objectFit: "cover",
  borderRadius: "inherit",
}));

const ChannelMetadata = styled(MuiTypography)(({ theme }) => ({
  color: theme.palette.primary.light,
  fontSize: "12px",
  lineHeight: "18px",
  fontWeight: "400",
  fontFamily: "Roboto,Arial,sans-serif",
  overflow: "hidden",
  textOverflow: "ellipsis",
  display: "-webkit-box",
  WebkitBoxOrient: "vertical",
  WebkitLineClamp: "2",
}));

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
