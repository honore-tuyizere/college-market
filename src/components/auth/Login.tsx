import Container from "../common/Container";
import GoogleLogo from "../../assets/GoogleLog.png";
import MicrosoftLogo from "../../assets/MicrosoftLog.png";
import facebookLogo from "../../assets/facebookLog.png";

export const Login = () => {
  return (
    <Container>
      <div className='flex justify-center'>
        <div className='w-[578px] h-[467px] pt-[100px]  md:py-[100px] md:px-[100px] flex-col justify-center sm:border-[#003D29] sm:border-[1px] md:border-[#003D29] md:border-[1px] rounded-[10px] '>
          <div className='sm:w-full mb-[30px] py-[8px] px-[25px] rounded-[50px] border-[1px] border-[#003D29] flex gap-[10px] justify-center '>
            <img src={GoogleLogo} alt='logo' className=' w-[44px] h-[44px]' />
            <p className='py-[9px]'>Continue with Google</p>
          </div>

          <div className=' py-[8px] mb-[30px] px-[25px] rounded-[50px] border-[1px] border-[#003D29] flex gap-[10px] justify-center '>
            <img src={MicrosoftLogo} alt='logo' className=' w-[44px] h-[44px]' />
            <p className='py-[9px]'>Continue with Microsoft</p>
          </div>

          <div className=' py-[8px] px-[25px] rounded-[50px] border-[1px] border-[#003D29] flex gap-[10px] justify-center '>
            <img src={facebookLogo} alt='logo' className=' w-[44px] h-[44px]' />
            <p className='py-[9px]'>Continue with facebook</p>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default Login;
