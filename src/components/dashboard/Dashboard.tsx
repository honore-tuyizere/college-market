import DashboardTopBar from "../layouts/navigation/TopBar";
import DashHeader from "./DashHeader";

export const Dashboard = () => {
  return (
    <>
      <DashboardTopBar title='My Dashboard'>
      </DashboardTopBar>
      <DashHeader />
    </>
  );
};

export default Dashboard;
