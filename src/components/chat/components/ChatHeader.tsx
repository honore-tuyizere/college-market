import { FC } from "react";
interface Props {
  item?: string;
}
const ChatHeader: FC<Props> = ({ item }) => {
  console.log(item);
  return (
    <div className='h-16 bg-white flex items-center px-4 space-x-2'>
      <div className='flex h-12 w-12'>
        <img
          src={
            "https://fastly.picsum.photos/id/63/5000/2813.jpg?hmac=HvaeSK6WT-G9bYF_CyB2m1ARQirL8UMnygdU9W6PDvM"
          }
          alt=''
          className='object-cover rounded-md'
        />
      </div>
      <div className=''>
        <div className='font-bold text-md capitalize text-gray-900'>
          Product name
        </div>
        <div className='font-light text-sm'>User name</div>
      </div>
    </div>
  );
};

export default ChatHeader;
