import { styled } from "@mui/material";
import MuiButton from "@mui/material/Button";
import { Link } from "react-router-dom";

export const Button = styled(MuiButton)({
	color: "#3EA6FF",
	display: "flex",
	alignItems: "center",
	textTransform: "capitalize",
	gap: 8,
	padding: "6px 12px",
	fontSize: 15,
});

export const StyledLink = styled(Link)({
	minWidth: "fit-content",
});
