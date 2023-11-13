import { Dispatch, FC, SetStateAction } from "react";
import { useQuery } from "@tanstack/react-query";
import { IProduct } from "../../types";
import { queryKeys } from "../../utils/queryKeys";
import { getChat } from "../../apis/chats";
import ChatBox from "./components/ChatBox";

type IChat = {
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  product: IProduct;
};
const ChatModel: FC<IChat> = ({ setIsOpen, product }) => {
  const { data: chat, isLoading } = useQuery({
    queryKey: [queryKeys.chat, product._id],
    queryFn: () => getChat(product._id || ""),
  });
  console.log(setIsOpen, chat);
  return (
    <>
      <p>{isLoading && <>Loading</>}</p>
      {chat && <ChatBox />}
    </>
  );
};
export default ChatModel;
