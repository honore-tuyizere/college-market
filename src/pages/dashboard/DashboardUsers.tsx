import DashUsers from "../../components/dashboard/DashUsers";
import DashboardTopBar from "../../components/layouts/navigation/TopBar";


export const DashboardUsers = () => {
  return (
    <>
      <DashboardTopBar title='Users'></DashboardTopBar>
      <DashUsers />
    </>
  );
};

export default DashboardUsers;
