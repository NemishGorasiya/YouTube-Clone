import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import { Button, StyledLink } from "./SignInButtonStyledComponents";
import { SIGNIN_REDIRECT_LINK } from "../utils/constant";

const SignInButton = () => {
	return (
		<StyledLink to={SIGNIN_REDIRECT_LINK}>
			<Button variant="outlined">
				<AccountCircleOutlinedIcon fontSize="medium" />
				Sign In
			</Button>
		</StyledLink>
	);
};

export default SignInButton;
