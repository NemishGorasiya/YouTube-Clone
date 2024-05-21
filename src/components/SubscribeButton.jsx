import { useCallback, useEffect, useState } from "react";
import { fetchData } from "../services/services";
import useLocalStorage from "../hooks/useLocalStorage";
import Loader from "./loader/Loader";
import {
  Box,
  Button,
  Menu,
  MenuItem,
  Modal,
  Typography,
  styled,
} from "@mui/material";
import MuiBox from "@mui/material/Box";
import MuiSelect from "@mui/material/Select";
import MuiButton from "@mui/material/Button";
import { modalStyle } from "./styles/styles";

const UserActionButtonWrapper = styled(MuiBox)(() => ({
  textAlign: "end",
}));

const UserActionButton = styled(MuiButton)(({ theme, textColor }) => ({
  color: textColor || theme.palette.primary.main,
}));
const SubscribedButton = styled(MuiButton)(({ theme }) => ({
  background: theme.palette.secondaryBackground.default,
  color: theme.palette.primary.main,
  outline: "none",
  border: "none",
  width: "fit-content",
  borderRadius: 32,
}));

const SubscribeButton = ({ channelId, channelName }) => {
  const [subscriptionStatus, setSubscriptionStatus] = useState({
    isSubscribed: false,
    isLoading: true,
  });
  const [subscriptionId, setSubscriptionId] = useState("");
  const { isSubscribed, isLoading } = subscriptionStatus || {};
  const [user] = useLocalStorage("user", {});
  const { accessToken } = user;

  const [anchorEl, setAnchorEl] = useState(null);
  const isOpenMenu = Boolean(anchorEl);
  const handleOpenMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseMenu = () => setAnchorEl(null);

  const [isOpenConfirmationModal, setIsOpenConfirmationModal] = useState(false);
  const handleCloseConfirmationModal = () => setIsOpenConfirmationModal(false);

  const handleUserAction = async ({ target: { value } }) => {
    if (value === "unsubscribe") {
      setIsOpenConfirmationModal(true);
    }
  };

  const handleOpenConfirmationModal = () => {
    setIsOpenConfirmationModal(true);
    setAnchorEl(null);
  };

  const handelUnsubscribeToChannel = async () => {
    try {
      const queryParams = {
        id: subscriptionId,
      };
      const headers = {
        Authorization: `Bearer ${accessToken}`,
      };
      const res = await fetchData({
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
        console.log("unsubscribe successfully");
      } else {
        console.log("something went wrong");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleSubscribeToChannel = async () => {
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
      const res = await fetchData({
        url: "/subscriptions",
        method: "POST",
        queryParams,
        data,
        headers,
      });
      if (res) {
        alert("subscribed");
      } else {
        alert("went wrong");
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
        const res = await fetchData({
          url: "/subscriptions",
          queryParams,
          headers,
          abortController,
        });
        if (res) {
          const { items } = res;
          const { id } = items[0];
          setSubscriptionId(id);
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
    getSubscriptionStatus({ abortController });
    return () => {
      abortController.abort();
    };
  }, [getSubscriptionStatus]);
  return isLoading ? (
    <Loader />
  ) : isSubscribed ? (
    <>
      <SubscribedButton onClick={handleOpenMenu}>Subscribed</SubscribedButton>
      <Menu
        open={isOpenMenu}
        value="Subscribed"
        onChange={handleUserAction}
        renderValue={() => "Subscribed"}
        onClose={handleCloseMenu}
        anchorEl={anchorEl}
        transformOrigin={{ horizontal: "left", vertical: "top" }}
        anchorOrigin={{ horizontal: "left", vertical: "bottom" }}
      >
        <MenuItem value="unsubscribe" onClick={handleOpenConfirmationModal}>
          Unsubscribe
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
              onClick={handelUnsubscribeToChannel}
            >
              Unsubscribe
            </UserActionButton>
          </UserActionButtonWrapper>
        </Box>
      </Modal>
    </>
  ) : (
    <Button
      sx={{ width: "fit-content" }}
      variant="contained"
      onClick={handleSubscribeToChannel}
    >
      Subscribe
    </Button>
  );
};

export default SubscribeButton;
