import { FC } from "react";
import { IMessage } from "../../../types";
type props = {
  message?: IMessage;
  own?: boolean;
};
const Message: FC<props> = ({ message, own = false }) => {
  console.log(message);
  return (
    <div className={`flex my-2 ${own ? "flex-row justify-end" : ""}`}>
      <div
        className={`w-4/5 rounded-md p-3 ${
          own ? "bg-teal-600 text-white" : "bg-white text-gray-700"
        }`}
      >
        <div className={`text-sm`}>
          {own && <>Lorem ipsum, dolor sit amet consectetur adipisicing elit.</>}
          {!own && (
            <>
              {" "}
              Odit ipsum recusandae non, architecto nulla porro molestiae nobis quis
              harum dolor
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Message;
