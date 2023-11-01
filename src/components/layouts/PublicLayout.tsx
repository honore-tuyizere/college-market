import { Outlet } from "react-router-dom";
import Navbar from "./navigation/NavBar";
import Footer from "./Footer";
const PublicLayout = () => {
  return (
    <>
      <Navbar />
      <Outlet />
      <Footer />
    </>
  );
};
export default PublicLayout;
