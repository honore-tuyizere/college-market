import { Outlet } from "react-router-dom";
import DashboardMenu from "./navigation/DashboardMenu";

const DashboardLayout = () => {
  return (
    <>
      <div>Dashboard</div>
      <DashboardMenu />
      <Outlet />
    </>
  );
};

export default DashboardLayout;
