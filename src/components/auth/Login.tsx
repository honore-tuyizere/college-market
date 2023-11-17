import Container from "../common/Container";
import GoogleLogo from "../../assets/GoogleLog.png";
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
        <div className='max-w-[578px] w-full  p-8 flex flex-col sm:flex-row items-center space-y-3 sm:space-x-12 sm:space-y-0 justify-center  rounded-[10px] '>
          <Link to={"/"}>
            <div className='flex text-gray-500 p-2 px-6'>Homepage</div>
          </Link>
          <Link
            to={`${backedUrl}/auth/signin/google`}
            className='max-w-full w-[20rem]'
          >
            <div className='border border-gray-300 border-2 p-2 px-5 flex items-center  justify-center gap-4 rounded-full max-w-[20rem] '>
              <img
                src={GoogleLogo}
                alt='logo'
                className='w-[30px] h-[30px] sm:w-[40px] sm:h-[40px]'
              />
              <p className='font-semibold text-gray-600'>Continue with Google</p>
            </div>
          </Link>
        </div>
      </div>
    </Container>
  );
};

export default Login;
