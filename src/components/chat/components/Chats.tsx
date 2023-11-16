import Chat from "./Chat";
import { useContext, useEffect } from "react";
import { ChatContext, IChatContext } from "../../../context/Chat";
import { useQuery } from "@tanstack/react-query";
import { getMyChats } from "../../../apis/chats";
import { queryKeys } from "../../../utils/queryKeys";
import { IChatDTO } from "../../../types";

const Chats = () => {
  const { setChats, chats, setSelectedChat, selectedChat } = useContext(
    ChatContext,
  ) as IChatContext;
  const {
    isLoading,
    isFetched,
    data: queryChats,
  } = useQuery({
    queryKey: [queryKeys.chats],
    queryFn: () => getMyChats(),
  });

  useEffect(() => {
    if (isFetched && queryChats) {
      setChats(queryChats);
    }
  }, [isFetched, chats, queryChats, setChats]);

  return (
    <>
      {isLoading && (
        <div className='h-full w-full flex items-center justify-center'>
          Loading...
        </div>
      )}
      {chats && (
        <div className='h-full w-full flex flex-col'>
          {chats.map((chat: IChatDTO) => (
            <div
              className={chat._id == selectedChat?._id ? "bg-gray-100" : ""}
              onClick={() => setSelectedChat(chat)}
              key={chat._id}
            >
              <Chat chat={chat} />
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default Chats;
