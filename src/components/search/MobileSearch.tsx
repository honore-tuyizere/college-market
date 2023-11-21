import { useState, Fragment } from "react";
import SearchComponent from "./SearchComponent";
import MagnifyingGlassIcon from "@heroicons/react/24/outline/MagnifyingGlassIcon";
import { Dialog, Transition } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";

export default function MobileSearch() {
  const [isMobileSearchOpen, setIsMobileSearchOpen] = useState(false);
  return (
    <>
      <div className='flex gap-2 md:hidden'>
        <div
          onClick={() => setIsMobileSearchOpen(true)}
          className='left-0 right-0 max-w-full flex justify-center items-center'
        >
          <MagnifyingGlassIcon className='text-black w-5' />
          <span className='hidden sm:block'>Search</span>
        </div>
      </div>

      <Transition.Root show={isMobileSearchOpen} as={Fragment}>
        <Dialog
          as='div'
          className='relative'
          style={{ zIndex: 1000 }}
          onClose={setIsMobileSearchOpen}
        >
          <Transition.Child
            as={Fragment}
            enter='ease-in-out duration-500'
            enterFrom='opacity-0'
            enterTo='opacity-100'
            leave='ease-in-out duration-500'
            leaveFrom='opacity-100'
            leaveTo='opacity-0'
          >
            <div className='fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity' />
          </Transition.Child>

          <div className='fixed inset-0 overflow-hidden'>
            <div className='absolute inset-0 overflow-hidden'>
              <div className='pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10'>
                <Transition.Child
                  as={Fragment}
                  enter='transform transition ease-in-out duration-500 sm:duration-700'
                  enterFrom='translate-x-full'
                  enterTo='translate-x-0'
                  leave='transform transition ease-in-out duration-500 sm:duration-700'
                  leaveFrom='translate-x-0'
                  leaveTo='translate-x-full'
                >
                  <Dialog.Panel className='pointer-events-auto relative w-screen max-w-md'>
                    <Transition.Child
                      as={Fragment}
                      enter='ease-in-out duration-500'
                      enterFrom='opacity-0'
                      enterTo='opacity-100'
                      leave='ease-in-out duration-500'
                      leaveFrom='opacity-100'
                      leaveTo='opacity-0'
                    >
                      <div className='absolute left-0 top-0 -ml-8 flex pr-2 pt-4 sm:-ml-10 sm:pr-4'>
                        <button
                          type='button'
                          className='relative rounded-md text-gray-300 hover:text-white focus:outline-none focus:ring-2 focus:ring-white'
                          onClick={() => setIsMobileSearchOpen(false)}
                        >
                          <span className='absolute -inset-2.5' />
                          <span className='sr-only'>Close panel</span>
                          <XMarkIcon className='h-6 w-6' aria-hidden='true' />
                        </button>
                      </div>
                    </Transition.Child>
                    <div className='flex h-full flex-col overflow-y-scroll bg-white py-6 shadow-xl'>
                      <div className='relative mt-6 flex-1 px-4 sm:px-6'>
                        <SearchComponent
                          closeMobileMenu={() => setIsMobileSearchOpen(false)}
                        />
                      </div>
                    </div>
                  </Dialog.Panel>
                </Transition.Child>
              </div>
            </div>
          </div>
        </Dialog>
      </Transition.Root>
    </>
  );
}
