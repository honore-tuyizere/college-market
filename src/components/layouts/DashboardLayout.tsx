import { Outlet } from "react-router-dom";
import DashboardSidebarMenu from "./navigation/DashboardSidebarMenu";
import DashboardTopMenu from "./navigation/DashboardTopMenu";

const DashboardLayout = () => {
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
