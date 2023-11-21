import Modal from "../common/Modal";
import { useState } from "react";
import Container from "../common/Container";
import { getMyProfile } from "../../apis/user";
import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "../../utils/queryKeys";
import { PencilSquareIcon } from "@heroicons/react/24/outline";
import ProfileForm from "./UpdateProfileForm";

const ProfileDashboard = () => {
  const [formOpen, setFormOpen] = useState(false);

  const { isLoading, data: userInfo } = useQuery({
    queryFn: () => getMyProfile(),
    queryKey: queryKeys.userInDashboard,
  });

  return (
    <Container>
      {isLoading && (
        <>
          <p className='p-12 text-center'>Loading...</p>
        </>
      )}
      {userInfo && (
        <div className='max-w-xs sm:max-w-md md:max-w-lg lg:max-w-2xl xl:max-w-4xl'>
          <div className='bg-white shadow-xl rounded-lg py-3 px-4 sm:p-6 flex items-center'>
            <div className='photo-wrapper pr-4'>
              <img
                className='w-[300px] h-[300px]'
                src={userInfo.photos?.[0]?.value}
                alt='userImage'
              />
            </div>
            <div className='px-20'>
              <h3 className='text-xl text-gray-900 font-medium leading-8'>
                {userInfo.displayName}
              </h3>
              <div className='text-gray-400 text-xs font-semibold mb-2'>
                <p>{userInfo?.college?.name}</p>
              </div>

              <table className='text-xs my-3'>
                <tbody>
                  <tr>
                    <td className='px-2 py-2 text-gray-500 font-semibold'>
                      Bank Account
                    </td>
                    <td className='px-2 py-2'>{userInfo.bankAccount}</td>
                  </tr>
                  <tr>
                    <td className='px-2 py-2 text-gray-500 font-semibold'>
                      Bank Name
                    </td>
                    <td className='px-2 py-2'>{userInfo.bankName}</td>
                  </tr>
                  <tr>
                    <td className='px-2 py-2 text-gray-500 font-semibold'>Phone</td>
                    <td className='px-2 py-2'>{userInfo.phone}</td>
                  </tr>
                  <tr>
                    <td className='px-2 py-2 text-gray-500 font-semibold'>Email</td>
                    <td className='px-2 py-2'>{userInfo.email}</td>
                  </tr>
                  <tr>
                    <td className='px-2 py-2 text'>
                      <PencilSquareIcon
                        className='w-6 h-6 text-teal-500'
                        onClick={() => setFormOpen(true)}
                      />
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      <Modal
        title='Edit Profile'
        onClose={() => setFormOpen(false)}
        isOpen={formOpen}
      >
        <ProfileForm setIsOpen={setFormOpen} profileInfo={userInfo!} />
      </Modal>
    </Container>
  );
};

export default ProfileDashboard;
