import DataTable from "react-data-table-component";
import { IOrder } from "../../types";
import { getAllOrders } from "../../apis/orders";
import { queryKeys } from "../../utils/queryKeys";
import { useQuery } from "@tanstack/react-query";

const columns = [
  {
    name: "Product",
    cell: (row: IOrder) => (
      <div>
        <img src={row.product.thumbnail} className=' h-14 w-auto' />
        <p className='text-center font-bold'>{row.product.name}</p>
      </div>
    ),
  },
  {
    name: "Buyer",
    cell: (row: IOrder) => <div>{row.orderer.displayName}</div>,
  },
  {
    name: "Seller",
    cell: (row: IOrder) => <div>{row.product.owner.displayName}</div>,
  },
  {
    name: "Amount",
    cell: (row: IOrder) => <div className='font-bold'>${row.total}</div>,
  },
  {
    name: "Purpose",
    cell: (row: IOrder) => <div>{row.product.purpose?.name}</div>,
  },
  {
    name: "Payment status",
    cell: (row: IOrder) => (
      <div className=' font-semibold'>
        {row.paymentStatus == "PAID" ? (
          <div className='text-blue-500 bg-blue-100 p-1 rounded'>Paid</div>
        ) : (
          <div className=' text-yellow-600 bg-yellow-100 p-1 rounded'>Pending</div>
        )}
      </div>
    ),
  },
  {
    name: "Derively status",
    cell: (row: IOrder) => (
      <div className=' font-semibold'>
        {row.deliveryStatus == "DELIVERED" ? (
          <div className='text-green-500 bg-green-100 p-1 rounded'>DELIVERED</div>
        ) : (
          <div className=' text-red-600 bg-red-100 p-1 rounded'>
            NOT YET DELIVERED
          </div>
        )}
      </div>
    ),
  },
];

const TransactionsPage = () => {
  const { data, isLoading } = useQuery({
    queryKey: queryKeys.transactions,
    queryFn: getAllOrders,
  });
  return (
    <div className='flex flex-col w-full'>
      <DataTable
        persistTableHead
        title='Transactions'
        pagination
        striped
        highlightOnHover
        columns={columns}
        data={data || []}
        progressPending={isLoading}
      />
    </div>
  );
};

export default TransactionsPage;
