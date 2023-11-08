import Container from "../common/Container";
import GoogleLogo from "../../assets/GoogleLog.png";
import { Link } from "react-router-dom";

export const Login = () => {
  const backedUrl = import.meta.env.VITE_API_URL;
  return (
    <Container>
      <div className='flex justify-center'>
        <div className='w-[578px]  p-8  flex-col justify-center  rounded-[10px] '>
          <Link to={`${backedUrl}/auth/signin/google`}>
            <div className='w-full  border p-2 flex items-center  justify-center gap-4 rounded-full '>
              <img src={GoogleLogo} alt='logo' className=' w-[40px] h-[40px]' />
              <p>Continue with Google</p>
            </div>
          </Link>
        </div>
      </div>
    </Container>
  );
};

export default Login;
