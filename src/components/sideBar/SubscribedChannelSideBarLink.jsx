import PropTypes from "prop-types";
import { ListItemText } from "@mui/material";
import {
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemIconImage,
  NavLinkTypography,
  StyledNavLink,
} from "./SideBarStyledComponents";

const SubscribedChannelSideBarLink = ({ channel }) => {
  const {
    snippet: {
      title = "",
      thumbnails: { default: { url = "" } = {} } = {},
      resourceId: { channelId = "" } = {},
    } = {},
  } = channel || {};

  return (
    title && (
      <StyledNavLink key={channelId} to={`/channel/${channelId}`}>
        <ListItem>
          <ListItemButton $open={open}>
            <ListItemIcon>
              <ListItemIconImage
                src={url}
                referrerPolicy="no-referrer"
                alt="channel logo"
              />
            </ListItemIcon>
            <ListItemText>
              <NavLinkTypography variant="body2" noWrap $open={open}>
                {title}
              </NavLinkTypography>
            </ListItemText>
          </ListItemButton>
        </ListItem>
      </StyledNavLink>
    )
  );
};

SubscribedChannelSideBarLink.propTypes = {
  channel: PropTypes.object,
};

export default SubscribedChannelSideBarLink;
