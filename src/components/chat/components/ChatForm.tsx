import { FC, useContext } from "react";
import { useForm } from "react-hook-form";
import {
  messageSchema,
  messageSchemaType,
} from "../../../utils/schemas/chat.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import TextBox from "../../common/inputs/TextBox";
import { PaperAirplaneIcon } from "@heroicons/react/24/outline";
import { IMessage } from "../../../types";
import { socket } from "../../../utils/socket";
import { AuthContext } from "../../../context/Auth";

interface Props {
  chatId?: string;
}

const ChatForm: FC<Props> = ({ chatId }) => {
  const { register, handleSubmit, reset } = useForm<messageSchemaType>({
    resolver: zodResolver(messageSchema),
  });
  const authCtx = useContext(AuthContext);
  const submit = async (data: messageSchemaType): Promise<IMessage> => {
    return new Promise((resolve) => {
      socket.emit(
        "send-message",
        { chat: chatId, ...data, sender: authCtx!.user!._id },
        (message: IMessage) => {
          reset();
          resolve(message);
        },
      );
    });
  };
  return (
    <form
      className='flex w-full justify-between items-center'
      onSubmit={handleSubmit(submit)}
    >
      <TextBox
        type='text'
        register={register("text")}
        customStyles={
          "py-3 px-4 w-full rounded-l-md rounded-r-none border-none ring-0 focus:ring-0 bg-white"
        }
      />
      <div className='self-end'>
        <button className='bg-teal-700 py-2.5 px-3 rounded-r-md h-full'>
          <PaperAirplaneIcon className='w-7 h-7 text-white' />
        </button>
      </div>
    </form>
  );
};

export default ChatForm;
