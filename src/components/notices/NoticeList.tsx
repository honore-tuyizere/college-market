import { useQuery } from "@tanstack/react-query";
import { INotice } from "../../types";
import Container from "../common/Container";
import { getAllNotices } from "../../apis/notice";
import { queryKeys } from "../../utils/queryKeys";
import Modal from "../common/Modal";
import { useState } from "react";

export const NoticeList = () => {
  const { isLoading, data: notices } = useQuery({
    queryFn: () => getAllNotices(),
    queryKey: queryKeys.getAllNotices,
  });

  const [action, setAction] = useState({
    show: false,
    data: { name: "", description: "", photo: "" },
  });

  return (
    <Container>
      <>
        {isLoading && (
          <>
            <p className='p-12 text-center'>Loading...</p>
          </>
        )}
        {notices?.length == 0 && (
          <>
            <p className='p-12 text-center rounded-md text-gray-600'>
              You have no notices!
            </p>
          </>
        )}
        {notices?.length && (
          <div className='relative overflow-x-auto shadow-sm sm:rounded-lg '>
            <table className='w-full text-sm text-left text-black bg-[#F4F4F4] cursor-pointer '>
              <tbody>
                {notices.map((notice: INotice) => (
                  <tr
                    className='border-b  hover:bg-gray-50'
                    onClick={() => setAction({ show: true, data: notice })}
                  >
                    <th
                      scope='row'
                      className='px-6 py-4 font-medium text-gray-900 whitespace-nowrap block'
                    >
                      <div className='text-[18px] font-bold text-gray-600'>
                        {notice.name}
                      </div>
                      <p className='pt-[4px] text-[12px] text-gray-500'>
                        {notice.description.length > 150
                          ? `${notice.description.slice(0, 150)}...`
                          : notice.description}
                      </p>
                    </th>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
        <div className='mt-[100px]'>
          <Modal
            centered={true}
            title={action.data.name}
            onClose={() =>
              setAction({
                show: false,
                data: { name: "", description: "", photo: "" },
              })
            }
            isOpen={action.show}
          >
            <div className='block '>
              <span className='bold text-[18px]'>{action.data.name}</span>
              <p className='pt-[4px] text-[12px]'>{action.data.description}</p>
            </div>
            <div className='py-2'>
              {action.data.photo ? <img src={action.data.photo} /> : ""}
            </div>
          </Modal>
        </div>
      </>
    </Container>
  );
};

export default NoticeList;
