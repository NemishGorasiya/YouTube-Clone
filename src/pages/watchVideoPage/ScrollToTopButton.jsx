import { Button } from "@mui/material";
import { useState } from "react";
import KeyboardDoubleArrowUpIcon from "@mui/icons-material/KeyboardDoubleArrowUp";
import "./ScrollToTopButton.scss";

const ScrollToTopButton = () => {
  const [visible, setVisible] = useState(false);

  const toggleVisible = () => {
    const scrolled = document.documentElement.scrollTop;
    if (scrolled > 1500) {
      setVisible(true);
    } else if (scrolled <= 1500) {
      setVisible(false);
    }
  };

  const scrollToTop = () => {
    console.log("first");
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  window.addEventListener("scroll", toggleVisible);

  return (
    <Button className="scrollToTopButton" onClick={scrollToTop}>
      <KeyboardDoubleArrowUpIcon
        style={{ display: visible ? "inline" : "none" }}
      />
    </Button>
  );
};

export default ScrollToTopButton;
