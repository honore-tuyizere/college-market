import { FC } from "react";
import { IOrderedProduct, IProduct } from "../../types";
import { Link } from "react-router-dom";
import { ChatBubbleLeftIcon, PencilIcon } from "@heroicons/react/24/outline";

interface Props {
  product: IProduct;
  order?: IOrderedProduct;
}
const Productcard: FC<Props> = ({
  product: { thumbnail, name, price, condition, _id },
  order,
}) => {
  const resizeImage = (imageUrl: string) => {
    const keyword = "upload";
    const keywordIndex = imageUrl.indexOf(keyword);
    const beforeKeyword = imageUrl.slice(0, keywordIndex + keyword.length);
    const afterKeyword = imageUrl.slice(keywordIndex + keyword.length);
    return beforeKeyword + "/h_211,w_211/" + afterKeyword;
  };
  return (
    <Link to={order ? "#" : `/product/${_id}`} target={order ? "" : "_blank"}>
      <div className='bg-white overflow-auto shadow-md rounded-md'>
        <img className='w-full' src={resizeImage(thumbnail)} alt='' />
        <div className='p-4 space-y-3'>
          <div>
            <p className=' font-bold text-md line-clamp-1'>{name}</p>
            <p>${price}</p>
          </div>
          <div className='text-sm'>
            {!order && (
              <div className='bg-[rgba(0,77,77,0.58)] text-white px-2 py-1 rounded inline-block text-xs mt-1'>
                {condition?.name}
              </div>
            )}
            {order && (
              <div className='flex gap-3'>
                <PencilIcon className='w-5 text-indigo-600' />
                <ChatBubbleLeftIcon className='w-5 text-action-color-500' />
              </div>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
};

export default Productcard;
