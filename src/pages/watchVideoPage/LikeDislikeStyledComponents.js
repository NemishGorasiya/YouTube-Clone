import { Box, Button, styled } from "@mui/material";

export const LikeDislikeButtonWrapper = styled(Box)(({ theme }) => ({
	display: "flex",
	alignItems: "center",
	borderColor: "divider",
	borderRadius: 24,
	background: theme.palette.secondary.light,
}));

export const LikeButton = styled(Button)(() => ({
	borderTopRightRadius: 0,
	borderBottomRightRadius: 0,
	paddingLeft: 12,
	display: "flex",
	gap: 8,
}));

export const DislikeButton = styled(Button)(() => ({
	minWidth: "0",
	paddingRight: 12,
	borderTopLeftRadius: 0,
	borderBottomLeftRadius: 0,
}));
