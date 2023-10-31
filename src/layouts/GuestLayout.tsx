import { Outlet } from "react-router-dom";
import Navbar from "./navigation/NavBar";
const GuestLayout = () => {
  return (
    <>
      <div>Guest</div>
      <Navbar />
      <Outlet />
    </>
  );
};
export default GuestLayout;
