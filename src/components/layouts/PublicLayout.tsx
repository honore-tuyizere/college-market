import { Outlet } from "react-router-dom";
import Navbar from "./navigation/NavBar";
import Footer from "./Footer";
import "react-loading-skeleton/dist/skeleton.css";
import { SkeletonTheme } from "react-loading-skeleton";

const PublicLayout = () => {
  return (
    <div className='flex flex-col min-h-screen'>
      <div className='flex-grow'>
        <Navbar />
        <SkeletonTheme baseColor='#efefef' highlightColor='rgba(0,0,0,.07)'>
          <Outlet />
        </SkeletonTheme>
      </div>
      <div>
       <Footer />
      </div>
    </div>
  );
};

export default PublicLayout;
