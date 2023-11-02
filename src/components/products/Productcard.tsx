import { FC } from "react";
import { IProduct } from "../../types";
import { Link } from "react-router-dom";

const Productcard: FC<IProduct> = ({ image }) => {
  return (
    <Link to={"/products/" + image}>
      <div key={image} className='bg-white shadow-md rounded-md'>
        <img className='w-full' src={image} alt='' />
        <div className='p-4 space-y-3'>
          <div className='flex text-sm font-semibold justify-between '>
            <p className=' font-semibold'>Laptop sleeve MacBook</p>
            <p>$500</p>
          </div>
          <div className='line-clamp-2 text-sm'>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Repudiandae
            ipsam iusto facilis magnam impedit reiciendis sapiente explicabo non eum,
            temporibus voluptatem unde laborum voluptate veritatis. Vitae amet
            distinctio nostrum rerum.
          </div>
          <div className='text-sm'>
            <div>College:IPRC Kigali</div>
            <div>Condition:Used</div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default Productcard;
