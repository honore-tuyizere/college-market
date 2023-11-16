import Skeleton from "react-loading-skeleton";
import { IChatDTO } from "../../../types";

type props = {
  chat?: IChatDTO;
  isLoading: boolean;
  isOwner: boolean;
};
const ChatHeader = ({ chat, isOwner }: props) => {
  return (
    <div className='h-16 bg-white flex items-center px-4 space-x-2 w-full'>
      {!chat && (
        <>
          <div className='flex space-x-2 items-center'>
            <Skeleton className='flex-1' height={45} width={45} />
            <div className=''>
              <Skeleton className='flex-1' height={20} width={200} />
              <Skeleton className='flex-1' height={16} width={100} />
            </div>
          </div>
        </>
      )}
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
