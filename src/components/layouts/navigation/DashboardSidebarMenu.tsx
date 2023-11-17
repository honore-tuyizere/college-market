import { Link } from "react-router-dom";
import Logo from "../../../assets/logo.png";

import {
  Cog6ToothIcon,
  SquaresPlusIcon,
  Square3Stack3DIcon,
  ChatBubbleLeftEllipsisIcon,
  ArrowRightOnRectangleIcon,
  XCircleIcon,
  MegaphoneIcon,
  RectangleGroupIcon,
  RectangleStackIcon,
  QueueListIcon,
} from "@heroicons/react/24/outline";
import { useSignOut } from "react-auth-kit";
import { useContext } from "react";
import { AuthContext } from "../../../context/Auth";

const DashboardSidebarMenu = () => {
  const isAdmin = useContext(AuthContext)?.user?.isAdmin;
  const toggleSidebar = () => {
    const body = document.querySelector("body");
    body?.classList.toggle("open-sidebar");
  };
  const singout = useSignOut();
  const logout = () => {
    singout();
  };

  return (
    <div className='sidebar transition duration-100 z-10 w-64 -left-64 top-0 md:left-0 fixed bg-white md:h-full flex-col justify-between  overflow-y-auto h-full'>
      <div className='px-4 sm:relative'>
        <div className='h-16 mt-2 mb-8 w-full flex items-center justify-between'>
          <img src={Logo} alt='logo' className='h-12 w-auto object-cover' />
          <span className='rounded-full md:hidden' onClick={() => toggleSidebar()}>
            <XCircleIcon className='w-8 h-8' />
          </span>
        </div>
        <ul className='mt-6'>
          <li className='flex w-full justify-between text-gray-500 hover:text-gray-900 hover:bg-gray-50 p-2 rounded-md cursor-pointer items-center mb-1'>
            <Link
              to={""}
              className='flex items-center focus:outline-none focus:ring-2 focus:ring-white'
            >
              <SquaresPlusIcon className='w-5 h-5 text-teal-600 stroke-2' />
              <span className='text-md ml-4 font-medium'>Dashboard</span>
            </Link>
          </li>
          <li className='flex w-full justify-between text-gray-500 hover:text-gray-900 hover:bg-gray-50 p-2 rounded-md cursor-pointer items-center mb-1'>
            <Link
              to={"products"}
              className='flex items-center focus:outline-none focus:ring-2 focus:ring-white'
            >
              <Square3Stack3DIcon className='w-5 h-5 text-teal-600 stroke-2' />
              <span className='text-md ml-4 font-medium'>Products</span>
            </Link>
          </li>
          {isAdmin && (
            <>
              <li className='flex w-full justify-between text-gray-500 hover:text-gray-900 hover:bg-gray-50 p-2 rounded-md cursor-pointer items-center mb-1'>
                <Link
                  to={"category"}
                  className='flex items-center focus:outline-none focus:ring-2 focus:ring-white'
                >
                  <RectangleGroupIcon className='w-5 h-5 text-teal-600 stroke-2' />
                  <span className='text-md ml-4 font-medium'>Categories</span>
                </Link>
              </li>
              <li className='flex w-full justify-between text-gray-500 hover:text-gray-900 hover:bg-gray-50 p-2 rounded-md cursor-pointer items-center mb-1'>
                <Link
                  to={"purposes"}
                  className='flex items-center focus:outline-none focus:ring-2 focus:ring-white'
                >
                  <RectangleStackIcon className='w-5 h-5 text-teal-600 stroke-2' />
                  <span className='text-md ml-4 font-medium'>Purposes</span>
                </Link>
              </li>
              <li className='flex w-full justify-between text-gray-500 hover:text-gray-900 hover:bg-gray-50 p-2 rounded-md cursor-pointer items-center mb-1'>
                <Link
                  to={"conditions"}
                  className='flex items-center focus:outline-none focus:ring-2 focus:ring-white'
                >
                  <QueueListIcon className='w-5 h-5 text-teal-600 stroke-2' />
                  <span className='text-md ml-4 font-medium'>Conditions</span>
                </Link>
              </li>
            </>
          )}
          <li className='flex w-full justify-between text-gray-500 hover:text-gray-900 hover:bg-gray-50 p-2 rounded-md cursor-pointer items-center mb-1'>
            <Link
              to={"notice"}
              className='flex items-center focus:outline-none focus:ring-2 focus:ring-white'
            >
              <MegaphoneIcon className='w-5 h-5 text-teal-600 stroke-2' />
              <span className='text-md ml-4 font-medium'>Notices</span>
            </Link>
          </li>
          <li className='flex w-full justify-between text-gray-500 hover:text-gray-900 hover:bg-gray-50 p-2 rounded-md cursor-pointer items-center mb-1'>
            <Link
              to={"chats"}
              className='flex items-center focus:outline-none focus:ring-2 focus:ring-white'
            >
              <ChatBubbleLeftEllipsisIcon className='w-5 h-5 text-teal-600 stroke-2 stroke-2' />
              <span className='text-md ml-4 font-medium'>Chats</span>
            </Link>
          </li>
          <li className='flex w-full justify-between text-gray-500 hover:text-gray-900 hover:bg-gray-50 p-2 rounded-md cursor-pointer items-center mb-1'>
            <Link
              to={"/dashboard/orders"}
              className='flex items-center focus:outline-none focus:ring-2 focus:ring-white'
            >
              <QueueListIcon className='w-5 h-5 text-teal-600 stroke-2' />
              <span className='text-md ml-4 font-medium'>Orders</span>
            </Link>
          </li>
          <li className='border-t mt-6 '>
            <ul className='p-2 mt-6  rounded-md'>
              <li className='flex w-full justify-between text-gray-500 hover:text-gray-900 p-1.5 rounded-md cursor-pointer items-center mb-.5'>
                <Link
                  to={""}
                  className='flex items-center focus:outline-none focus:ring-2 focus:ring-white'
                >
                  <Cog6ToothIcon className='w-5 h-5 text-gray-700' />
                  <span className='text-sm ml-4 font-medium'>Settings</span>
                </Link>
              </li>
              <li className='flex w-full justify-between text-gray-500 hover:text-gray-900 p-1.5 rounded-sm cursor-pointer items-center'>
                <Link
                  to={"#"}
                  onClick={() => logout()}
                  className='flex items-center focus:outline-none focus:ring-2 focus:ring-white'
                >
                  <ArrowRightOnRectangleIcon className='w-5 h-5 text-gray-700' />
                  <span className='text-sm ml-4 font-medium'>Logout</span>
                </Link>
              </li>
            </ul>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default DashboardSidebarMenu;
