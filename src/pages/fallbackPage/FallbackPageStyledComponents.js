import { Box, styled } from "@mui/material";

export const FallbackPageContainer = styled(Box)(() => ({
	height: "calc(100vh - 56px)",
	width: "100%",
	display: "flex",
	justifyContent: "center",
	alignItems: "center",
	flexDirection: "column",
	gap: "16px",
}));
