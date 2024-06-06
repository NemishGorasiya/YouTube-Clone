import { useState, useEffect, useCallback } from "react";
import KeyboardDoubleArrowUpIcon from "@mui/icons-material/KeyboardDoubleArrowUp";
import { Button } from "./ScrollToTopButtonStyledComponents";

const ScrollToTopButton = () => {
  const [visible, setVisible] = useState(false);

  const toggleVisible = useCallback(() => {
    const scrolled = document.documentElement.scrollTop;
    setVisible(scrolled > 1500);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    window.addEventListener("scroll", toggleVisible);
    return () => {
      window.removeEventListener("scroll", toggleVisible);
    };
  }, [toggleVisible]);

  return (
    <Button visible={visible} onClick={scrollToTop}>
      <KeyboardDoubleArrowUpIcon /> Scroll To Top
    </Button>
  );
};

export default ScrollToTopButton;
