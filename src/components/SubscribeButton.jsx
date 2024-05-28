import { useCallback, useContext, useEffect, useState } from "react";
import { httpRequest } from "../services/services";
import useLocalStorage from "../hooks/useLocalStorage";
import Loader from "./loader/Loader";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import PersonRemoveAlt1OutlinedIcon from "@mui/icons-material/PersonRemoveAlt1Outlined";
import { Box, Button, Menu, Modal, Typography, styled } from "@mui/material";
import MuiBox from "@mui/material/Box";
import MuiMenuItem from "@mui/material/MenuItem";
import MuiButton from "@mui/material/Button";
import { modalStyle } from "./styles/styles";
import PropTypes from "prop-types";
import { AuthContext } from "../context/AuthContext";

const UserActionButtonWrapper = styled(MuiBox)(() => ({
  textAlign: "end",
}));

const MenuItem = styled(MuiMenuItem)(() => ({
  gap: 12,
}));

const UserActionButton = styled(MuiButton)(({ theme, textColor }) => ({
  color: textColor || theme.palette.primary.main,
}));

const SubscribedButton = styled(MuiButton)(({ theme }) => ({
  background: theme.palette.secondaryBackground.default,
  color: theme.palette.primary.main,
  outline: "none",
  border: "none",
  minWidth: "fit-content",
  width: "fit-content",
  height: "fit-content",
  paddingLeft: "16px",
  paddingRight: "12px",
  borderRadius: 32,
  [theme.breakpoints.down("sm")]: {
    fontSize: "12px",
    paddingLeft: "8px",
    paddingRight: "6px",
  },
}));

const SubscribeButton = ({
  channelId,
  channelName,
  subscriptionId: subscriptionIdProp,
}) => {
  const { isLoggedIn } = useContext(AuthContext);
  const [subscriptionStatus, setSubscriptionStatus] = useState({
    isSubscribed: !!subscriptionIdProp,
    isLoading: subscriptionIdProp || !isLoggedIn ? false : true,
  });
  const [subscriptionId, setSubscriptionId] = useState(subscriptionIdProp);
  const { isSubscribed, isLoading } = subscriptionStatus || {};
  const [user] = useLocalStorage("user", {});
  const { accessToken } = user;

  const [anchorEl, setAnchorEl] = useState(null);
  const isOpenMenu = Boolean(anchorEl);

  const handleOpenMenu = (event) => {
    event.preventDefault();
    setAnchorEl(event.currentTarget);
  };

  const handleCloseMenu = (event) => {
    event.preventDefault();
    setAnchorEl(null);
  };

  const [isOpenConfirmationModal, setIsOpenConfirmationModal] = useState(false);
  const handleCloseConfirmationModal = (event) => {
    event.preventDefault();
    setIsOpenConfirmationModal(false);
  };

  const handleOpenConfirmationModal = (event) => {
    event.preventDefault();
    setIsOpenConfirmationModal(true);
    setAnchorEl(null);
  };

  const handleUnsubscribeToChannel = async (event) => {
    event.preventDefault();
    try {
      const queryParams = {
        id: subscriptionId,
      };
      const headers = {
        Authorization: `Bearer ${accessToken}`,
      };
      const res = await httpRequest({
        url: "/subscriptions",
        method: "DELETE",
        queryParams,
        headers,
        returnEntireResponseWithStatusCode: true,
      });
      if (res.status === 204) {
        setSubscriptionStatus((prevState) => ({
          ...prevState,
          isSubscribed: false,
        }));
        setIsOpenConfirmationModal(false);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleSubscribeToChannel = async (event) => {
    event.preventDefault();
    try {
      const queryParams = {
        part: "snippet",
      };
      const data = {
        snippet: {
          resourceId: {
            channelId,
          },
        },
      };
      const headers = {
        Authorization: `Bearer ${accessToken}`,
      };
      const res = await httpRequest({
        url: "/subscriptions",
        method: "POST",
        queryParams,
        data,
        headers,
      });
      if (res) {
        setSubscriptionStatus((prevState) => ({
          ...prevState,
          isSubscribed: true,
        }));
        setAnchorEl(null);
        setIsOpenConfirmationModal(false);
      } else {
        alert("Something went wrong");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const getSubscriptionStatus = useCallback(
    async ({ abortController }) => {
      try {
        const queryParams = {
          part: "snippet",
          forChannelId: channelId,
          mine: true,
        };
        const headers = {
          Authorization: `Bearer ${accessToken}`,
        };
        const res = await httpRequest({
          url: "/subscriptions",
          queryParams,
          headers,
          abortController,
        });
        if (res) {
          const { items = [] } = res;
          if (items.length > 0) {
            const { id = "" } = items[0];
            setSubscriptionId(id);
          }
          setSubscriptionStatus({
            isSubscribed: items.length > 0,
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
    if (!subscriptionIdProp && isLoggedIn) {
      getSubscriptionStatus({ abortController });
    }
    return () => {
      abortController.abort();
    };
  }, [getSubscriptionStatus, subscriptionIdProp]);

  return isLoading ? (
    <Loader />
  ) : isSubscribed ? (
    <>
      <SubscribedButton
        endIcon={<KeyboardArrowDownIcon />}
        onClick={handleOpenMenu}
      >
        Subscribed
      </SubscribedButton>
      <Menu
        open={isOpenMenu}
        onClose={handleCloseMenu}
        anchorEl={anchorEl}
        transformOrigin={{ horizontal: "left", vertical: "top" }}
        anchorOrigin={{ horizontal: "left", vertical: "bottom" }}
      >
        <MenuItem onClick={handleOpenConfirmationModal}>
          <PersonRemoveAlt1OutlinedIcon /> Unsubscribe
        </MenuItem>
      </Menu>
      <Modal
        open={isOpenConfirmationModal}
        onClose={handleCloseConfirmationModal}
      >
        <Box
          sx={{
            ...modalStyle,
            padding: "24px",
            display: "flex",
            flexDirection: "column",
            gap: "12px",
          }}
        >
          <Typography variant="subtitle1">
            Unsubscribe from {channelName}?
          </Typography>
          <UserActionButtonWrapper>
            <UserActionButton onClick={handleCloseConfirmationModal}>
              Cancel
            </UserActionButton>
            <UserActionButton
              textColor="#3EA6FF"
              onClick={handleUnsubscribeToChannel}
            >
              Unsubscribe
            </UserActionButton>
          </UserActionButtonWrapper>
        </Box>
      </Modal>
    </>
  ) : (
    <Button
      sx={{ width: "fit-content", height: "fit-content" }}
      variant="contained"
      onClick={handleSubscribeToChannel}
      disabled={!isLoggedIn}
    >
      Subscribe
    </Button>
  );
};

SubscribeButton.propTypes = {
  channelId: PropTypes.string,
  channelName: PropTypes.string,
  subscriptionId: PropTypes.string,
};

export default SubscribeButton;
