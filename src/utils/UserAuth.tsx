import { useNavigate } from "react-router-dom";
import { useEffect, ReactNode } from "react";

interface Props {
  children: ReactNode;
}

const UserAuth = ({ children }: Props) => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!token || token === "undefined") {
      console.log("You're not logged in.");
      navigate("/login");
    }
  }, [navigate, token]);

  return <>{children}</>;
};

export default UserAuth;
