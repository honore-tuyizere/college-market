// import { useNavigate } from "react-router-dom";
// import { useEffect, ReactNode, useContext } from "react";
// import { AuthContext } from "../context/Auth";
import { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

const AuthGuard = ({ children }: Props) => {
  // const authContext = useContext(AuthContext);
  // const navigate = useNavigate();
  // useEffect(() => {
  //   if (!authContext?.isLoggedIn) {
  //     navigate("/login");
  //   }
  // }, [authContext, navigate]);

  return <>{children}</>;
};

export default AuthGuard;
