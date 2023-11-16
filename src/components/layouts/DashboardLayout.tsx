import { useNavigate, Outlet, useLocation } from "react-router-dom";
import DashboardSidebarMenu from "./navigation/DashboardSidebarMenu";
import DashboardTopMenu from "./navigation/DashboardTopMenu";
import { useContext, useEffect } from "react";
import { useAuthUser } from "react-auth-kit";
import { AuthContext } from "../../context/Auth";
import { IUser } from "../../types";

const DashboardLayout = () => {
  const location = useLocation();
  const context = useContext(AuthContext);
  const auth = useAuthUser();
  const navigate = useNavigate();
  useEffect(() => {
    if (location.pathname.includes("dashboard")) {
      document.querySelector("body")!.style.backgroundColor = "#ddd";
    } else {
      document.querySelector("body")!.style.backgroundColor = "#fff";
    }
  }, [location]);
  useEffect(() => {
    const authUser = auth() as IUser;
    authUser && context?.setUser(authUser);
    authUser && context?.setIsLoggedIn(true);
    if (!authUser) {
      navigate("/login");
    }
  }, [auth, context, navigate]);
  return (
    <div className='wrapper md:pl-64'>
      {context?.isLoggedIn && (
        <>
          <DashboardSidebarMenu />
          <div className='w-full'>
            <DashboardTopMenu />
            <div className='p-5'>
              <Outlet />
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default DashboardLayout;
