import Skeleton from "react-loading-skeleton";

const ProductDetailsSkeleton = () => {
  return (
    <>
      <div className='flex py-12 justify-center'>
        <div className='flex flex-col max-w-[1000px] w-full'>
          <div className=' flex xs:flex-wrap sm:flex-nowrap w-full pb-3 xs:justify-center sm:justify-between xs:space-y-10 sm:space-y-0 sm:space-x-12'>
            <div className='w-full bg-gray-50 max-w-[300px] product-slide sm:max-w-90 lg:w-full lg:max-w-[380px] flex flex-col'>
              <div className='rounded-xl shadow-xl justify-center aspect-square w-full h-full'>
                <Skeleton className='flex-1 h-full' />
              </div>
            </div>
            <div className='xs:max-w-[500px] sm:max-w-none w-full xl:max-w-[500px]'>
              <div className=''>
                <div className='font-medium text-2xl'>
                  <Skeleton />
                </div>
                <div className='font-bold text-5xl'>
                  <Skeleton />
                </div>
                <div className='py-8 text-gray-500 my-2 text-lg'>
                  <Skeleton count={4} height={20} />
                </div>
              </div>

              <div className='flex w-full justify-between py-3'>
                <div className='w-full'>
                  <div className='text-md font-base text-gray-500 max-w-[100px]'>
                    <Skeleton />
                  </div>
                  <div className='text-lg uppercase font-medium max-w-[150px]'>
                    <Skeleton />
                  </div>
                </div>
                <div className='w-full'>
                  <div className='text-md font-base text-gray-500 max-w-[100px]'>
                    <Skeleton />
                  </div>
                  <div className='text-lg uppercase font-medium max-w-[150px]'>
                    <Skeleton />
                  </div>
                </div>
              </div>

              <div className='sm:flex w-full justify-between py-3'>
                <div className='w-20'>
                  <div className='text-teal-600 font-extra-bold text-5xl w-full block'>
                    <Skeleton />
                  </div>
                </div>
                <div className='flex flex-wrap sm:flex-col md:flex-row space-x-2 sm:space-x-0 sm:space-y-2 md:space-y-0 md:space-x-2'>
                  <div className='text-teal-600 font-extra-bold text-4xl'>
                    <Skeleton width={100} />
                  </div>
                  <div className='text-teal-600 font-extra-bold text-4xl'>
                    <Skeleton width={100} />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className='flex flex-wrap space-x-6 rounded-sm w-full xs:px-8 sm:px-0'>
            {Array(3)
              .fill(0)
              .map((_, i) => (
                <div className='w-[100px] h-[100px] rounded-md my-6' key={i}>
                  <Skeleton width={100} height={100} />
                </div>
              ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductDetailsSkeleton;
