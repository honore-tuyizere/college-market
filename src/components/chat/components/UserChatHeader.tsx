import { FC, useContext } from "react";
import { AuthContext } from "../../../context/Auth";
import { XCircleIcon } from "@heroicons/react/24/outline";

interface Props {
  leftPanel: (state: boolean) => void;
}

const UserChatHeader: FC<Props> = ({ leftPanel }) => {
  const user = useContext(AuthContext)?.user;
  return (
    <div className='w-full h-16 bg-gray-50'>
      <div className='flex w-full py-4 px-4 items-center justify-between'>
        <div className='flex space-x-3'>
          <div className='pic'>
            <span className='flex items-center justify-center h-10 w-10 bg-teal-700 rounded-md text-2xl font-bold text-white uppercase'>
              {user?.displayName[0]}
            </span>
          </div>
          <div>
            <div className='text-xl font-medium'>My chats</div>
          </div>
        </div>
        <div onClick={() => leftPanel(false)}>
          <XCircleIcon className='w-7 h-7' />
        </div>
      </div>
    </div>
  );
};

export default UserChatHeader;
