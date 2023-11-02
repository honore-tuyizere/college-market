import { Popover, Transition } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import { FC, Fragment } from "react";
import { FiltersComponentProps } from "../../types";

const Filters: FC<FiltersComponentProps> = ({ label }) => {
  return (
    <Popover className='relative w-full'>
      {({ open }) => (
        <>
          <Popover.Button
            className={`
                group inline-flex w-full items-center px-4 py-2 text-sm sm:text-base font-medium border rounded-full outline-none `}
          >
            <span>{label}</span>
            <ChevronDownIcon
              className={`${open ? " transform rotate-180" : ""}
                  ml-2 h-5 w-5 transition duration-150 ease-in-out`}
              aria-hidden='true'
            />
          </Popover.Button>
          <Transition
            as={Fragment}
            enter='transition ease-out duration-200'
            enterFrom='opacity-0 translate-y-1'
            enterTo='opacity-100 translate-y-0'
            leave='transition ease-in duration-150'
            leaveFrom='opacity-100 translate-y-0'
            leaveTo='opacity-0 translate-y-1'
          >
            <Popover.Panel className='absolute z-10 border'>
              <div className='p-2 min-w-[200px] bg-white flex flex-col gap-2'>
                <div className='flex gap-2 items-center'>
                  <input type='checkbox' name='name' id='' />{" "}
                  <span>Phone &Electronics</span>
                </div>
                <div className='flex gap-2 items-center'>
                  <input type='checkbox' name='name' id='' />{" "}
                  <span>Phone &Electronics</span>
                </div>
                <div className='flex gap-2 items-center'>
                  <input type='checkbox' name='name' id='' />{" "}
                  <span>Phone &Electronics</span>
                </div>
                <div className='flex gap-2 items-center'>
                  <input type='checkbox' name='name' id='' />{" "}
                  <span>Phone &Electronics</span>
                </div>
              </div>
            </Popover.Panel>
          </Transition>
        </>
      )}
    </Popover>
  );
};
export default Filters;
