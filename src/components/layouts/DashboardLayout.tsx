import { Outlet, useLocation } from "react-router-dom";
import DashboardSidebarMenu from "./navigation/DashboardSidebarMenu";
import DashboardTopMenu from "./navigation/DashboardTopMenu";
import { useEffect } from "react";

const DashboardLayout = () => {
  const location = useLocation();
  useEffect(() => {
    if (location.pathname.includes("dashboard")) {
      document.querySelector("body")!.style.backgroundColor = "#ddd";
    } else {
      document.querySelector("body")!.style.backgroundColor = "#fff";
    }
  }, [location]);
  return (
    <div className='wrapper md:pl-64'>
      <DashboardSidebarMenu />
      <div className='w-full'>
        <DashboardTopMenu />
        <div className='p-5'>
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
