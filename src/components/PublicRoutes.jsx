import { create } from "zustand";
import useAuthStore from "../hooks/useAuthStore";
import { Navigate } from "react-router-dom";

export default function PublicRoute({children}) {
    const { authUser, loading } = useAuthStore();

    if(loading){
        return <div>Loading authentication status...</div>;
    }
    if (authUser) {
        return <Navigate to="/" replace />;
    }

    return children;
}