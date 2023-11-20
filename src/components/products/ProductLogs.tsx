import { getProductLogs } from "../../apis/products";
import { queryKeys } from "../../utils/queryKeys";
import { useQuery } from "@tanstack/react-query";
import { IProductLog } from "../../types";
type props = {
  id: string;
};
export const ProductLogs = ({ id }: props) => {
  const { isLoading, data: logs } = useQuery({
    queryFn: () => getProductLogs(id),
    queryKey: [queryKeys.productLogs, id],
  });

  return (
    <>
      {isLoading && (
        <>
          <p className='p-12 text-center'>Loading...</p>
        </>
      )}
      {logs &&
        logs.map((log: IProductLog) => (
          <div className='border p-3 flex space-x-4 my-2' key={log._id}>
            <div className='text-xs font-light text-gray-500'>
              {log.createdAt.slice(0, 10)}
            </div>
            <div className='text-xs text-gray-900'>{log.text}</div>
          </div>
        ))}
      {logs?.length == 0 && (
        <>
          <p className='p-12 text-center'>There are no logs yet</p>
        </>
      )}
    </>
  );
};

export default ProductLogs;
