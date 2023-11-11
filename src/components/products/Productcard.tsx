import { FC } from "react";
import { IProduct } from "../../types";
import { Link } from "react-router-dom";

interface Props {
  product: IProduct;
}
const Productcard: FC<Props> = ({
  product: { thumbnail, name, price, condition, _id },
}) => {
  const resizeImage = (imageUrl: string) => {
    const keyword = "upload";
    const keywordIndex = imageUrl.indexOf(keyword);
    const beforeKeyword = imageUrl.slice(0, keywordIndex + keyword.length);
    const afterKeyword = imageUrl.slice(keywordIndex + keyword.length);
    return beforeKeyword + "/h_211,w_211/" + afterKeyword;
  };
  return (
    <Link to={`/product/${_id}`} target='_blank'>
      <div className='bg-white shadow-md rounded-md'>
        <img className='w-full' src={resizeImage(thumbnail)} alt='' />
        <div className='p-4 space-y-3'>
          <div>
            <p className=' font-bold text-md line-clamp-1'>{name}</p>
            <p>${price}</p>
          </div>
          <div className='text-sm'>
            <div className='bg-[rgba(0,77,77,0.58)] text-white px-2 py-1 rounded inline-block text-xs mt-1'>
              {condition?.name}
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default Productcard;
