import { useContext } from "react";
import type { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import AuthContext from "../context/AuthContext";

export const PublicRoute = ({ children }: { children: ReactNode }) => {
  const { user } = useContext(AuthContext) as { user: { name: string } | null };

  if (user) {
    return <Navigate to="/" replace />;
  }
  return <>{children}</>;
};

const PrivateRoute = ({ children }: { children: ReactNode }) => {
  const token = localStorage.getItem("token");

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
};

export default PrivateRoute;
