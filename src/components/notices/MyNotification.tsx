import { useQuery } from "@tanstack/react-query";
import { INotice } from "../../types";
import Container from "../common/Container";
import { getMyNotices } from "../../apis/notice";
import { queryKeys } from "../../utils/queryKeys";
import { useState } from "react";
import Modal from "../common/Modal";

export const MyNoticeList = () => {
  const { isLoading, data: notices } = useQuery({
    queryFn: () => getMyNotices(),
    queryKey: queryKeys.noticesInDashboard,
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
        {notices && (
          <div className='relative overflow-x-auto shadow-sm sm:rounded-lg '>
            <table className='w-full text-sm text-left text-black bg-[#F4F4F4] '>
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
                      <span className='bold text-[18px]'>{notice.name}</span>
                      <p className='pt-[4px] text-[12px]'>
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

        <Modal
          title='Notice details'
          onClose={() =>
            setAction({
              show: false,
              data: { name: "", description: "", photo: "" },
            })
          }
          isOpen={action.show}
        >
          <div className='flex'>
            <div className='block '>
              <span className='bold text-[18px]'>{action.data.name}</span>
              <p className='pt-[4px] text-[12px]'>{action.data.description}</p>
            </div>
            <div className='p-3 w-[500px]'>
              {action.data.photo && <img src={action.data.photo} />}
            </div>
          </div>
        </Modal>
      </>
    </Container>
  );
};

export default MyNoticeList;