import { PropsWithChildren, FC } from "react";
const Container: FC<PropsWithChildren> = ({ children }) => {
  return (
    <div className='w-full px-2 sm:px-6 md:px-12 lg:px-24 py-2 md:py-4 relative'>
      {children}
    </div>
  );
};

export default Container;
