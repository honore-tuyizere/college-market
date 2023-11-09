import { Outlet } from "react-router-dom";
import Navbar from "./navigation/NavBar";
import Footer from "./Footer";
const PublicLayout = () => {
  return (
    <>
      <div className='flex flex-col h-full justify-between'>
        <Navbar />
        <div className=''>
          <Outlet />
        </div>
        <Footer />
      </div>
    </>
  );
};
export default PublicLayout;
