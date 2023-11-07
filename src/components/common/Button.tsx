import { FC } from "react";
import SyncLoader from "react-spinners/PulseLoader";

interface puttonProps {
  label: string;
  onClick?: () => void;
  isLoading?: boolean;
  type?: "button" | "submit" | "reset";
}
const Button: FC<puttonProps> = (props) => {
  return (
    <>
      <div>
        <button
          type={props.type ? props.type : "button"}
          onClick={() => props.onClick && props.onClick()}
          className='rounded-md px-4 py-2.5 text-sm font-semibold text-white shadow-sm ring-1 ring-inset ring-teal-800 bg-teal-800 hover:bg-teal-900'
        >
          {props.isLoading ? (
            <SyncLoader size={8} color='#fff' />
          ) : (
            <>{props.label}</>
          )}
        </button>
      </div>
    </>
  );
};

export default Button;
