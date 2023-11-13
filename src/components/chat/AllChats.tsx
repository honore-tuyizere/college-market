import { getMyChats } from "../../apis/chats";
import { queryKeys } from "../../utils/queryKeys";
import { useQuery } from "@tanstack/react-query";
import Chats from "./components/Chats";
// import ChatHeader from "./components/ChatHeader";
import UserChatHeader from "./components/UserChatHeader";
// import Messages from "./components/Messages";
// import ChatForm from "./components/ChatForm";
import ChatBox from "./components/ChatBox";

export const AllChats = () => {
  const { isLoading, data: chats } = useQuery({
    queryKey: [queryKeys.chats],
    queryFn: () => getMyChats(),
  });

  console.log(chats);
  return (
    <>
      <div className='h-[80vh] w-full  rounded-md flex'>
        <div className='flex flex-col w-72 sticky shadow-xl bg-white'>
          <div className=''>
            <UserChatHeader />
          </div>
          <div className='chats h-full shadow-md w-72 overflow-y-auto'>
            {isLoading && <>Loading...</>}
            {chats && <Chats chats={chats} />}
          </div>
        </div>
        <div className='flex h-full max-w-[30rem]'>
          <ChatBox />
        </div>
      </div>
    </>
  );
};

export default AllChats;
