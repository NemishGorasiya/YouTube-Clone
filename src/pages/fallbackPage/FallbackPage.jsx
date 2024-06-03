const FallbackPage = () => {
	return (
		<FallbackPageContainer>
			<IconWrapper>
				<NoAccountsStyledIcon />
			</IconWrapper>
			<Typography>Sign in to access this page</Typography>
			<SignInButton />
		</FallbackPageContainer>
	);
};

export default FallbackPage;
