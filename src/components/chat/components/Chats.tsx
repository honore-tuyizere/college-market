import Chat from "./Chat";
import { useContext, useEffect } from "react";
import { ChatContext, IChatContext } from "../../../context/Chat";
import { useQuery } from "@tanstack/react-query";
import { getMyChats } from "../../../apis/chats";
import { queryKeys } from "../../../utils/queryKeys";
import { IChatDTO } from "../../../types";

const Chats = () => {
  const { setChats, chats, setSelectedChat } = useContext(
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
      {isLoading && <>Loading.. </>}
      {chats && (
        <div className='h-full w-full flex flex-col space-y-2'>
          {chats.map((chat: IChatDTO) => (
            <div className='' onClick={() => setSelectedChat(chat)} key={chat._id}>
              <Chat chat={chat} />
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default Chats;
