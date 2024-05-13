import { Logout, PersonAdd } from "@mui/icons-material";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import ContrastIcon from "@mui/icons-material/Contrast";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";
import {
  Avatar,
  Box,
  Collapse,
  Divider,
  IconButton,
  ListItemIcon,
  Menu,
  MenuItem,
  Tooltip,
} from "@mui/material";
import { useCallback, useContext, useEffect, useState } from "react";
import { Link, redirect, useNavigate, useSearchParams } from "react-router-dom";
import { ThemeContext } from "../../context/ThemeContext";
import useLocalStorage from "../../hooks/useLocalStorage";
import { fetchAccessToken, getUserInfo } from "../../services/services";

const REDIRECT_URI = "http://localhost:5173";
const SCOPE =
  "https://www.googleapis.com/auth/youtube.force-ssl https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/userinfo.profile";

const TopBarRight = () => {
  const navigate = useNavigate();
  const { changeThemeMode } = useContext(ThemeContext);
  const [user, setUser, removeUser] = useLocalStorage("user", {});
  const { accessToken, username, email } = user ?? {};
  const [isLoggedIn, setIsLoggedIn] = useState(
    accessToken !== undefined || accessToken !== null || accessToken !== ""
      ? true
      : false
  );

  const [searchParams] = useSearchParams();

  const [isThemeMenuOpen, setIsThemeMenuOpen] = useState(false);

  const toggleThemeMenu = () => {
    setIsThemeMenuOpen((prev) => !prev);
  };

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const closeProfileMenu = () => {
    setAnchorEl(null);
    setIsThemeMenuOpen(false);
  };

  const handleSignIn = () => {
    redirect(
      `https://accounts.google.com/o/oauth2/v2/auth?access_type=offline&include_granted_scopes=true&state=state_parameter_passthrough_value&scope=${SCOPE}&client_id=${
        import.meta.env.VITE_CLIENT_ID
      }&response_type=code&redirect_uri=${REDIRECT_URI}`
    );
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
          const { name, picture, email } = userInfo;
          if (userInfo) {
            navigate("/");
            setUser({
              accessToken: access_token,
              refreshToken: refresh_token,
              username: name,
              profilePicture: picture,
              email: email,
            });
          }
        }
      } catch (error) {
        alert("Something went wrong");
        console.error(error);
      }
    },
    [navigate, setUser]
  );

  const handleSignOut = () => {
    removeUser();
    setIsLoggedIn(false);
  };

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
            sx={{
              ml: 2,
            }}
            aria-controls={open ? "account-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
          >
            <img
              style={{ width: "32px", height: "32px", borderRadius: "50%" }}
              src="https://lh3.googleusercontent.com/a/ACg8ocLyfWhFxI_VnjHOfqj7CFp-ifqLtbCs8Wnvor9rBBfWinVU=s96-c"
              alt="user"
              referrerPolicy="no-referrer"
              onError={(event) => {
                console.log("error", event.target.src);
              }}
            />
          </IconButton>
        </Tooltip>
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
        {isLoggedIn ? (
          <>
            <MenuItem sx={{ display: "flex", gap: "10px" }}>
              <img
                style={{
                  height: 32,
                  width: 32,
                  objectFit: "cover",
                  borderRadius: "50%",
                }}
                src="https://placehold.co/600x400"
                alt="profileImage"
              />
              <div>
                <p>{username}</p> <p>{email}</p>
              </div>
            </MenuItem>
            <Divider />
            <MenuItem>
              <ListItemIcon>
                <PersonAdd fontSize="small" />
              </ListItemIcon>
              Add another account
            </MenuItem>
          </>
        ) : (
          <MenuItem onClick={handleSignIn}>
            <Link
              style={{ display: "flex", alignItems: "center" }}
              to={`https://accounts.google.com/o/oauth2/v2/auth?access_type=offline&include_granted_scopes=true&state=state_parameter_passthrough_value&scope=${SCOPE}&client_id=${
                import.meta.env.VITE_CLIENT_ID
              }&response_type=code&redirect_uri=${
                import.meta.env.VITE_REDIRECT_URI
              }&credentials=include&withCredentials=true`}
            >
              <Avatar /> Sign In
            </Link>
          </MenuItem>
        )}

        <MenuItem onClick={toggleThemeMenu}>
          <ListItemIcon>
            <Brightness4Icon fontSize="small" />
          </ListItemIcon>
          Appearance
        </MenuItem>
        <Collapse in={isThemeMenuOpen} timeout="auto" unmountOnExit>
          <MenuItem
            onClick={() => {
              changeThemeMode("systemPreference");
            }}
          >
            <ListItemIcon>
              <ContrastIcon fontSize="small" />
            </ListItemIcon>
            Use device theme
          </MenuItem>
          <MenuItem
            onClick={() => {
              changeThemeMode("dark");
            }}
          >
            <ListItemIcon>
              <DarkModeIcon fontSize="small" />
            </ListItemIcon>
            Dark theme
          </MenuItem>
          <MenuItem
            onClick={() => {
              changeThemeMode("light");
            }}
          >
            <ListItemIcon>
              <LightModeIcon fontSize="small" />
            </ListItemIcon>
            Light theme
          </MenuItem>
          {isLoggedIn && <Divider />}
        </Collapse>
        {isLoggedIn && (
          <>
            <MenuItem onClick={handleSignOut}>
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
