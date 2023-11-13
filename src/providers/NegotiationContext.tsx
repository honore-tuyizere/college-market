// ChatContext.js
import {
  FC,
  PropsWithChildren,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { useQuery } from "@tanstack/react-query";
import { getChat, getChatById } from "../apis/chats";
import { queryKeys } from "../utils/queryKeys";
import { IChat } from "../types";

const ChatContext = createContext();

const ChatProvider: FC<PropsWithChildren> = ({ children }) => {
  const [selectedChat, setSelectedChat] = useState<IChat>();
  const [selectedChat, setSelectedChat] = useState<IChat>();

  const { data: chat, isLoading } = useQuery({
    queryKey: [queryKeys.chat, selectedChat],
    queryFn: () => getChat(selectedChat),
    enabled: !!selectedChat,
  });

  const startChat = (chatId) => {
    // Implement logic to start a new chat
    setSelectedChat(chatId);
  };

  const value = {
    selectedChat,
    chat,
    isLoading,
    startChat,
  };

  return <ChatContext.Provider value={value}>{children}</ChatContext.Provider>;
};

const useChat = () => {
  const context = useContext(ChatContext);
  if (!context) {
    throw new Error("useChat must be used within a ChatProvider");
  }
  return context;
};

export { ChatProvider, useChat };
