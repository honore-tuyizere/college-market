import { useContext } from "react";
import { AuthContext } from "../../context/Auth";

const UserProfile = () => {
  const context = useContext(AuthContext);

  const photoUrl = context?.user?.photos?.[0]?.value || "";

  return (
    <div>
      <img src={photoUrl} alt='' className='w-10 rounded-full' />
    </div>
  );
};

export default UserProfile;
