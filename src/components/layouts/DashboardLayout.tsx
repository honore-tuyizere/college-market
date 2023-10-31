import { Outlet } from "react-router-dom";
import DashboardMenu from "./navigation/DashboardMenu";

const DashboardLayout = () => {
  return (
    <>
      <DashboardMenu />
      <Outlet />
    </>
  );
};

export default DashboardLayout;
