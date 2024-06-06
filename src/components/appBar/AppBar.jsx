import { useCallback, useState } from "react";
import TopBar from "../topBar/TopBar";
import SideBar from "../sideBar/SideBar";

const AppBar = () => {
  const [open, setOpen] = useState(false);
  const toggleDrawer = useCallback((toOpen) => {
    if (toOpen === false) {
      setOpen(false);
      return;
    }
    setOpen((prevState) => !prevState);
  }, []);

  return (
    <>
      <TopBar toggleDrawer={toggleDrawer} />
      <SideBar open={open} toggleDrawer={toggleDrawer} />
    </>
  );
};

export default AppBar;
