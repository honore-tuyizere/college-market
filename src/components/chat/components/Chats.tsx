import Chat from "./Chat";
import { IChatDTO } from "../../../types";
import {
  Dispatch,
  FC,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from "react";
import { socket } from "../../../utils/socket";
import { AuthContext, IAuthContext } from "../../../context/Auth";

interface IProps {
  setRoomId: Dispatch<SetStateAction<string>>;
}
const Chats: FC<IProps> = ({ setRoomId }) => {
  const authCtx = useContext(AuthContext) as IAuthContext;
  const [loadingThreads, setLoadingThreads] = useState<boolean>(true);
  const [threads, setThreads] = useState<IChatDTO[]>([]);
  useEffect(() => {
    socket.emit("get-chat-threads", authCtx.user?._id);
  }, [authCtx]);

  socket.on("retrieved-chat-threads", (data: IChatDTO[]) => {
    setLoadingThreads(false);
    setThreads(data);
  });
  return (
    <>
      {loadingThreads && !threads[0] && <>Loading.. </>}
      {threads && (
        <div className='h-full w-full flex flex-col space-y-2'>
          {threads.map((chat: IChatDTO) => {
            return (
              <div className='' key={chat._id} onClick={() => setRoomId(chat._id)}>
                <Chat chat={chat} />
              </div>
            );
          })}
        </div>
      )}
    </>
  );
};

export default Chats;
