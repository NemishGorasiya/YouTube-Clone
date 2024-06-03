import React, { useState, useEffect } from "react";

const NoInternetPage = ({ children }) => {
	// state variable holds the state of the internet connection
	const [isOnline, setOnline] = useState(true);

	// On initization set the isOnline state.
	useEffect(() => {
		setOnline(navigator.onLine);
	}, []);

	// event listeners to update the state
	window.addEventListener("online", () => {
		setOnline(true);
	});

	window.addEventListener("offline", () => {
		setOnline(false);
	});

	// if user is online, return the child component else return a custom component
	if (isOnline) {
		return children;
	} else {
		return (
			<NotAuthorizedFallbackPageContainer>
				<IconWrapper>
					<NoAccountsStyledIcon />
				</IconWrapper>
				<Typography>Sign in to access this page</Typography>
				<SignInButton />
			</NotAuthorizedFallbackPageContainer>
		);
	}
};

export default NoInternetPage;
