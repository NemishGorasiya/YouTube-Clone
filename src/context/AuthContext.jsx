import { createContext, useState } from "react";
import PropTypes from "prop-types";
import useLocalStorage from "../hooks/useLocalStorage";

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [user, setUser, removeUser] = useLocalStorage("user", {});
  const { accessToken } = user;
  const [isLoggedIn, setIsLoggedIn] = useState(accessToken ? true : false);

  const handleLogin = (userInfo) => {
    setUser(userInfo);
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    removeUser();
    setIsLoggedIn(false);
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, handleLogin, handleLogout }}>
      {children}
    </AuthContext.Provider>
  );
};

AuthContextProvider.propTypes = {
  children: PropTypes.node,
};
