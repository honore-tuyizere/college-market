import {
  MegaphoneIcon,
  GiftIcon,
  UserIcon,
  MagnifyingGlassIcon,
  TicketIcon,
} from "@heroicons/react/24/outline";
import Logo from "../../../assets/logo.png";
import { NavLink, useLocation } from "react-router-dom";
import CategoryHeader from "./CategoryHeader";
import Headroom from "react-headroom";
import { useEffect } from "react";

const Header = () => {
  const location = useLocation();
  useEffect(() => {
    if (location.pathname.includes("dashboard")) {
      document.querySelector("body")!.style.backgroundColor = "#ddd";
    } else {
      document.querySelector("body")!.style.backgroundColor = "#fff";
    }
  }, [location]);
  return (
    <>
      <Headroom style={{ zIndex: 999 }}>
        <nav className='flex px-6 md:px-12 lg:px-24 py-2 md:py-4 h-14 md:h-20 items-center justify-between border-b z-50 bg-white'>
          <div className='logo h-full'>
            <NavLink to={"/"}>
              <img src={Logo} alt='logo' className='h-full w-full object-cover' />
            </NavLink>
          </div>
          <div className='flex gap-3 lg:gap-24'>
            {location.pathname !== "/notice" && location.pathname !== "/login" && (
              <div className='search-input hidden md:block'>
                <input
                  type='text'
                  className='h-10 rounded-full w-72 px-7 border outline-none'
                  placeholder='Search product'
                />
              </div>
            )}

            <div className='nav-icons flex gap-5 sm:gap-3 lg:gap-7 text-sm items-center'>
              <div className='flex gap-2 md:hidden'>
                <MagnifyingGlassIcon className='text-black w-5' />
                <span className='hidden sm:block'>Search</span>
              </div>

              <NavLink to={"/notice"} className='flex gap-2'>
                <MegaphoneIcon className='text-black w-5' />{" "}
                <span className='hidden sm:block'>Notices</span>
              </NavLink>

              <NavLink to={"/donations"} className='flex gap-2'>
                <GiftIcon className='text-black w-5' />{" "}
                <span className='hidden sm:block'>Donations</span>
              </NavLink>

              <NavLink to={"/rent-products"} className='flex gap-2'>
                <TicketIcon className='text-black w-5' />{" "}
                <span className='hidden sm:block'>Rent</span>
              </NavLink>

              <NavLink to={"/dashboard"} className='flex gap-2'>
                <UserIcon className='w-5 text-black' />{" "}
                <span className='hidden sm:block'>Account</span>
              </NavLink>
            </div>
          </div>
        </nav>
      </Headroom>
      {location.pathname === "/" && <CategoryHeader />}
    </>
  );
};

export default Header;
