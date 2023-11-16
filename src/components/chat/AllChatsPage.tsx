import Chats from "./components/Chats";
import UserChatHeader from "./components/UserChatHeader";
import ChatBox from "./components/ChatBox";
import { ChatProvider } from "../../providers/ChatContextProvider";
import { useContext, useState } from "react";
import { Bars3BottomLeftIcon } from "@heroicons/react/24/outline";
import { ChatContext } from "../../context/Chat";

export const AllChatsPage = () => {
  const selectedChat = useContext(ChatContext)?.setSelectedChat;
  const [leftPanel, setLeftPanel] = useState(selectedChat === undefined);
  const toggleLeftPanel = () => {
    if (selectedChat === undefined) {
      setLeftPanel(true);
      return;
    }
    setLeftPanel(!leftPanel);
  };

  return (
    <>
      <ChatProvider>
        <div className='h-[80vh] w-full rounded-md flex relative overflow-hidden'>
          <div
            className={`flex flex-col w-[20rem] min-w-[15rem] h-full shadow-xl bg-white xs:absolute md:static top-0 ${
              leftPanel ? "left-0" : "-left-[20rem]"
            } z-50`}
          >
            <div className=''>
              <UserChatHeader leftPanel={setLeftPanel} />
            </div>
            <div className='chats h-full shadow-md overflow-y-auto relative'>
              <Chats />
            </div>
          </div>
          <div className='flex h-full w-max-full w-[30rem] relative'>
            <ChatBox
              all={true}
              leftPanelIcon={
                <div className='py-2 pl-5 pr-0 z-10 md:hidden'>
                  <Bars3BottomLeftIcon
                    className='w-6 h-6'
                    onClick={() => toggleLeftPanel()}
                  />
                </div>
              }
            />
          </div>
        </div>
      </ChatProvider>
    </>
  );
};

export default AllChatsPage;
