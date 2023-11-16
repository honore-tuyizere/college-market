import Skeleton from "react-loading-skeleton";
import { IChatDTO } from "../../../types";

type props = {
  chat?: IChatDTO;
  isLoading: boolean;
  isOwner: boolean;
};
const ChatHeader = ({ chat, isLoading, isOwner }: props) => {
  return (
    <div className='h-16 bg-white flex items-center px-4 space-x-2 w-full'>
      {!isLoading && <Skeleton className='flex-1' />}
      {chat && (
        <>
          <div className='flex h-12 w-12'>
            <img
              src={chat.product.thumbnail}
              alt={chat.product.name}
              className='object-cover rounded-md'
            />
          </div>
          <div className=''>
            <div className='font-bold text-md capitalize text-gray-900'>
              {chat.product.name}
            </div>
            <div className='font-light text-sm'>
              {isOwner ? chat.buyer.displayName : chat.owner.displayName}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default ChatHeader;
