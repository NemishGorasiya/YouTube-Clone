import { Logout } from "@mui/icons-material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import {
  Avatar,
  Box,
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
  TopBarRightDivider,
  UsernameMenuItem,
} from "./TopBarStyledComponents";
import LocationMenuItem from "./LocationMenuItem";
import ThemeMenuItem from "./ThemeMenuItem";

const REDIRECT_URI = "http://localhost:5173";
const SCOPE =
  "https://www.googleapis.com/auth/youtube.force-ssl https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/userinfo.profile";

const TopBarRight = () => {
  const navigate = useNavigate();

  const { user, isLoggedIn, handleLogin, handleLogout } =
    useContext(AuthContext);
  // const [user, setUser] = useLocalStorage("user", {});
  const { username, email, profilePicture } = user ?? {};
  // const [isLoggedIn, setIsLoggedIn] = useState(!!accessToken);

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
      urlencoded.append("redirect_uri", "http://localhost:5173");

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
            // setUser({
            //   accessToken: access_token,
            //   refreshToken: refresh_token,
            //   username: name,
            //   profilePicture: picture,
            //   email: email,
            // });
          }
        }
      } catch (error) {
        alert("Something went wrong");
        console.error(error);
      }
    },
    [handleLogin, navigate]
  );

  // const handleSignOut = () => {
  //   removeUser();
  //   setIsLoggedIn(false);
  // };

  useEffect(() => {
    const code = searchParams.get("code");
    const error = searchParams.get("error");
    if (error) {
      alert(error);
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
          elevation: 0,
          sx: {
            overflow: "visible",
            filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
            mt: 1.5,
            "& .MuiAvatar-root": {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            "&::before": {
              content: '""',
              display: "block",
              position: "absolute",
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: "background.paper",
              transform: "translateY(-50%) rotate(45deg)",
              zIndex: 0,
            },
          },
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
        <TopBarRightDivider />
        {isLoggedIn && (
          <>
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
