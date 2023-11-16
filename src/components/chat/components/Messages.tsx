import { FC, useRef, useEffect } from "react";
import { IMessage } from "../../../types";
import Message from "./Message";
type props = {
  isLoading: boolean;
  isOwner: boolean;
  userId: string;
  messages?: IMessage[];
};
const Messages: FC<props> = ({ isLoading, messages, userId }) => {
  const messagesBoxRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const messagesBox = messagesBoxRef.current;
    if (messagesBox) {
      messagesBox.scrollTop = messagesBox.scrollHeight;
    }
  }, [messagesBoxRef, messages]);
  return (
    <div
      ref={messagesBoxRef}
      className='flex flex-col w-full h-full overflow-y-auto inset px-6'
    >
      {isLoading && !messages && (
        <div className='flex items-center h-full text-xs justify-center'>
          Loading messages...
        </div>
      )}
      {messages && (
        <>
          {messages.length == 0 && (
            <div className='flex items-center justify-center h-full text-xs'>
              Messages will display here
            </div>
          )}
          {messages.map((message: IMessage) => (
            <Message
              message={message}
              key={message._id}
              own={message.sender === userId}
            />
          ))}
        </>
      )}
    </div>
  );
};

export default Messages;
