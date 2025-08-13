import { useEffect } from "react";
import { Navigate } from "react-router-dom";
import useAuthStore from "../hooks/useAuthStore";
import CarLoader from "../resusables/CarLoader";

export default function ProtectedRoutes({ children }) {
    const { authUser, loading, checkAuth } = useAuthStore();

    useEffect(() => {
        checkAuth();
    }, [checkAuth]);

    if (loading) {
        return <CarLoader message="Loading authentication status..."/>;
    }

    // If no user is logged in send to login
    if (!authUser) {
        return <Navigate to="/login" replace />;
    }

    // If logged in render the page
    return children;
}
