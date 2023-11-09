import { SyncLoader } from "react-spinners";

type props = {
  full?: boolean;
};
const Loading = ({ full = false }: props) => {
  return (
    <div
      className={`flex items-center justify-center w-full py-5 ${
        full ? "h-full" : ""
      }`}
    >
      <SyncLoader size={8} color='teal' />
    </div>
  );
};

export default Loading;
