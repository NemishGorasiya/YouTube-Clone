import MuiCheckCircleIcon from "@mui/icons-material/CheckCircle";
import { Box, styled } from "@mui/material";
import MuiTypography from "@mui/material/Typography";
import { formatCompactNumber } from "../../utils/utilityFunction";
import PropTypes from "prop-types";

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
  const { title, description, thumbnails } = snippet;
  const { totalItemCount } = contentDetails;
  const {
    default: { url: channelThumbnail },
  } = thumbnails;

  return (
    <Box sx={{ display: "flex", gap: "100px" }}>
      <div>
        <img
          style={{
            height: "136px",
            width: "136px",
            objectFit: "cover",
            borderRadius: "50%",
          }}
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
          @{title}
          {" • "}
          {formatCompactNumber(totalItemCount)} videos
        </ChannelMetadata>
        <ChannelMetadata>{description}</ChannelMetadata>
      </Box>
    </Box>
  );
};

ChannelCard.propTypes = {
  channel: PropTypes.object,
};

export default ChannelCard;
