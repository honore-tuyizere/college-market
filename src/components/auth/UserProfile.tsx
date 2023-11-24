import { useContext } from "react";
import { AuthContext } from "../../context/Auth";
import { UserIcon } from "@heroicons/react/24/outline";

const UserProfile = () => {
  const context = useContext(AuthContext);

  const photoUrl = context?.user?.photos?.[0]?.value || "";

  return (
    <div className='w-7 h-7 rounded-full relative bg-gray-200 flex items-center justify-center'>
      <UserIcon className='w-4 h-4 text-gray-500 stroke-2' />
      <img
        src={photoUrl}
        alt=''
        className='absolute top-0 left-0 w-7 rounded-full'
      />
    </div>
  );
};

export default UserProfile;
