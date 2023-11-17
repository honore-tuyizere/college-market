import BuildingOfficeIcon from "@heroicons/react/24/outline/BuildingOfficeIcon";
import CheckCircleIcon from "@heroicons/react/24/outline/CheckCircleIcon";
import { useContext } from "react";
import { AuthContext } from "../../context/Auth";
export default function DashWelcome() {
  const context = useContext(AuthContext);

  const photoUrl = context?.user?.photos?.[0].value;
  const name = context?.user?.displayName || "";
  const college = context?.user?.college?.name || "";
  return (
    <>
      <div className='bg-white shadow mt-4'>
        <div className='p-2 sm:px-6 lg:mx-auto lg:max-w-full'>
          <div className='py-6 md:flex md:items-center md:justify-between lg:border-t lg:border-gray-200'>
            <div className='min-w-0 flex-1'>
              <div className='flex items-center'>
                <img
                  className='hidden h-16 w-16 rounded-full sm:block'
                  src={photoUrl}
                  alt=''
                />
                <div>
                  <div className='flex items-center'>
                    <img
                      className='h-16 w-16 rounded-full sm:hidden'
                      src={photoUrl}
                      alt=''
                    />
                    <h1 className='ml-3 text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:leading-9'>
                      Welcome, {name}
                    </h1>
                  </div>
                  <dl className='mt-6 flex flex-col sm:ml-3 sm:mt-1 sm:flex-row sm:flex-wrap'>
                    <dt className='sr-only'>College</dt>
                    <dd className='flex items-center text-sm font-medium capitalize text-gray-500 sm:mr-6'>
                      <BuildingOfficeIcon
                        className='mr-1.5 h-5 w-5 flex-shrink-0 text-gray-400'
                        aria-hidden='true'
                      />
                      {college}
                    </dd>
                    <dt className='sr-only'>Account status</dt>
                    <dd className='mt-3 flex items-center text-sm font-medium capitalize text-gray-500 sm:mr-6 sm:mt-0'>
                      <CheckCircleIcon
                        className='mr-1.5 h-5 w-5 flex-shrink-0 text-green-400'
                        aria-hidden='true'
                      />
                      Verified account
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
            <div className='mt-6 flex space-x-3 md:mt-0 md:ml-4'>
              <button
                type='button'
                className='inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:ring-offset-2'
              >
                Buy Product
              </button>
              <button
                type='button'
                className='inline-flex items-center rounded-md border border-transparent bg-cyan-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-cyan-700 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:ring-offset-2'
              >
                Sell Product
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
