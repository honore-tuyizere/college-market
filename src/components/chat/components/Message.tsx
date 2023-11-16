import { FC } from "react";
import { IMessage } from "../../../types";
type props = {
  message?: IMessage;
  own?: boolean;
};
const Message: FC<props> = ({ message, own = false }) => {
  return (
    <div className={`flex my-1.5 ${own ? "flex-row justify-end" : ""}`}>
      <div
        className={` relative rounded-md px-3 py-1.5 ${
          own ? "bg-teal-600 text-white" : "bg-white text-gray-700"
        }`}
      >
        <div className={`text-xs`}>{message?.text}</div>
      </div>
    </div>
  );
};

export default Message;
