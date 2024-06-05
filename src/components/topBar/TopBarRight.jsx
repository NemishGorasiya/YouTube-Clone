import { Logout } from "@mui/icons-material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import {
  Avatar,
  Box,
  Divider,
  IconButton,
  ListItemIcon,
  Menu,
  MenuItem,
  Tooltip,
} from "@mui/material";
import { useCallback, useContext, useEffect, useState } from "react";
import { Link, redirect, useNavigate, useSearchParams } from "react-router-dom";
import { fetchAccessToken, getUserInfo } from "../../services/services";
import SignInButton from "../SignInButton";
import { AuthContext } from "../../context/AuthContext";
import {
  ProfilePictureImage,
  StyledMenuPaper,
  TopBarRightDivider,
  UsernameMenuItem,
} from "./TopBarStyledComponents";
import LocationMenuItem from "./LocationMenuItem";
import ThemeMenuItem from "./ThemeMenuItem";
import toast from "react-hot-toast";

const TopBarRight = () => {
  const navigate = useNavigate();

  const { user, isLoggedIn, handleLogin, handleLogout } =
    useContext(AuthContext);
  const { username, email, profilePicture } = user ?? {};

  const [searchParams] = useSearchParams();

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const closeProfileMenu = () => {
    setAnchorEl(null);
  };

  const getAccessToken = useCallback(
    async ({ code, abortController }) => {
      const urlencoded = new URLSearchParams();
      urlencoded.append("code", code);
      urlencoded.append("client_id", import.meta.env.VITE_CLIENT_ID);
      urlencoded.append("client_secret", import.meta.env.VITE_CLIENT_SECRET);
      urlencoded.append("grant_type", "authorization_code");
      urlencoded.append("redirect_uri", import.meta.env.VITE_REDIRECT_URI);

      try {
        const res = await fetchAccessToken({
          urlencoded: urlencoded,
          abortController: abortController,
        });
        if (res) {
          const { access_token = "", refresh_token = "" } = res;
          const userInfo = await getUserInfo({ accessToken: access_token });
          if (userInfo) {
            const { name = "", picture = "", email = "" } = userInfo;
            handleLogin({
              accessToken: access_token,
              refreshToken: refresh_token,
              username: name,
              profilePicture: picture,
              email: email,
            });
            navigate("/");
          }
        }
      } catch (error) {
        toast.error("Something went wrong while subscribing to channel");
        console.error(error);
      }
    },
    [handleLogin, navigate]
  );

  useEffect(() => {
    const code = searchParams.get("code");
    const error = searchParams.get("error");
    if (error) {
      toast.error("Authentication failed, please try again");
    }
    const abortController = new AbortController();
    if (code) {
      getAccessToken({ code, abortController });
    }
    return () => {
      abortController.abort();
    };
  }, [getAccessToken, searchParams]);

  return (
    <Box>
      <Box sx={{ display: "flex", alignItems: "center", textAlign: "center" }}>
        <Tooltip title="Account settings">
          <IconButton
            onClick={handleClick}
            size="small"
            aria-controls={open ? "account-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
          >
            {isLoggedIn ? (
              profilePicture ? (
                <ProfilePictureImage
                  src={profilePicture}
                  alt="user"
                  referrerPolicy="no-referrer"
                />
              ) : (
                <Avatar />
              )
            ) : (
              <MoreVertIcon />
            )}
          </IconButton>
        </Tooltip>
        {!isLoggedIn && <SignInButton />}
      </Box>
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={closeProfileMenu}
        PaperProps={{
          component: StyledMenuPaper,
          elevation: 0,
        }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        {isLoggedIn && (
          <>
            <UsernameMenuItem>
              <ProfilePictureImage
                src={profilePicture}
                referrerPolicy="no-referrer"
                alt="profileImage"
              />
              <div>
                <p>{username}</p> <p>{email}</p>
              </div>
            </UsernameMenuItem>
            <TopBarRightDivider />
          </>
        )}
        <ThemeMenuItem />
        <LocationMenuItem />
        {isLoggedIn && (
          <>
            <TopBarRightDivider />
            <MenuItem onClick={handleLogout}>
              <ListItemIcon>
                <Logout fontSize="small" />
              </ListItemIcon>
              Sign out
            </MenuItem>
          </>
        )}
      </Menu>
    </Box>
  );
};

export default TopBarRight;
