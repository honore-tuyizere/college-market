import { FC } from "react";
import { IMessage } from "../../../types";
import Message from "./Message";
type props = {
  message?: IMessage;
};
const Messages: FC<props> = ({ message }) => {
  console.log(message);
  return (
    <div className='flex flex-col w-full h-full overflow-y-auto inset px-6'>
      <Message />
      <Message own={true} />
      <Message />
      <Message />
      <Message own={true} />
      <Message own={true} />
    </div>
  );
};

export default Messages;
