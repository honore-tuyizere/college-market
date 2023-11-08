import Logo from "../../../assets/logo.png";
import { Bars3BottomLeftIcon } from "@heroicons/react/24/outline";

const DashboardTopMenu = () => {

    const toggleSidebar = () => {
        const body = document.querySelector('body');
        body?.classList.toggle('open-sidebar');
    }

    return (
        <nav className="top-bar">
            <div className="w-full bg-white flex items-center px-8 py-2 h-20">
                <div className="brand flex space-x-3 items-center  md:hidden">
                    <Bars3BottomLeftIcon className="h-8 w-8" onClick={() => toggleSidebar()} />
                <img src={Logo} alt='logo' className='h-12 w-auto object-cover' />
                </div>
            </div>
        </nav>
    );

}

export default DashboardTopMenu;