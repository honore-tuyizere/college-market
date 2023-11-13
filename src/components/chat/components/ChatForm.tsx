import { FC } from "react";
import { useForm } from "react-hook-form";
import {
  messageSchema,
  messageSchemaType,
} from "../../../utils/schemas/chat.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { sendMessage } from "../../../apis/message";
import { IMessage } from "../../../types";
import TextBox from "../../common/inputs/TextBox";
import { PaperAirplaneIcon } from "@heroicons/react/24/outline";

interface Props {
  item?: string;
}

const ChatForm: FC<Props> = ({ item }) => {
  console.log(item);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<messageSchemaType>({
    resolver: zodResolver(messageSchema),
  });
  const messageMutation = useMutation({ mutationFn: sendMessage });
  const submit = (data: messageSchemaType) => {
    messageMutation.mutate(data, {
      onSuccess(result: IMessage) {
        console.log(result);
        // socket.emit("message", result);
      },
    });
    reset();
  };
  return (
    <form
      className='flex w-full justify-between items-center'
      onSubmit={handleSubmit(submit)}
    >
      <TextBox
        type='text'
        error={errors.text?.message}
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
