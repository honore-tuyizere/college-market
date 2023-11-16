import ChatHeader from "./ChatHeader";
import Messages from "./Messages";
import ChatForm from "./ChatForm";
import { useContext, useEffect } from "react";
import { ChatContext, IChatContext } from "../../../context/Chat";
import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "../../../utils/queryKeys";
import { getChatById } from "../../../apis/chats";
import { AuthContext } from "../../../context/Auth";

const ChatBox = () => {
  const { selectedChat, setSelectedChat, sendMessage, joinRoom } = useContext(
    ChatContext,
  ) as IChatContext;
  const user = useContext(AuthContext)?.user;

  const isOwner = () => {
    return selectedChat?.owner._id === user?._id;
  };
  const {
    isLoading,
    isFetched,
    data: queryChat,
  } = useQuery({
    queryKey: [queryKeys.chat, selectedChat?._id],
    queryFn: () => getChatById(selectedChat?._id || ""),
    enabled: selectedChat?._id !== undefined,
  });

  useEffect(() => {
    if (isFetched && queryChat) {
      setSelectedChat(queryChat);
    }
    joinRoom(selectedChat?._id || "");
  }, [isFetched, queryChat, setSelectedChat, selectedChat, joinRoom]);

  return (
    <>
      <div className='h-[80vh] flex flex-col bg-gray-100'>
        <div className='shadow-xl'>
          <ChatHeader
            chat={selectedChat}
            isLoading={isLoading}
            isOwner={isOwner()}
          />
        </div>
        <div className='flex-grow shadow-inner overflow-y-auto messages-box'>
          <Messages
            isLoading={isLoading}
            messages={selectedChat?.messages}
            isOwner={isOwner()}
            userId={user?._id || ""}
          />
        </div>
        <div className='pb-4 px-6'>
          <ChatForm chatId={selectedChat?._id} IOSendMessage={sendMessage} />
        </div>
      </div>
    </>
  );
};
export default ChatBox;
