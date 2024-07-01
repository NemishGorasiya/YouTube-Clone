import { createContext, useCallback, useMemo, useState } from "react";
import PropTypes from "prop-types";
import useLocalStorage from "../hooks/useLocalStorage";

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
	const [user, setUser, removeUser] = useLocalStorage("user", null);
	const { accessToken = "" } = user || {};

	const [isLoggedIn, setIsLoggedIn] = useState(!!accessToken);

	const handleLogin = useCallback(
		(userInfo) => {
			setUser(userInfo);
			setIsLoggedIn(true);
		},
		[setUser]
	);

	const handleLogout = useCallback(() => {
		removeUser();
		setIsLoggedIn(false);
	}, [removeUser]);

	const contextValue = useMemo(
		() => ({
			user,
			isLoggedIn,
			handleLogin,
			handleLogout,
		}),
		[user, isLoggedIn, handleLogin, handleLogout]
	);

	return (
		<AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
	);
};

AuthContextProvider.propTypes = {
	children: PropTypes.node,
};
