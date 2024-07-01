import { useState, useEffect, useCallback } from "react";
import PropTypes from "prop-types";
import {
	NoInternetFallbackPageContainer,
	NoInternetImage,
	NoInternetImageWrapper,
} from "./NoInternetPageStyledComponents";
import { Typography } from "@mui/material";
import { noInternetBase64Url } from "../../utils/constant";

const NoInternetPage = ({ children }) => {
	const [isOnline, setIsOnline] = useState(navigator.onLine);

	const updateOnlineStatus = useCallback(() => {
		setIsOnline(navigator.onLine);
	}, []);

	useEffect(() => {
		window.addEventListener("online", updateOnlineStatus);
		window.addEventListener("offline", updateOnlineStatus);

		return () => {
			window.removeEventListener("online", updateOnlineStatus);
			window.removeEventListener("offline", updateOnlineStatus);
		};
	}, [updateOnlineStatus]);

	return isOnline ? (
		children
	) : (
		<NoInternetFallbackPageContainer>
			<NoInternetImageWrapper>
				<NoInternetImage
					src={`data:image/png;base64,${noInternetBase64Url}`}
					alt="No Internet"
				/>
			</NoInternetImageWrapper>
			<Typography>Connect to the internet</Typography>
			<Typography>You&apos;re offline. Check your connection.</Typography>
		</NoInternetFallbackPageContainer>
	);
};

NoInternetPage.propTypes = {
	children: PropTypes.node,
};

export default NoInternetPage;
