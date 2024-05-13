import MuiCheckCircleIcon from "@mui/icons-material/CheckCircle";
import { Box, styled } from "@mui/material";
import MuiTypography from "@mui/material/Typography";
import { formatCompactNumber } from "../../utils/utilityFunction";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const ChannelName = styled(MuiTypography)(() => ({
  fontSize: "18px",
  lineHeight: "26px",
  marginBottom: "7px",
  display: "flex",
  alignItems: "center",
}));
const CheckCircleIcon = styled(MuiCheckCircleIcon)(({ theme }) => ({
  fontSize: "14px",
  marginLeft: "5px",
  color: theme.palette.primary.light,
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
  const { id, snippet, contentDetails } = channel ?? {};
  const { title, description, thumbnails, resourceId } = snippet;
  const { channelId } = resourceId;
  const { totalItemCount } = contentDetails;
  const {
    high: { url: channelThumbnail },
  } = thumbnails;

  return (
    <Link to={`/channel/${channelId}`}>
      <Box sx={{ display: "flex", gap: "100px" }}>
        <div>
          <img
            style={{
              height: "136px",
              width: "136px",
              objectFit: "cover",
              borderRadius: "50%",
            }}
            referrerPolicy="no-referrer"
            src={channelThumbnail}
            alt="channelThumbnail"
          />
        </div>
        <Box>
          <ChannelName>
            {title}
            <CheckCircleIcon />
          </ChannelName>
          <ChannelMetadata>
            {/* @{title}
            {" • "} */}
            {formatCompactNumber(totalItemCount)} videos
          </ChannelMetadata>
          <ChannelMetadata>{description}</ChannelMetadata>
        </Box>
      </Box>
    </Link>
  );
};

ChannelCard.propTypes = {
  channel: PropTypes.object,
};

export default ChannelCard;
