import { Link } from "react-router-dom";
import Logo from "../../../assets/logo.png";

import {
  Cog6ToothIcon,
  SquaresPlusIcon,
  BellAlertIcon,
  Square3Stack3DIcon,
  MagnifyingGlassIcon,
  HeartIcon,
  ArrowRightOnRectangleIcon,
  XCircleIcon,
  MegaphoneIcon,
  RectangleGroupIcon,
  RectangleStackIcon,
  QueueListIcon,
} from "@heroicons/react/24/outline";

const DashboardSidebarMenu = () => {
  const toggleSidebar = () => {
    const body = document.querySelector("body");
    body?.classList.toggle("open-sidebar");
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
        <div className='flex mb-4 mt-6 w-full px-0'>
          <div className='relative w-full'>
            <div className='text-gray-300 absolute ml-4 inset-0 m-auto w-4 h-4'>
              <MagnifyingGlassIcon className='w-4 h-4 text-teal-500' />
            </div>
            <input
              className='bg-gray-100  flex focus:outline-none focus:ring-1 focus:ring-gray-100 rounded w-full text-sm text-gray-700 placeholder-gray-400 bg-gray-100 pl-10 py-2'
              type='text'
              placeholder='Search'
            />
          </div>
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
              to={"/dashboard/orders"}
              className='flex items-center focus:outline-none focus:ring-2 focus:ring-white'
            >
              <QueueListIcon className='w-5 h-5 text-teal-600 stroke-2' />
              <span className='text-md ml-4 font-medium'>Orders</span>
            </Link>
          </li>
          <li className='flex w-full justify-between text-gray-500 hover:text-gray-900 hover:bg-gray-50 p-2 rounded-md cursor-pointer items-center mb-1'>
            <Link
              to={""}
              className='flex items-center focus:outline-none focus:ring-2 focus:ring-white'
            >
              <HeartIcon className='w-5 h-5 text-teal-600 stroke-2' />
              <span className='text-md ml-4 font-medium'>Liked products</span>
            </Link>
            <div className='py-1 px-2.5 bg-teal-600 rounded text-gray-50 flex items-center justify-center text-xs'>
              8
            </div>
          </li>
          <li className='flex w-full justify-between text-gray-500 hover:text-gray-900 hover:bg-gray-50 p-2 rounded-md cursor-pointer items-center mb-1'>
            <Link
              to={""}
              className='flex items-center focus:outline-none focus:ring-2 focus:ring-white'
            >
              <BellAlertIcon className='w-5 h-5 text-teal-600 stroke-2' />
              <span className='text-md ml-4 font-medium'>Notifications</span>
            </Link>
            <div className='py-1 px-2.5 bg-teal-600 rounded text-gray-50 flex items-center justify-center text-xs'>
              25
            </div>
          </li>
          <li className='border-t mt-6  border-gray-100'>
            <ul className='p-2 mt-6 bg-gray-50 rounded-md'>
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
                  to={""}
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
