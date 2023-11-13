import { FC } from "react";
import { IChatDTO } from "../../../types";
type props = {
  chat?: IChatDTO;
};
const Chat: FC<props> = ({ chat }) => {
  console.log(chat);
  return (
    <div className='flex flex-col py-3 px-4 border-b'>
      <div className='flex space-x-3 items-center'>
        <div className='pic flex items-center justify-center bg-teal-300 font-xl rounded-md'>
          <img
            src={
              "https://fastly.picsum.photos/id/63/5000/2813.jpg?hmac=HvaeSK6WT-G9bYF_CyB2m1ARQirL8UMnygdU9W6PDvM"
            }
            alt=''
            className='w-10 h-10 rounded-md'
          />
        </div>
        <div className='chat-detail'>
          <div className='text-sm font-bold text-gray-900'>{"Product name"}</div>
          <div className='text-sm font-md text-gray-400'>{"Seller Buyer name"}</div>
        </div>
      </div>
    </div>
  );
};

export default Chat;
