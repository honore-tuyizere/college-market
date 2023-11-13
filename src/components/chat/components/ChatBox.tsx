import { FC, useEffect } from "react";
import { IChat } from "../../../types";
import { io } from "socket.io-client";
import ChatHeader from "./ChatHeader";
import Messages from "./Messages";
import ChatForm from "./ChatForm";

const socket = io("http://localhost:4321");
socket.on("connect_error", (error) => {
  console.error("Connection error:", error);
});
socket.emit("message", "Hello");

type IChatProps = {
  chat?: IChat;
};

const ChatBox: FC<IChatProps> = ({ chat }) => {
  console.log(chat);
  useEffect(() => {
    console.log("Joining...");
    // Join the room on connection
    socket.emit("join-room", chat?._id);

    // Listen for incoming messages
    socket.on("message", (data) => {
      console.log("Received message:", data);
      // Handle the incoming message in your UI
    });

    socket.on("connect_error", (error) => {
      console.error("Connection error:", error);
    });

    return () => {
      // Clean up socket connection when component unmounts
      socket.disconnect();
    };
  }, [chat]);

  return (
    <>
      <div className='h-[80vh] flex flex-col bg-gray-100'>
        <div className='shadow-xl'>
          <ChatHeader />
        </div>
        <div className='flex-grow shadow-inner overflow-y-auto messages-box'>
          <Messages />
        </div>
        <div className='pb-4 px-6'>
          <ChatForm />
        </div>
      </div>
    </>
  );
};
export default ChatBox;
