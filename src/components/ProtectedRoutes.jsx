import { useEffect } from "react";
import { Navigate } from "react-router-dom";
import useAuthStore from "../hooks/useAuthStore";

export default function ProtectedRoutes({ children }) {
    const { authUser, loading, checkAuth } = useAuthStore();

    useEffect(() => {
        checkAuth();
    }, [checkAuth]);

    if (loading) {
        return <div>Verifying authentication details. Please wait...</div>;
    }

    // If no user is logged in send to login
    if (!authUser) {
        return <Navigate to="/login" replace />;
    }

    // If logged in render the page
    return children;
}
