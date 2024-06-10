import { Typography } from "@mui/material";
import SignInButton from "../../components/SignInButton";
import {
  IconWrapper,
  NoAccountsStyledIcon,
  NotAuthorizedFallbackPageContainer,
} from "./NotAuthorizedFallbackPageStyledComponents";

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
