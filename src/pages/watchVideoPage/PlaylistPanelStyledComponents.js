import { Box, Typography, styled } from "@mui/material";

export const PlaylistPanelComponent = styled(Box)({
	padding: "0 12px",
	display: "flex",
	flexDirection: "column",
	gap: "8px",
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
