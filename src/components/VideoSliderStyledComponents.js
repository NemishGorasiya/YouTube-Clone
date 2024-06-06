import { Box, Button, Typography, styled } from "@mui/material";

export const PlaylistTitleWrapper = styled(Box)({
	display: "flex",
	alignItems: "center",
	gap: "8px",
});

export const PlaylistTitleTypography = styled(Typography)({
	margin: "8px 0",
	fontSize: "20px",
	fontWeight: "600",
	overflow: "hidden",
	whiteSpace: "nowrap",
	textOverflow: "ellipsis",
});

export const PlaylistViewAllButton = styled(Button)({
	minWidth: "fit-content",
	height: "fit-content",
});
