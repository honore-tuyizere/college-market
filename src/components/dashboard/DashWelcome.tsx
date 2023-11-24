import BuildingOfficeIcon from "@heroicons/react/24/outline/BuildingOfficeIcon";
import CheckCircleIcon from "@heroicons/react/24/outline/CheckCircleIcon";
import { useContext, useState } from "react";
import { AuthContext } from "../../context/Auth";
import { Link } from "react-router-dom";
import Modal from "../common/Modal";
import ProductForm from "../products/ProductForm";
import { UserIcon } from "@heroicons/react/24/outline";
export default function DashWelcome() {
  const [productModal, setProductModal] = useState(false);
  const context = useContext(AuthContext);
  console.log(context);

  const photoUrl = context?.user?.photos?.[0]?.value;
  const name = context?.user?.displayName || "";
  const college = context?.user?.college?.name || "";

  return (
    <>
      <div className='bg-white shadow mt-4 rounded-md'>
        <div className='p-2 sm:px-6 lg:mx-auto lg:max-w-full'>
          <div className='py-6 md:flex md:items-center md:justify-between'>
            <div className='min-w-0 flex-1'>
              <div className='flex items-center'>
                <div>
                  <div className='flex items-center space-x-4'>
                    <div className='w-16 h-16 rounded-full relative bg-gray-200 flex items-center justify-center'>
                      <UserIcon className='w-10 h-10 text-gray-600' />
                      <img
                        className='absolute top-0 left-0 w-16 rounded-full'
                        src={photoUrl}
                        alt=''
                      />
                    </div>
                    <div className='flex flex-col'>
                      <h1 className='ml-3 text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:leading-9'>
                        Welcome, {name}
                      </h1>
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
              </div>
            </div>
            <div className='mt-6 flex space-x-3 md:mt-0 md:ml-4'>
              <Link to={"/"}>
                <div className='inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:ring-offset-2'>
                  Buy Product
                </div>
              </Link>
              <button
                type='button'
                onClick={() => setProductModal(true)}
                className='inline-flex items-center rounded-md border border-transparent bg-cyan-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-cyan-700 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:ring-offset-2'
              >
                Sell Product
              </button>
              {productModal && (
                <>
                  <Modal
                    title='New product'
                    onClose={() => setProductModal(false)}
                    isOpen={productModal}
                  >
                    <ProductForm setIsOpen={setProductModal} />
                  </Modal>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
