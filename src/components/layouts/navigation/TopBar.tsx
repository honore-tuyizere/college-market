import { ReactNode } from "react";
type topBarProps = {
  title?: string;
  children?: ReactNode;
};

const DashboardTopBar = ({ title, children }: topBarProps) => {
  return (
    <div className='flex justify-between items-center'>
      <div className='text-2xl font-bold text-gray-900'>{title}</div>
      <div className='flex items-center space-1'>{children}</div>
    </div>
  );
};

export default DashboardTopBar;
