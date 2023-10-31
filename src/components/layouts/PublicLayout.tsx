import { Outlet } from "react-router-dom";
import Navbar from "./navigation/NavBar";
const PublicLayout = () => {
  return (
    <>
      <Navbar />
      <Outlet />
    </>
  );
};
export default PublicLayout;
