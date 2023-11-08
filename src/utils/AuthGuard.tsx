import { useNavigate } from "react-router-dom";
import { useEffect, ReactNode } from "react";
import { useAuthUser } from "react-auth-kit";
import { IUser } from "../types";

interface Props {
  children: ReactNode;
}

const AuthGuard = ({ children }: Props) => {
  const auth = useAuthUser();
  const navigate = useNavigate();
  const authorized = auth() as IUser;
  useEffect(() => {
    if (!authorized) {
      navigate("/login");
    }
  }, [authorized, navigate]);

  return <>{children}</>;
};

export default AuthGuard;
