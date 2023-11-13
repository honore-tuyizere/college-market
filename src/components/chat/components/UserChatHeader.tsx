import { useContext } from "react";
import { AuthContext } from "../../../context/Auth";

const UserChatHeader = () => {
  const user = useContext(AuthContext)?.user;
  return (
    <div className='w-full h-16 bg-gray-50'>
      <div className='flex w-full py-4 px-4 items-center space-x-3'>
        <div className='pic'>
          <span className='flex items-center justify-center h-10 w-10 bg-teal-700 rounded-md text-2xl font-bold text-white uppercase'>
            {user?.displayName[0]}
          </span>
        </div>
        <div>
          <div className='text-xl font-medium'>My chats</div>
        </div>
      </div>
    </div>
  );
};

export default UserChatHeader;
