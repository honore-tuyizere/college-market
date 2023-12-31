import Container from "../common/Container";
import GoogleLogo from "../../assets/GoogleLog.png";
import MicrosoftLogo from "../../assets/MicrosoftLog.png";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import { useLocation } from "react-router-dom";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { useEffect } from "react";

export const Login = () => {
  const backedUrl = import.meta.env.VITE_API_URL;
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const error = queryParams.get("error") as string;
  const errors: { [key: string]: string } = {
    "invalid-email": "Invalid email domain. Login again using .edu email",
  };
  useEffect(() => {
    if (error) {
      toast.error(errors[error] || "Login failed", { duration: 4000 });
    }
  }, [error]);
  return (
    <Container>
      <div className='flex flex-col justify-center items-center h-full'>
        {error && (
          <>
            <div className='flex items-center justify-center w-full max-w-xs space-x-5 border rounded-md p-4 m-6'>
              <div className='bg-red-700 rounded-full flex items-center justify-center p-1'>
                <XMarkIcon className='text-white w-5 h-5' />
              </div>
              <div className='text-sm text-gray-400'>
                {errors[error] || "Login failed"}
              </div>
            </div>
          </>
        )}
        <div className='max-w-[578px] w-fit py-24 px-8 border sm:px-24 sm:py-24  flex-col sm:flex-row items-center space-y-3 sm:space-x-12 sm:space-y-0 justify-center  rounded-[10px] '>
          <Link to={`${backedUrl}/auth/signin/google`} className='w-full'>
            <div className=' border-gray-300 border-[1.5px] p-2 px-5 flex items-center gap-4 rounded-full w-full '>
              <img
                src={GoogleLogo}
                alt='logo'
                className='w-[30px] h-[30px] sm:w-[35px] sm:h-[35px]'
              />
              <p className='font-medium text-base text-gray-600'>
                Continue with Google
              </p>
            </div>
          </Link>

          <Link to={`${backedUrl}/auth/signin/microsoft`} className='w-full'>
            <div className=' border-gray-300 border-[1.5px] p-2 px-5 flex items-center  gap-4 rounded-full w-full '>
              <img
                src={MicrosoftLogo}
                alt='logo'
                className='w-[28px] h-[28px] sm:w-[35px] sm:h-[35px]'
              />
              <p className='font-medium text-base text-gray-600'>
                Continue with Microsoft
              </p>
            </div>
          </Link>
        </div>
      </div>
    </Container>
  );
};

export default Login;
