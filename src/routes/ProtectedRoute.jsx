import { Outlet } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import NotAuthorizedFallbackPage from "../pages/notAuthorizedFallbackPage/NotAuthorizedFallbackPage";

const ProtectedRoute = () => {
	const { isLoggedIn } = useContext(AuthContext);
	return isLoggedIn ? (
		<>
			<Outlet />
		</>
	) : (
		<NotAuthorizedFallbackPage />
	);
};

export default ProtectedRoute;
