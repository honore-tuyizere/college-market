import Chats from "./components/Chats";
import UserChatHeader from "./components/UserChatHeader";
import ChatBox from "./components/ChatBox";
import { ChatProvider } from "../../providers/ChatContextProvider";

export const AllChatsPage = () => {
  return (
    <>
      <ChatProvider>
        <div className='h-[80vh] w-full  rounded-md flex'>
          <div className='flex flex-col w-72 sticky shadow-xl bg-white'>
            <div className=''>
              <UserChatHeader />
            </div>
            <div className='chats h-full shadow-md overflow-y-auto'>
              <Chats />
            </div>
          </div>
          <div className='flex h-full w-full max-w-[40rem]'>
            <ChatBox />
          </div>
        </div>
      </ChatProvider>
    </>
  );
};

export default AllChatsPage;
