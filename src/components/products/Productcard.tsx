import { FC, Fragment, useContext, useEffect, useState } from "react";
import { IOrderedProduct, IProduct } from "../../types";
import { Link } from "react-router-dom";
import {
  ChatBubbleLeftIcon,
  PencilIcon,
  HashtagIcon,
} from "@heroicons/react/24/outline";
import { AuthContext } from "../../context/Auth";
import Modal from "../common/Modal";
import { getOrderCode } from "../../apis/orders";
import { BeatLoader } from "react-spinners";
import { ChatProvider } from "../../providers/ChatContextProvider";
import ChatModel from "../chat/ChatModel";

interface Props {
  product: IProduct;
  order?: IOrderedProduct;
}
const Productcard: FC<Props> = ({
  product: { thumbnail, name, price, _id, purpose, condition },
  order,
}) => {
  const [chatModal, setChatModal] = useState(false);

  const [orderCode, setOrderCode] = useState<string>();
  const [orderDeliveryModalOpen, setOrderDeliveryModalOpen] = useState(false);

  const context = useContext(AuthContext);
  const resizeImage = (imageUrl: string) => {
    const keyword = "upload";
    const keywordIndex = imageUrl.indexOf(keyword);
    const beforeKeyword = imageUrl.slice(0, keywordIndex + keyword.length);
    const afterKeyword = imageUrl.slice(keywordIndex + keyword.length);
    return beforeKeyword + "/h_211,w_211/" + afterKeyword;
  };

  useEffect(() => {
    if (order && context?.user?._id == order?.orderer) {
      getOrderCode(order?._id).then((response) => {
        setOrderCode(response);
      });
    }
  }, [context, order]);
  return (
    <Fragment>
      <Modal
        centered
        isOpen={orderDeliveryModalOpen}
        onClose={() => setOrderDeliveryModalOpen(false)}
        title={"Order derivery code"}
      >
        <div className=' text-center bg-gray-100 p-4'>
          <p className=' font-medium text-action-color-500'>
            <p className='text-red-500 text-sm'>
              Share the code below if only you've received the product
            </p>
            {orderCode ?? <BeatLoader color='rgba(0,77,77,0.58)' />}
          </p>
        </div>
      </Modal>
      <Link to={order ? "#" : `/product/${_id}`} target={order ? "" : "_blank"}>
        <div className='bg-white overflow-auto shadow-md rounded-md relative'>
          <img className='w-full' src={resizeImage(thumbnail)} alt='' />
          <div className='p-4 space-y-3'>
            <div>
              <p className=' font-bold text-md line-clamp-1'>{name}</p>
              <div className='flex items-center justify-between'>
                <div>
                  <div className='text-xs'>
                    <span className='font-light mr-2'>Condition:</span>
                    <span className='font-semibold'>{condition.name}</span>
                  </div>
                  <div className='text-xs'>
                    <span className='font-light mr-2'>Purpose:</span>
                    <span className='font-semibold'>{purpose?.name || "Sales"}</span>
                  </div>
                </div>

                {!purpose?.slug.includes("DONAT") && (
                  <>
                    <div className='text-xl text-teal-600 font-bold'>${price}</div>
                  </>
                )}
              </div>
            </div>
            <div className='text-sm'>
              {order && (
                <div className='flex gap-3'>
                  {order.orderer._id !== context?.user?._id && (
                    <PencilIcon className='w-5 text-indigo-600 cursor-pointer' />
                  )}

                  <ChatBubbleLeftIcon
                    className='w-5 text-action-color-500'
                    onClick={() => setChatModal(true)}
                  />
                  {chatModal && (
                    <ChatProvider>
                      <Modal
                        centered
                        title='Chat with owner'
                        onClose={() => setChatModal(false)}
                        isOpen={true}
                        modalType='chat'
                      >
                        <ChatModel product={order.product} />
                      </Modal>
                    </ChatProvider>
                  )}

                  {order.orderer._id == context?.user?._id && (
                    <div
                      className=' cursor-pointer'
                      onClick={() => setOrderDeliveryModalOpen(true)}
                    >
                      <HashtagIcon className='w-5 text-green-700' />
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </Link>
    </Fragment>
  );
};

export default Productcard;
