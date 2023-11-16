import { createContext } from "react";
import { IChatDTO, IMessage } from "../types";

export interface IChatContext {
  selectedChat: IChatDTO | undefined;
  setSelectedChat: (chat: IChatDTO) => void;
  chats: IChatDTO[];
  setChats: (chats: IChatDTO[]) => void;
  joinRoom: (room: string) => void;
  sendMessage: (message: IMessage) => void;
  // isChatsLoading: boolean;
  // setIsChatsLoading: (state: boolean) => void;
  // isChatLoading: boolean;
  // setIsChatLoading: (state: boolean) => void;
  // sendMessage: (text: string, chatId: string) => void;
  getMessage: (message: IMessage) => void;
  // joinRoom: (room: string) => void;
}

export const ChatContext = createContext<IChatContext | null>(null);