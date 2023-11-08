import { useNavigate } from "react-router-dom";
import { useEffect, ReactNode } from "react";
import { useIsAuthenticated } from "react-auth-kit";

interface Props {
  children: ReactNode;
}

const AuthGuard = ({ children }: Props) => {
  const isAuthenticated = useIsAuthenticated();
  const navigate = useNavigate();
  useEffect(() => {
    if (!isAuthenticated()) {
      navigate("/login");
    }
  }, [isAuthenticated, navigate]);
  return <>{children}</>;
};

export default AuthGuard;
