import MuiButton from "@mui/material/Button";
import { useState } from "react";
import KeyboardDoubleArrowUpIcon from "@mui/icons-material/KeyboardDoubleArrowUp";
import { styled } from "@mui/material";

const Button = styled(MuiButton)(({ theme, visible }) => ({
	display: "none",
	...(visible && {
		display: "flex",
		padding: "4px 8px",
		position: "fixed",
		left: "50%",
		top: "70px",
		transform: "translateX(-50%)",
		fontSize: "20px",
		zIndex: 1,
		color: theme.palette.primary.main,
		background: "grey",
	}),
}));

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
		<Button
			// className={`scrollToTopButton ${visible ? "visible" : ""}`}
			visible={visible}
			onClick={scrollToTop}
		>
			<KeyboardDoubleArrowUpIcon /> Scroll To Top
		</Button>
	);
};

export default ScrollToTopButton;
