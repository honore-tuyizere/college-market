import { FC, useState } from "react";
import {
  CalendarDaysIcon,
  PencilSquareIcon,
  TrashIcon,
} from "@heroicons/react/24/outline";
import { IProduct } from "../../types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { deleteProduct } from "../../apis/products";
import { queryKeys } from "../../utils/queryKeys";
import UpdateProductForm from "./UpdateProductForm";
import Modal from "../common/Modal";
import ProductLogs from "./ProductLogs";

interface ITableActions {
  product: IProduct;
}

const TableActions: FC<ITableActions> = ({ product }) => {
  const [update, setUpdate] = useState(false);
  const [logsModal, setLogsModal] = useState(false);
  const deleteMutation = useMutation({ mutationFn: deleteProduct });
  const queryClient = useQueryClient();

  const handleDelete = (id: string) => {
    deleteMutation.mutate(id, {
      onSuccess() {
        queryClient.invalidateQueries({
          queryKey: queryKeys.productsInDashboard,
        });
        toast.success("Product deleted!");
      },
    });
  };
  return (
    <div className='flex space-1 flex-row justify-end items-end'>
      {product?.purpose?.slug?.includes("RENT") && (
        <>
          <div
            className='text-gray-400 hover:text-gray-100  mx-2 cursor-pointer'
            onClick={() => setLogsModal(true)}
          >
            <CalendarDaysIcon className='w-6 h-6 text-blue-500' />
          </div>
          {logsModal && (
            <Modal
              title='Product logs'
              onClose={() => setLogsModal(false)}
              isOpen={logsModal}
            >
              <ProductLogs id={product._id} />
            </Modal>
          )}
        </>
      )}
      <div
        className='text-gray-400 hover:text-gray-100  mx-2 cursor-pointer'
        onClick={() => setUpdate(true)}
      >
        <PencilSquareIcon className='w-6 h-6 text-teal-500' />
      </div>
      {update && (
        <Modal
          title='Update product'
          onClose={() => setUpdate(false)}
          isOpen={update}
        >
          <UpdateProductForm setIsOpen={setUpdate} product={product} />
        </Modal>
      )}
      <div
        onClick={() => handleDelete(product._id)}
        className='text-gray-400 hover:text-gray-100  ml-2 cursor-pointer'
      >
        <TrashIcon className='w-6 h-6 text-red-700' />
      </div>
    </div>
  );
};

export default TableActions;
