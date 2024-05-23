import { Outlet } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const ProtectedRoute = () => {
  const { isLoggedIn } = useContext(AuthContext);
  return isLoggedIn ? (
    <>
      <Outlet />
    </>
  ) : (
    <h1>Sign in to view</h1>
  );
};

export default ProtectedRoute;
