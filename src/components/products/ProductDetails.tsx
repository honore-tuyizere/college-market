import Container from "../common/Container";
import Colorsample1 from "../../assets/color-sample1.png";

import ColorSamples from "../../assets/color-samples.png";

import ColorSamples88 from "../../assets/color-samples88.png";

import ColorSamples2 from "../../assets/color-samples2.png";
import FrameOrange from "../../assets/FrameOrange.png";

export const ProductDetails = () => {
  return (
    <Container>
      <div className=' flex flex-wrap justify-center w-full py-[50px] px-[100px]'>
        <div className=' w-[500px] mr-[100px]'>
          <div className=' bg-[#F4F4F4] rounded-[10px] mb-[20px] flex justify-center'>
            <img src={FrameOrange} alt='logo' className=' w-[400px] h-[544px]' />
          </div>
          <div className='bg-[#F4F4F4] flex justify-between rounded-sm'>
            <img src={Colorsample1} alt='logo' className='w-[100px] h-[100px]' />
            <img src={ColorSamples2} alt='logo' className=' w-[100px] h-[100px]' />
            <img src={ColorSamples88} alt='logo' className=' w-[100px] h-[100px]' />
            <img src={ColorSamples} alt='logo' className=' w-[100px] h-[100px]' />
          </div>
        </div>
        <div className='w-[500px]'>
          <div className='border-b-[1px] border-gray-300'>
            <span className='bold text-[18px]'>AirPods Max</span>
            <p className='py-[10px] text-[12px]'>
              A perfect balance of high-fidelity audio and effortless magic of
              AirPods
            </p>
          </div>

          <div className='border-b-[1px] border-gray-300'>
            <span className='bold text-[18px]'>AirPods Max</span>
            <p className='py-[10px] text-[12px]'>
              A perfect balance of high-fidelity audio and effortless magic of
              AirPods
            </p>
          </div>

          <div className='border-b-[1px] border-gray-300'>
            <p className='py-[10px] text-[12px]'>Only 12 items Items Left!</p>
            <button
              type='button'
              className='focus:outline-none text-white bg-[#003D29] hover:bg-[#003D29] focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 '
            >
              Make an offer
            </button>
            <button className='relative inline-flex items-center justify-center p-0.5 mb-2 mr-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-green-400 to-blue-600 group-hover:from-green-400 group-hover:to-blue-600 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-green-200 dark:focus:ring-green-800'>
              <span className='relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0'>
                Green to blue
              </span>
            </button>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default ProductDetails;
