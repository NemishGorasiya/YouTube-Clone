import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import {
  NoInternetFallbackPageContainer,
  NoInternetImage,
  NoInternetImageWrapper,
} from "./NoInternetPageStyledComponents";
import { Typography } from "@mui/material";
import noInternetSvg from "./NoInternet.svg";

const NoInternetPage = ({ children }) => {
  console.log("image", noInternetSvg);
  const [isOnline, setOnline] = useState(navigator.onLine);

  useEffect(() => {
    const handleOnline = () => setOnline(true);
    const handleOffline = () => setOnline(false);

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    // Clean up the event listeners on component unmount
    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, []);

  if (isOnline) {
    return children;
  } else {
    return (
      <NoInternetFallbackPageContainer>
        <NoInternetImageWrapper>
          <NoInternetImage
            src={noInternetSvg}
            // referrerPolicy="no-referrer"
            alt="No Internet"
          />
        </NoInternetImageWrapper>
        <Typography>Connect to the internet</Typography>
        <Typography>You&apos;re offline. Check your connection.</Typography>
      </NoInternetFallbackPageContainer>
    );
  }
};

NoInternetPage.propTypes = {
  children: PropTypes.node,
};

export default NoInternetPage;
