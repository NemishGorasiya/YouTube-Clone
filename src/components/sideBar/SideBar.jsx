import { styled } from "@mui/material/styles";
import { useTheme } from "@mui/material/styles";
import List from "@mui/material/List";
import MuiListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import MuiListItemIcon from "@mui/material/ListItemIcon";
// import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import { SideBarLinks } from "../../utils/constant";
import { Fragment } from "react";
import MuiDrawer from "@mui/material/Drawer";
import useMediaQuery from "@mui/material/useMediaQuery";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const SideBar = ({ open, toggleDrawer }) => {
  const theme = useTheme();
  const isLargeScreen = useMediaQuery(theme.breakpoints.up("lg"));

  const DrawerHeader = styled("div")(({ theme }) => ({
    ...theme.mixins.toolbar,
  }));
  const ListItem = styled(MuiListItem)(({ theme }) => ({
    borderRadius: "10px",
    color: theme.palette.primary.main,
    "&:hover": {
      background: theme.palette.background.light,
    },
  }));

  const Drawer = styled(MuiDrawer)(() => ({
    display: "flex",
    justifyContent: "center",
    ...(open && {
      width: "224px", // 220 + 12 + 12 (paddingX=12)
    }),
    ...(!open && {
      width: "74px",
    }),

    "& .MuiPaper-root": {
      background: theme.palette.background.default,
      color: theme.palette.primary.main,
      padding: "0 12px",
      border: "none",
      ...(open && {
        width: "224px",
      }),
      ...(!open && {
        width: "74px",
      }),
    },
  }));

  const ListItemIcon = styled(MuiListItemIcon)({
    color: theme.palette.primary.main,
    minWidth: 0,
  });

  return (
    <Drawer
      open={open}
      variant={isLargeScreen ? "permanent" : "temporary"}
      onClose={() => {
        toggleDrawer(false);
      }}
    >
      <DrawerHeader></DrawerHeader>
      {SideBarLinks.map((sideBarSection, idx) => (
        <Fragment key={idx}>
          <List sx={open ? { maxWidth: "200px" } : { maxWidth: "50px" }}>
            {sideBarSection.links.map((link, idx) => (
              <Link to={link.link} key={idx}>
                <ListItem key={idx} sx={{ padding: 0 }}>
                  <ListItemButton
                    sx={{
                      paddingX: "13px",
                      gap: "24px",
                      height: "40px",
                      ...(open
                        ? {}
                        : {
                            flexDirection: "column",
                            gap: "0",
                            height: "auto",
                          }),
                    }}
                  >
                    <ListItemIcon>{link.icon}</ListItemIcon>
                    <ListItemText>
                      <Typography
                        variant="body2"
                        noWrap
                        sx={
                          open
                            ? {}
                            : {
                                fontSize: "10px",
                                maxWidth: "50px",
                              }
                        }
                      >
                        {link.label}
                      </Typography>
                    </ListItemText>
                  </ListItemButton>
                </ListItem>
              </Link>
            ))}
          </List>
          <Divider />
        </Fragment>
      ))}
    </Drawer>
  );
};

SideBar.propTypes = {
  open: PropTypes.bool,
  toggleDrawer: PropTypes.func,
};

export default SideBar;
