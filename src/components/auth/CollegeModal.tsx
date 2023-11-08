import { Dialog, Transition } from "@headlessui/react";
import { FC, Fragment, useContext, useState } from "react";
import { AuthContext } from "../../context/Auth";
import CollegeSelector from "./CollegeSelector";
import { setUserCollege } from "../../services/auth";
import { useMutation } from "@tanstack/react-query";
import { useSignIn, useAuthHeader } from "react-auth-kit";

interface CollegeModalProps {
  isOpen: boolean;
  setIsOpen: (arg0: boolean) => void;
}
const CollegeModal: FC<CollegeModalProps> = ({ isOpen }) => {
  const [college, setCollege] = useState<string>();
  const signIn = useSignIn();
  const header = useAuthHeader();
  const token = header().split(" ")[1];
  const doNothing = () => {};
  const context = useContext(AuthContext);
  const mutation = useMutation({
    mutationFn: setUserCollege,
    onSuccess(data) {
      signIn({
        token: token,
        expiresIn: 55,
        authState: data,
        tokenType: "Bearer",
      });
    },
  });
  const collegeChanged = (selectedCollege: string) => {
    setCollege(selectedCollege);
  };
  const updateCollege = () => {
    mutation.mutate(college as string);
  };

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as='div' className='relative z-10' onClose={doNothing}>
        <Transition.Child
          as={Fragment}
          enter='ease-out duration-300'
          enterFrom='opacity-0'
          enterTo='opacity-100'
          leave='ease-in duration-200'
          leaveFrom='opacity-100'
          leaveTo='opacity-0'
        >
          <div className='fixed inset-0 bg-black/25' />
        </Transition.Child>

        <div className='fixed inset-0 overflow-y-auto min-h-full'>
          <div className='flex min-h-full items-center justify-center p-4 text-center'>
            <Transition.Child
              as={Fragment}
              enter='ease-out duration-300'
              enterFrom='opacity-0 scale-95'
              enterTo='opacity-100 scale-100'
              leave='ease-in duration-200'
              leaveFrom='opacity-100 scale-100'
              leaveTo='opacity-0 scale-95'
            >
              <Dialog.Panel className='w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all '>
                <Dialog.Title
                  as='h3'
                  className='text-lg font-medium leading-6 text-gray-900'
                >
                  Nice to have you here!
                </Dialog.Title>
                <div className='mt-2 relative'>
                  <p className='text-sm text-gray-500'>
                    Dear {context?.user?.displayName}, Kindly let us kow your
                    college.
                  </p>
                  <div className='mt-2 min-h-[200px]'>
                    <CollegeSelector collegeChanged={collegeChanged} />
                  </div>
                </div>

                <div className='mt-4'>
                  <button
                    type='button'
                    disabled={!college || mutation.isPending}
                    className=' cursor-pointer inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2'
                    onClick={updateCollege}
                  >
                    {mutation.isPending ? "Saving ..." : "Save"}
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default CollegeModal;
