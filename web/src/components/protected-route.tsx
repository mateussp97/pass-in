import { ReactNode, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { User } from "../api/User";

interface ProtectedRouteProps {
  children: ReactNode;
  requireAdmin?: boolean;
}

export function ProtectedRoute({
  children,
  requireAdmin = false,
}: ProtectedRouteProps) {
  const navigate = useNavigate();

  useEffect(() => {
    if (!User.isAuthenticated()) {
      navigate("/");
      return;
    }

    if (requireAdmin && !User.isAdmin()) {
      navigate("/dashboard");
    }
  }, [navigate, requireAdmin]);

  return <>{children}</>;
}
