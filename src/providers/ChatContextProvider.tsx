// ChatContext.js
import { FC, PropsWithChildren, useState, useEffect, useRef } from "react";
import { ChatContext } from "../context/Chat";
import { IChatDTO, IMessage } from "../types";
import { io, Socket } from "socket.io-client";

const ChatProvider: FC<PropsWithChildren> = ({ children }) => {
  const socket = useRef<Socket>();
  const [allChats, setAllChats] = useState<IChatDTO[]>([]);
  const [singleChat, setSingleChat] = useState<IChatDTO>();
  const joinedRooms = useRef(new Set<string>()); // Keep track of joined rooms

  const join = (room: string) => {
    if (!joinedRooms.current.has(room)) {
      socket?.current?.emit("join-room", room);
      joinedRooms.current.add(room);
    }
  };

  const send = (message: IMessage) => {
    console.log("socket message");
    socket?.current?.emit("sendMessage", message);
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

  const getMessage = (message: IMessage) => {
    console.log(message);
    if (message.chat._id === singleChat?._id) {
      const prev = { ...singleChat };
      prev.messages = prev.messages ? [...prev.messages, message] : [message];
      setSingleChat(prev);
    }

    setAllChats((prevChats) => {
      return prevChats.map((chat) => {
        if (chat._id === message.chat?._id) {
          const prev = { ...chat };
          prev.messages = prev.messages ? [...prev.messages, message] : [message];
          return prev as IChatDTO; // Add the type assertion here
        }
        return chat;
      });
    });
  };

  const value = {
    selectedChat: singleChat,
    setSelectedChat: setChatData,
    chats: allChats,
    setChats: setChatsData,
    joinRoom: join,
    sendMessage: send,
    getMessage,
  };

  useEffect(() => {
    socket.current = io("http://localhost:4321");

    return () => {
      // Disconnect the socket when the component unmounts
      // socket?.current?.disconnect();
    };
  }, []);

  useEffect(() => {
    if (socket.current) {
      socket.current.on("welcome", (data) => {
        console.log(data);
      });
      socket.current.on("getMessage", (data) => {
        console.log(data);
      });
    }
  }, [socket]);

  return <ChatContext.Provider value={value}>{children}</ChatContext.Provider>;
};

export { ChatProvider };
