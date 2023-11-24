import { Bars3BottomLeftIcon } from "@heroicons/react/24/outline";
import Dashtop from "../../dashboard/DashTop";
import { Link } from "react-router-dom";

const DashboardTopMenu = () => {
  const toggleSidebar = () => {
    const body = document.querySelector("body");
    body?.classList.toggle("open-sidebar");
  };

  return (
    <nav className='top-bar'>
      <div className='w-full mx-auto bg-white flex justify-between items-center px-8 py-2 h-20'>
        <div className='brand flex space-x-3 items-center  md:hidden'>
          <Bars3BottomLeftIcon className='h-8 w-8' onClick={() => toggleSidebar()} />
          <Link to={"/"}>
            <div className={"font-bold text-xl text-action-color-500"}>
              The college Market
            </div>
          </Link>
        </div>
        <div className='absolute right-4'>
          <Dashtop />
        </div>
      </div>
    </nav>
  );
};

export default DashboardTopMenu;
