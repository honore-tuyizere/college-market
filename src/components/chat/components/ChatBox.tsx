import ChatHeader from "./ChatHeader";
import Messages from "./Messages";
import ChatForm from "./ChatForm";
import { FC, ReactNode, useContext, useEffect, useState } from "react";
import { ChatContext, IChatContext } from "../../../context/Chat";
import { AuthContext } from "../../../context/Auth";
import { socket } from "../../../utils/socket";
import { IChatDTO, IMessage } from "../../../types";

interface Props {
  all?: boolean;
  leftPanelIcon?: ReactNode;
  threadId: string;
}
const ChatBox: FC<Props> = ({ all = false, leftPanelIcon, threadId }) => {
  const { selectedChat } = useContext(ChatContext) as IChatContext;
  const [loadingChatHistory, setLoadingChatHistory] = useState(true);
  const [messages, setMessages] = useState<IMessage[]>();
  const [chat, setChat] = useState<IChatDTO>();
  const user = useContext(AuthContext)?.user;
  const isOwner = () => {
    return selectedChat?.owner._id === user?._id;
  };
  useEffect(() => {
    if (threadId !== "") {
      socket.emit("join-room", threadId);
      setLoadingChatHistory(true);
    }
  }, [threadId]);

  useEffect(() => {
    socket.on("chatHistory", (chatHistory: IChatDTO) => {
      setLoadingChatHistory(false);
      setMessages(chatHistory.messages);
      setChat(chatHistory);
    });
    socket.on("getMessage", (data: IMessage) => {
      if (data.chat._id === threadId) {
        if (messages) {
          const latestMessages = [...messages, data];
          setMessages(latestMessages);
        } else {
          setMessages([data]);
        }
      }
    });
  }, [messages, threadId]);

  return (
    <div className='h-[80vh] flex flex-col bg-gray-100 w-full'>
      <div className='shadow-xl flex space-x-1 items-center bg-white'>
        {all && leftPanelIcon && leftPanelIcon}
        <ChatHeader chat={chat} isLoading={loadingChatHistory} isOwner={isOwner()} />
      </div>
      <div className='flex-grow shadow-inner overflow-y-auto messages-box'>
        <Messages
          isLoading={loadingChatHistory}
          messages={messages}
          isOwner={isOwner()}
          userId={user?._id || ""}
        />
      </div>
      <div className='pb-4 px-6'>
        <ChatForm chatId={threadId} />
      </div>
    </div>
  );
};
export default ChatBox;
