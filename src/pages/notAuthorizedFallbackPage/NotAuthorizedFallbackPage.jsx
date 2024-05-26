import { Box, Typography, styled } from "@mui/material";
import NoAccountsIcon from "@mui/icons-material/NoAccounts";
import NoAccountsOutlinedIcon from "@mui/icons-material/NoAccountsOutlined";
import SignInButton from "../../components/SignInButton";

const IconWrapper = styled(Box)(() => ({
	height: "150px",
	width: "150px",
}));
const NoAccountsStyledIcon = styled(NoAccountsOutlinedIcon)(() => ({
	height: "100%",
	width: "100%",
}));
const NotAuthorizedFallbackPageContainer = styled(Box)(() => ({
	height: "calc(100vh - 56px)",
	width: "100%",
	display: "flex",
	justifyContent: "center",
	alignItems: "center",
	flexDirection: "column",
	gap: "16px",
}));

const NotAuthorizedFallbackPage = () => {
	return (
		<NotAuthorizedFallbackPageContainer>
			<IconWrapper>
				<NoAccountsStyledIcon />
			</IconWrapper>
			<Typography>Sign in to access this page</Typography>
			<SignInButton />
		</NotAuthorizedFallbackPageContainer>
	);
};

export default NotAuthorizedFallbackPage;
