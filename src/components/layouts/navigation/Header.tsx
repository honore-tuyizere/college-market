import {
  MegaphoneIcon,
  GiftIcon,
  TicketIcon,
  UserCircleIcon,
  ChatBubbleBottomCenterTextIcon,
} from "@heroicons/react/24/outline";
import Logo from "../../../assets/logo.png";
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
        <nav className='flex pr-2  py-2 md:py-4 h-14 md:h-20 items-center justify-between border-b z-50 bg-white'>
          <div className='logo h-full px-6 md:px-12 lg:px-24'>
            <NavLink to={"/"}>
              <img src={Logo} alt='logo' className='h-full w-full object-cover' />
            </NavLink>
          </div>
          <div className='hidden md:block'>
            <SearchComponent />
          </div>

          <div className='flex gap-3 lg:gap-24 right-0'>
            <div className='nav-icons flex gap-5 sm:gap-3 lg:gap-7 items-center'>
              <div>
                <MobileSearch />
              </div>
              <NavLink to={"/notice"} className='flex gap-2'>
                <MegaphoneIcon className='text-black w-6' />{" "}
                <span className='hidden sm:block font-semibold'>Notices</span>
              </NavLink>

              <NavLink to={"/donations"} className='flex gap-2'>
                <GiftIcon className='text-black w-6' />{" "}
                <span className='hidden sm:block font-semibold'>
                  <span className='flex'>
                    <p className='p-1'>Donate</p> <DonateProductsNumber />
                  </span>
                </span>
              </NavLink>

              <NavLink to={"/rent-products"} className='flex gap-2'>
                <TicketIcon className='text-black w-6' />{" "}
                <span className='hidden sm:block font-semibold'>
                  <span className='flex'>
                    <p className='p-1'>Rent</p>
                  </span>
                </span>
              </NavLink>

              {!authorized ? (
                <NavLink
                  to={"/login"}
                  className='flex gap-2 items-center rounded-xl bg-white md:px-2 md:py-2 font-semibold text-gray-900 shadow-md  hover:bg-gray-50'
                >
                  <UserCircleIcon className='w-6 text-black' />{" "}
                  <span className='hidden sm:block font-semibold'>Login</span>
                </NavLink>
              ) : (
                <div className='flex'>
                  <NavLink
                    to={"/dashboard/chats"}
                    className='flex gap-2 items-center rounded-xl bg-white md:px-4 md:py-2 font-semibold text-gray-900 shadow-md hover:bg-gray-50'
                  >
                    <ChatBubbleBottomCenterTextIcon className='w-6 text-black' />{" "}
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
