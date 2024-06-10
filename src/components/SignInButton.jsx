import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import { Button, StyledLink } from "./SignInButtonStyledComponents";

const SCOPE =
	"https://www.googleapis.com/auth/youtube.force-ssl https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/userinfo.profile";

const SIGNIN_REDIRECT_LINK = `https://accounts.google.com/o/oauth2/v2/auth?access_type=offline&prompt=consent&include_granted_scopes=true&state=state_parameter_passthrough_value&scope=${SCOPE}&client_id=${
	import.meta.env.VITE_CLIENT_ID
}&response_type=code&redirect_uri=${
	import.meta.env.VITE_REDIRECT_URI
}&credentials=include&withCredentials=true`;

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
