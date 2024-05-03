import { Navigate, Outlet } from "react-router-dom";
import Layout from "../layout/Layout";
import useLocalStorage from "../hooks/useLocalStorage";

const ProtectedRoute = () => {
  const [user] = useLocalStorage("user", {});
  const { accessToken } = user;
  return accessToken ? (
    <>
      <Outlet />
    </>
  ) : (
    <h1>Sign in to view</h1>
  );
};

export default ProtectedRoute;
