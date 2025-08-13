import { useEffect, useState } from "react";
import useAuthStore from "../hooks/useAuthStore";
import { Navigate } from "react-router-dom";
import CarLoader from "../resusables/CarLoader";

export default function PublicRoute({ children }) {
  const { authUser, loading } = useAuthStore();
  // const [waitOver, setWaitOver] = useState(false);

  // useEffect(() => { //to check 
  //   const timer = setTimeout(() => {
  //     setWaitOver(true);
  //   }, 5000); 
  //   return () => clearTimeout(timer);
  // }, []);

  if (loading) {
    return <CarLoader message="Loading authentication status..."/>;
  }

  if (authUser) {
    return <Navigate to="/" replace />;
  }

  return children;
}
