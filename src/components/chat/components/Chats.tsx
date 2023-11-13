import { IChatDTO } from "../../../types";
// import { useContext } from "react";
// import { AuthContext } from "../../context/Auth";
import Chat from "./Chat";

type props = {
  chats: IChatDTO[];
};

const Chats = ({ chats }: props) => {
  console.log(chats);
  // const user = useContext(AuthContext)?.user;

  // const isOwner = (owner: string) => {
  //   return user?._id === owner;
  // };

  // const name = (user: IUser) => {
  //   return user.displayName;
  // };

  return (
    <>
      <div className='h-full w-full flex flex-col space-y-2'>
        <Chat key={1} />
        <Chat key={2} />
        <Chat key={3} />
        <Chat key={4} />
        <Chat key={5} />
        <Chat key={6} />
      </div>
    </>
  );
};

export default Chats;
