import ShopCartLog from "../../assets/shopCartlogo.png";
import Amazon from "../../assets/amazon.png";
import Apple from "../../assets/apple.png";
import Google from "../../assets/google.png";
import Klarna from "../../assets/klarna.png";
import Icons from "../../assets/bottom-footer-item-icons.png";
import Stripe from "../../assets/stripe.png";
import Visa from "../../assets/visa.png";
import Master from "../../assets/master-card.png";
import Paypal from "../../assets/paypal.png";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className='bg-white py-1'>
      <div className='mx-auto w-full sm:max-w-screen-xl md:max-w-screen-2xl border-gray-200 border-t-[1px] py-1'>
        <div className='flex flex-wrap justify-between p-4 md:justify-start'>
          <div className=' w-full md:w-1/3 p-4  text-gray-500'>
            <img src={ShopCartLog} alt='logo' className=' w-[133px] h-[33px]' />
            <p className=' text-[14px] font-[400] p-[10px]'>
              Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet
              sint. Velit officia consequat duis enim velit mollit
            </p>
            <span className='text-[20px] font-[700] p-3'>Accepted Payments</span>
            <div className=' w-[370px] flex flex-wrap p-[10px] gap-[10px] py-7'>
              <img src={Stripe} alt='logo' className=' w-[67px] h-[41px]' />
              <img src={Visa} alt='logo' className=' w-[67px] h-[41px]' />
              <img src={Master} alt='logo' className=' w-[67px] h-[41px]' />

              <img src={Amazon} alt='logo' className=' w-[67px] h-[41px]' />
              <img src={Klarna} alt='logo' className=' w-[67px] h-[41px]' />
              <img src={Paypal} alt='logo' className=' w-[67px] h-[41px]' />
              <img src={Apple} alt='logo' className=' w-[67px] h-[41px]' />
              <img src={Google} alt='logo' className=' w-[67px] h-[41px]' />
            </div>
          </div>

          <div className='bg-white  text-gray-500 w-full md:w-1/4  flex text-[22px] pl-[40px] sm:pl-[20px]  sm:justify-start sm:px-[10px] sm:text-[20px] md:justify-center md:pr-2'>
            <ul className='font-medium'>
              <li className='mb-2'>
                <p className='mb-6 text-[28px]  text-gray-700 md:text-[20px] md:pt-4 font-bold'>
                  About us
                </p>
              </li>
              <li className='mb-2'>
                <Link to='#'>About Shopcart</Link>
              </li>
              <li className='mb-2'>
                <Link to='#'>Careers</Link>
              </li>
              <li className='mb-2'>
                <Link to='#'>News & Blog</Link>
              </li>
              <li className='mb-2'>
                <Link to='#'>Help</Link>
              </li>
              <li className='mb-2'>
                <Link to='#'>Press Center</Link>
              </li>
              <li className='mb-2'>
                <Link to='#'>Shop By Location</Link>
              </li>
              <li className='mb-2'>
                <Link to='#'>Shopcart Brands</Link>
              </li>
              <li className='mb-2'>
                <Link to='#'>Ideas & Guides</Link>
              </li>
            </ul>
          </div>

          <div className='bg-white w-full  text-gray-500 py-4 md:w-1/5 flex text-[20px] pl-[40px] sm:pl-[20px]  sm:justify-start sm:px-[10px] sm:text-[20px] md:justify-center md:pr-2 '>
            <ul className='font-medium'>
              <li className='mb-4'>
                <p className='mb-6 text-gray-700 text-[28px] md:text-[20px] font-bold'>
                  Services
                </p>
              </li>
              <li className='mb-4'>
                <Link to='#'>Gift Card</Link>
              </li>
              <li className='mb-4'>
                <Link to='#'>MobileApp</Link>
              </li>
              <li className='mb-4'>
                <Link to='#'>Shipping & Delivery</Link>
              </li>
              <li className='mb-4'>
                <Link to='#'>Order Pickup</Link>
              </li>
              <li className='mb-4'>
                <Link to='#'>Account Signup</Link>
              </li>
            </ul>
          </div>

          <div className='bg-white w-full md:w-1/5  flex text-gray-500 text-[22px] pl-[40px] sm:pl-[20px]  sm:justify-start sm:px-[10px] sm:text-[20px] md:justify-center md:pr-2'>
            <ul className='font-medium '>
              <li className='mb-4'>
                <p className=' text-[28px] md:text-[20px] md:pt-4 font-bold text-gray-700'>
                  Help
                </p>
              </li>
              <li className='mb-4'>
                <Link to='#'>Shopcart Help</Link>
              </li>
              <li className='mb-4'>
                <Link to='#'>Returns</Link>
              </li>
              <li className='mb-4'>
                <Link to='#'>Contact Us</Link>
              </li>
              <li className='mb-4'>
                <Link to='#'>Feedback</Link>
              </li>
              <li className='mb-4'>
                <Link to='#'>Security & Fraud</Link>
              </li>
            </ul>
          </div>
        </div>

        <div className='flex flex-wrap justify-between md:justify-start border-gray-200 border-t-[1px]'>
          <div className=' w-full md:w-1/3 p-6 flex '>
            <img src={Icons} alt='logo' className=' w-[30px] h-[31px]' />
            <Link to='#'>
              <span className='pl-4'>help center</span>
            </Link>
          </div>
          <div className='bg-white w-full  text-[18px] flex md:justify-center md:w-1/4   pl-4 md:p-4'>
            <Link to='#'>
              <p className='font-[400] text-[14px] p-4'>Terms & Service</p>
            </Link>
          </div>

          <div className='bg-white w-full  text-[18px] flex md:justify-center md:w-1/4  pl-4 md:p-4'>
            <Link to='#'>
              <p className='font-[400] text-[14px] p-4'>Privacy & Policy</p>
            </Link>
          </div>
          <div className='bg-white w-full  text-[18px] md:w-1/6 pl-4 md:p-4 '>
            <Link to='#'>
              <p className='font-[400] text-[13px] py-4'>
                All Right reserved by ETITE | 2023
              </p>
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
