import { useState } from "react";
import KeyboardDoubleArrowUpIcon from "@mui/icons-material/KeyboardDoubleArrowUp";
import { Button } from "./ScrollToTopButtonStyledComponents";

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
		window.scrollTo({
			top: 0,
			behavior: "smooth",
		});
	};

	window.addEventListener("scroll", toggleVisible);

	return (
		<Button visible={visible} onClick={scrollToTop}>
			<KeyboardDoubleArrowUpIcon /> Scroll To Top
		</Button>
	);
};

export default ScrollToTopButton;
