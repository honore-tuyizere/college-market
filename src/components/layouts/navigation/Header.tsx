import {
  MegaphoneIcon,
  GiftIcon,
  TicketIcon,
  UserCircleIcon,
  ChatBubbleBottomCenterTextIcon,
} from "@heroicons/react/24/outline";
// import Logo from "../../../assets/logo.png";
import { NavLink, useLocation } from "react-router-dom";
import CategoryHeader from "./CategoryHeader";
import Headroom from "react-headroom";
import { useEffect } from "react";
import SearchComponent from "../../search/SearchComponent";
import MobileSearch from "../../search/MobileSearch";
import { DonateProductsNumber } from "../../badge/DonateProductsNumber";
import { useAuthUser } from "react-auth-kit";
import UserProfile from "../../auth/UserProfile";

const Header = () => {
  const location = useLocation();
  const auth = useAuthUser();
  const authorized = auth();
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
        <nav className='flex pr-2 justify-between py-2 md:py-4 h-14 md:h-20 items-center justify-between border-b z-50 bg-white'>
          <div className='logo h-full px-6 md:px-12 lg:px-24 flex items-center'>
            <NavLink
              to={"/"}
              className={
                "font-bold xs:text-md sm:text-lg md:text-xl text-action-color-500"
              }
            >
              {/* <img src={Logo} alt='logo' className='h-full w-full object-cover' /> */}
              The college market
            </NavLink>
          </div>
          <div className='hidden lg:block md:w-60  overflow-visible relative'>
            <div className='md:absolute md:top-0 -mt-5 w-full'>
              <SearchComponent />
            </div>
          </div>

          <div className='flex gap-3 lg:gap-24 right-0 text-[13px]'>
            <div className='nav-icons flex gap-3 sm:gap-3 lg:gap-7 items-center'>
              <div className='md:hidden'>
                <MobileSearch />
              </div>
              <NavLink to={"/notice"} className='flex gap-1 items-center'>
                <MegaphoneIcon className='text-black w-5' />{" "}
                <span className='hidden sm:block font-semibold'>Notices</span>
              </NavLink>

              <NavLink to={"/donations"} className='flex gap-1 items-center'>
                <GiftIcon className='text-black w-5' />{" "}
                <span className='hidden sm:block font-semibold'>
                  <span className='flex'>
                    <p className='p-1'>Donate</p> <DonateProductsNumber />
                  </span>
                </span>
              </NavLink>

              <NavLink to={"/rent-products"} className='flex gap-1 items-center'>
                <TicketIcon className='text-black w-5' />{" "}
                <span className='hidden sm:block font-semibold'>
                  <span className='flex'>
                    <p className='p-1'>Rent</p>
                  </span>
                </span>
              </NavLink>

              {!authorized ? (
                <NavLink
                  to={"/login"}
                  className='flex gap-1 items-center items-center rounded-xl bg-white p-1.5 md:px-2 md:py-2 font-semibold text-gray-900 shadow-md  hover:bg-gray-50'
                >
                  <UserCircleIcon className='w-5 text-black' />{" "}
                  <span className='hidden sm:block font-semibold'>Login</span>
                </NavLink>
              ) : (
                <div className='flex'>
                  <NavLink
                    to={"/dashboard/chats"}
                    className='flex gap-1 items-center items-center rounded-xl bg-white md:px-4 md:py-2 font-semibold text-gray-900 shadow-md hover:bg-gray-50'
                  >
                    <ChatBubbleBottomCenterTextIcon className='w-5 text-black' />{" "}
                    <span className='sr-only'>Chat</span>
                  </NavLink>

                  <NavLink to={"/dashboard"} className='px-2'>
                    <UserProfile />
                  </NavLink>
                </div>
              )}
            </div>
          </div>
        </nav>
      </Headroom>
      {location.pathname === "/" && <CategoryHeader />}
    </>
  );
};

export default Header;
