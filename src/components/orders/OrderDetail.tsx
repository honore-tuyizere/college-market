import { useQuery } from "@tanstack/react-query";
import { FC } from "react";
import { queryKeys } from "../../utils/queryKeys";
import { getOrder } from "../../apis/orders";
import { IUser } from "../../types";

interface IOrderDetail {
  id: string;
}

const userImg = (user: IUser) => {
  const photoUrl = user?.photos?.[0]?.value || "";
  return (
    <div>
      <img src={photoUrl} alt='' className='w-10 rounded-full' />
    </div>
  );
};

const OrderDetail: FC<IOrderDetail> = ({ id }) => {
  const { isLoading, data: order } = useQuery({
    queryKey: [queryKeys.singleOrder, id],
    queryFn: () => getOrder(id || ""),
  });

  return (
    <>
      {isLoading && (
        <>
          <p className='p-12 text-center'>Loading...</p>
        </>
      )}
      {order && (
        <>
          <div className='flex space-x-4'>
            <img
              src={order.product.thumbnail}
              alt={order.product.name}
              className='w-20 h-20 rounded-md object-fit'
            />
            <div className='flex flex-col'>
              <div className='font-bold text-gray-900'>{order.product.name}</div>
              <div className='font-semibold text-gray-500'>${order.total}</div>
              <div className='pt-3 uppercase text-gray-300'>
                {order.product.purpose?.name}
              </div>
              <div className='font-medium uppercase text-gray-300'>
                {order.product.condition?.name}
              </div>
            </div>
          </div>
          <div className='flex items-center pt-4 space-x-4'>
            <div className='flex flex-col'>{userImg(order.orderer)}</div>
            <div className='text-semibold text-gray-500'>
              <div className=''>ORDERER</div>
              {order.orderer.displayName}
            </div>
          </div>
          <div className='flex items-center pt-4 space-x-4'>
            <div className='flex flex-col'>{userImg(order.product.owner)}</div>
            <div className='text-semibold text-gray-500'>
              <div className=''>OWNER</div>
              {order.product.owner.displayName}
            </div>
          </div>
          <div className='flex space-x-5 justify-between pt-6'>
            <div className='text-gray-600 font-light text-md'>Payment Status</div>
            <div>{order.paymentStatus}</div>
          </div>
          <div className='flex space-x-5 justify-between'>
            <div className='text-gray-600 font-light text-md'>Delivery Status</div>
            <div>{order.deliveryStatus}</div>
          </div>
          {order.days && order.days > 0 && (
            <>
              <div className='flex space-x-5 justify-between'>
                <div className='text-gray-600 font-light text-md'>Rent Days</div>
                <div>{order.days}</div>
              </div>
              {order.expectedReturnDate && (
                <div className='flex space-x-5 justify-between'>
                  <div className='text-gray-600 font-light text-md'>
                    Expected Return Date
                  </div>
                  <div>{order.expectedReturnDate.toString().slice(0, 10)}</div>
                </div>
              )}
              {order.returnedDate && (
                <div className='flex space-x-5'>
                  <div className='text-gray-600 font-light text-md'>Return Date</div>
                  <div>{order.returnedDate.toString().slice(0, 10)}</div>
                </div>
              )}
            </>
          )}
        </>
      )}
    </>
  );
};

export default OrderDetail;
