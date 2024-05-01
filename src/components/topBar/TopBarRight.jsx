import {
  AccountCircle,
  ExpandLess,
  ExpandMore,
  Logout,
  PersonAdd,
  Settings,
  StarBorder,
} from "@mui/icons-material";
import {
  Avatar,
  Badge,
  Box,
  Divider,
  IconButton,
  ListItemIcon,
  MenuItem,
  Tooltip,
  Menu,
  Collapse,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import NightlightRoundIcon from "@mui/icons-material/NightlightRound";
import LightModeIcon from "@mui/icons-material/LightMode";
import ContrastIcon from "@mui/icons-material/Contrast";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import NotificationsIcon from "@mui/icons-material/Notifications";
import { useEffect, useState } from "react";
import { isLastDayOfMonth } from "date-fns";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { redirect } from "react-router-dom";
import { fetchAccessToken } from "../../services/services";
import useLocalStorage from "../../hooks/useLocalStotage";

const REDIRECT_URI = "http:localhost:5173";
const SCOPE = "https://www.googleapis.com/auth/youtube.force-ssl";

const TopBarRight = () => {
  const isLoggedIn = false;
  const navigate = useNavigate();
  const [accessToken, setAccessToken] = useLocalStorage("accessToken", null);
  const [refreshToken, setRefreshToken] = useLocalStorage("refreshToken", null);

  const [searchParams, setSearchParams] = useSearchParams();

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

  const getAccessToken = async (code) => {
    const queryParams = {
      code: code,
      client_id: import.meta.env.VITE_CLIENT_ID,
      client_secret: import.meta.env.VITE_CLIENT_SECRET,
      redirect_uri: REDIRECT_URI,
      grant_type: "authorization_code",
    };
    try {
      const res = await fetchAccessToken({
        queryParams: queryParams,
      });
      if (res) {
        const { access_token, refresh_token } = res;
        setAccessToken(access_token);
        setRefreshToken(refresh_token);
      }
    } catch (error) {
      console.error(error.message);
    }
  };

  useEffect(() => {
    const code = searchParams.get("code");
    const error = searchParams.get("error");
    if (error) {
      alert(error);
    }
    if (code) {
      console.log("code", code);
      getAccessToken(code);
    }
  }, []);

  return (
    <Box>
      <Box sx={{ display: "flex", alignItems: "center", textAlign: "center" }}>
        <Tooltip title="Account settings">
          <IconButton
            onClick={handleClick}
            size="small"
            sx={{ ml: 2 }}
            aria-controls={open ? "account-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
          >
            <Avatar sx={{ width: 32, height: 32 }}>M</Avatar>
          </IconButton>
        </Tooltip>
      </Box>
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={closeProfileMenu}
        // onClick={closeProfileMenu}
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
            <MenuItem>
              <Avatar /> My account
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
            <Link to="https://accounts.google.com/o/oauth2/v2/auth?access_type=offline&include_granted_scopes=true&state=state_parameter_passthrough_value&scope=https://www.googleapis.com/auth/youtube.force-ssl&client_id=98674929623-u1ckk8oivv84sdojaegmjhpna9q7nqov.apps.googleusercontent.com&response_type=code&redirect_uri=http://localhost:5173&credentials=include&withCredentials=true">
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
          <MenuItem>
            <ListItemIcon>
              <ContrastIcon fontSize="small" />
            </ListItemIcon>
            Use device theme
          </MenuItem>
          <MenuItem>
            <ListItemIcon>
              <DarkModeIcon fontSize="small" />
            </ListItemIcon>
            Dark theme
          </MenuItem>
          <MenuItem>
            <ListItemIcon>
              <LightModeIcon fontSize="small" />
            </ListItemIcon>
            Light theme
          </MenuItem>
          {isLoggedIn && <Divider />}
        </Collapse>
        {isLoggedIn && (
          <>
            <MenuItem>
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
