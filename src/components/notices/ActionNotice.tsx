import { FC, useState } from "react";
import { INotice } from "../../types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { queryKeys } from "../../utils/queryKeys";
import { deleteNotice } from "../../apis/notice";
import toast from "react-hot-toast";
import { PencilSquareIcon, TrashIcon } from "@heroicons/react/24/outline";
import Modal from "../common/Modal";
import UpdateNoticeForm from "./UpdateNotice";

interface ITableActions {
  notice: INotice;
}

const ActionNotice: FC<ITableActions> = ({ notice }) => {
  const [update, setUpdate] = useState(false);
  const deleteMutation = useMutation({ mutationFn: deleteNotice });
  const queryClient = useQueryClient();

  const handleDelete = (id: string) => {
    deleteMutation.mutate(id, {
      onSuccess() {
        queryClient.invalidateQueries({
          queryKey: queryKeys.noticesInDashboard,
        });
        toast.success("Notice deleted!");
      },
    });
  };
  return (
    <div className='flex space-1'>
      <div
        className='text-gray-400 hover:text-gray-100  mx-2 cursor-pointer'
        onClick={() => setUpdate(true)}
      >
        <PencilSquareIcon className='w-6 h-6 text-teal-500' />
      </div>
      {update && (
        <Modal
          title='Update Notice'
          onClose={() => setUpdate(false)}
          isOpen={update}
        >
          <UpdateNoticeForm setIsOpen={setUpdate} notice={notice} />
        </Modal>
      )}
      <div
        onClick={() => handleDelete(notice._id!)}
        className='text-gray-400 hover:text-gray-100  ml-2 cursor-pointer'
      >
        <TrashIcon className='w-6 h-6 text-red-700' />
      </div>
    </div>
  );
};

export default ActionNotice;
