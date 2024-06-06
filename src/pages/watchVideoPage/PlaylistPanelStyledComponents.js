import { styled, Typography, Box } from "@mui/material";

export const PlaylistPanelComponent = styled(Box)({
	padding: "0 12px",
	overflow: "auto",
	maxHeight: "100%",
	display: "flex",
	flexDirection: "column",
	gap: "8px",

	"&::-webkit-scrollbar-track": {
		boxShadow: "inset 0 0 6px rgba(0,0,0,0.3)",
		borderRadius: "12px",
	},
	"&::-webkit-scrollbar": {
		width: "12px",
	},
	"&::-webkit-scrollbar-thumb": {
		borderRadius: "10px",
		boxShadow: "inset 0 0 6px rgba(0,0,0,0.3)",
		backgroundColor: "#555",
	},
});

export const PlaylistPanelTitle = styled(Typography)({
	overflow: "hidden",
	display: "-webkit-box",
	WebkitLineClamp: 1,
	WebkitBoxOrient: "vertical",
	flexShrink: 0,
	fontSize: "20px",
	fontWeight: 600,
	paddingTop: "4px",
});
