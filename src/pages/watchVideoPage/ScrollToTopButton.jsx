import { useState, useEffect, useCallback } from "react";
import KeyboardDoubleArrowUpIcon from "@mui/icons-material/KeyboardDoubleArrowUp";
import { Button } from "./ScrollToTopButtonStyledComponents";

const ScrollToTopButton = () => {
	const [isScrolled, setIsScrolled] = useState(false);

	const checkScrollTop = useCallback(() => {
		const scrolled = document.documentElement.scrollTop;
		setIsScrolled(scrolled > 1500);
	}, []);

	const scrollToTop = () => {
		window.scrollTo({
			top: 0,
			behavior: "smooth",
		});
	};

	useEffect(() => {
		window.addEventListener("scroll", checkScrollTop);
		return () => {
			window.removeEventListener("scroll", checkScrollTop);
		};
	}, [checkScrollTop]);

	return (
		<Button $isScrolled={isScrolled} variant="contained" onClick={scrollToTop}>
			<KeyboardDoubleArrowUpIcon /> Scroll To Top
		</Button>
	);
};

export default ScrollToTopButton;
