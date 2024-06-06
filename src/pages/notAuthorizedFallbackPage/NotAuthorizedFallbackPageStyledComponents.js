import { Box, styled } from "@mui/material";
import NoAccountsOutlinedIcon from "@mui/icons-material/NoAccountsOutlined";

export const IconWrapper = styled(Box)({
	height: "150px",
	width: "150px",
});

export const NoAccountsStyledIcon = styled(NoAccountsOutlinedIcon)({
	height: "100%",
	width: "100%",
});

export const NotAuthorizedFallbackPageContainer = styled(Box)({
	height: "calc(100vh - 56px)",
	width: "100%",
	display: "flex",
	justifyContent: "center",
	alignItems: "center",
	flexDirection: "column",
	gap: "16px",
});
