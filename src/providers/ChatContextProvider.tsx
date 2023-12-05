// ChatContext.js
import { FC, PropsWithChildren, useState, useEffect } from "react";
import { ChatContext } from "../context/Chat";
import { IChatDTO, IMessage } from "../types/index";
import { socket } from "../utils/socket";
import { messagesMap } from "../utils/messagesMap";

const ChatProvider: FC<PropsWithChildren> = ({ children }) => {
  const [allChats, setAllChats] = useState<IChatDTO[]>([]);
  const [singleChat, setSingleChat] = useState<IChatDTO>();
  const [messages, setMessages] = useState<IMessage[]>([]);
  // const joinedRooms = useRef(new Set<string>());
  const [chatHistory, setChatHistory] = useState<IChatDTO[]>([]);

  const join = (room: string) => {
    socket?.emit("join-room", room);
  };

  const send = (message: IMessage) => {
    console.log("socket message");
    socket?.emit("sendMessage", message);
  };

  const setChatData = (chat: IChatDTO) => {
    setSingleChat(chat);
  };

  // const sendMessage = (text: string, chatId: string) => {
  //   socket.emit("sendMessage", { text, chatId: chatId });
  // };

  const setChatsData = (chats: IChatDTO[]) => {
    setAllChats(chats);
  };
  const showMessages = (messages: IMessage[]) => {
    // console.log("show messages", messages);
    setMessages(messages);
  };
  const getMessage = (message: IMessage) => {
    console.log(message);
    // if (message.chat._id === singleChat?._id) {
    //   const prev = { ...singleChat };
    //   prev.messages = prev.messages ? [...prev.messages, message] : [message];
    //   setSingleChat(prev);
    // }

    // setAllChats((prevChats) => {
    //   return prevChats.map((chat) => {
    //     if (chat._id === message.chat?._id) {
    //       const prev = { ...chat };
    //       prev.messages = prev.messages ? [...prev.messages, message] : [message];
    //       return prev as IChatDTO; // Add the type assertion here
    //     }
    //     return chat;
    //   });
    // });
  };

  const value = {
    selectedChat: singleChat,
    setSelectedChat: setChatData,
    chats: allChats,
    setChats: setChatsData,
    joinRoom: join,
    sendMessage: send,
    getMessage,
    messages,
    setMessages: showMessages,
    chatHistory,
  };

  useEffect(() => {
    if (socket) {
      socket.on("welcome", (data) => {
        console.log(data);
      });
      socket.on("chatHistory", (data: IChatDTO) => {
        console.log(data);
        setChatHistory([...chatHistory, data]);
        messagesMap.set(data._id, data);
        console.log(messagesMap);
      });
    }
  }, [socket]);

  return <ChatContext.Provider value={value}>{children}</ChatContext.Provider>;
};

export { ChatProvider };
