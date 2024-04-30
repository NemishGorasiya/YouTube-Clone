import { useState } from "react";
import TopBar from "../topBar/TopBar";
import SideBar from "../sideBar/SideBar";

const AppBar = () => {
  const [open, setOpen] = useState(false);
  const toggleDrawer = (shouldClose) => {
    if (shouldClose === false) {
      setOpen(false);
      return;
    }
    setOpen((prevState) => !prevState);
  };
  return (
    <>
      <TopBar open={open} toggleDrawer={toggleDrawer} />
      <SideBar open={open} toggleDrawer={toggleDrawer} />
    </>
  );
};

export default AppBar;
