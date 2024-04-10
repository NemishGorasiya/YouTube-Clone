import Drawer from "@mui/material/Drawer";
import { styled } from "@mui/material/styles";
import { useTheme } from "@mui/material/styles";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import { SideBarLinks } from "../../utils/constant";
import { Fragment } from "react";
import MuiDrawer from "@mui/material/Drawer";
import useMediaQuery from "@mui/material/useMediaQuery";

const SideBar = ({ open, toggleDrawer }) => {
  const theme = useTheme();
  const isLargeScreen = useMediaQuery(theme.breakpoints.up("lg"));

  const DrawerHeader = styled("div")(({ theme }) => ({
    ...theme.mixins.toolbar,
  }));

  const Drawer = styled(MuiDrawer)(() => ({
    ...(open && {
      width: "224px", // 220 + 12 + 12 (paddingX=12)
    }),
    ...(!open && {
      width: "74px",
    }),
  }));

  return (
    <Drawer
      open={open}
      variant={isLargeScreen ? "permanent" : "temporary"}
      onClose={() => {
        toggleDrawer(false);
      }}
      PaperProps={{
        sx: {
          paddingX: "12px",
          border: "none",
        },
      }}
    >
      <DrawerHeader></DrawerHeader>
      {SideBarLinks.map((sideBarSection, idx) => (
        <Fragment key={idx}>
          <List sx={open ? { maxWidth: "200px" } : { maxWidth: "50px" }}>
            {sideBarSection.links.map((link, idx) => (
              <ListItem key={idx} sx={{ padding: 0 }}>
                <ListItemButton
                  sx={{
                    paddingX: "13px",
                    gap: "15px",
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
                  <ListItemIcon sx={{ minWidth: 0 }}>{link.icon}</ListItemIcon>
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
            ))}
          </List>
          <Divider />
        </Fragment>
      ))}
    </Drawer>
  );
};

export default SideBar;
