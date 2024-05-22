import { styled } from "@mui/material";
import MuiButton from "@mui/material/Button";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import { Link } from "react-router-dom";

const SCOPE =
  "https://www.googleapis.com/auth/youtube.force-ssl https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/userinfo.profile";

const Button = styled(MuiButton)(() => ({
  color: "#3EA6FF",
  display: "flex",
  alignItems: "center",
  textTransform: "capitalize",
  gap: 8,
  padding: "6px 12px",
  fontSize: 15,
  width: "fit-content",
}));

const SignInButton = () => {
  return (
    <Link
      to={`https://accounts.google.com/o/oauth2/v2/auth?access_type=offline&prompt=consent&include_granted_scopes=true&state=state_parameter_passthrough_value&scope=${SCOPE}&client_id=${
        import.meta.env.VITE_CLIENT_ID
      }&response_type=code&redirect_uri=${
        import.meta.env.VITE_REDIRECT_URI
      }&credentials=include&withCredentials=true`}
    >
      <Button variant="outlined">
        <AccountCircleOutlinedIcon fontSize="medium" />
        Sign In
      </Button>
    </Link>
  );
};

export default SignInButton;
