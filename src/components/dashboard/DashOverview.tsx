import {
  AcademicCapIcon,
  ArrowLeftCircleIcon,
  ArrowRightCircleIcon,
  BanknotesIcon,
  CreditCardIcon,
  CurrencyDollarIcon,
  GiftIcon,
  Square3Stack3DIcon,
  UsersIcon,
} from "@heroicons/react/24/outline";
import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "../../utils/queryKeys";
import { getOverview } from "../../apis/overview";
import Loading from "../common/Loading";
import { ReactNode, useEffect, useState } from "react";
import { IStatisticOverview } from "../../types";

const icons: { [key: string]: ReactNode } = {
  PURCHASES: <CreditCardIcon className='h-6 w-6 text-white' aria-hidden='true' />,
  SALES: <CurrencyDollarIcon className='h-6 w-6 text-white' aria-hidden='true' />,
  USERS: <UsersIcon className='h-6 w-6 text-white' aria-hidden='true' />,
  COLLEGES: <AcademicCapIcon className='h-6 w-6 text-white' aria-hidden='true' />,
  PRODUCTS: <Square3Stack3DIcon className='h-6 w-6 text-white' aria-hidden='true' />,
  RENT_PRODUCTS: <BanknotesIcon className='h-6 w-6 text-white' aria-hidden='true' />,
  DONATE_PRODUCTS: <GiftIcon className='h-6 w-6 text-white' aria-hidden='true' />,
  SELLER_ORDERS: (
    <ArrowRightCircleIcon className='h-6 w-6 text-white' aria-hidden='true' />
  ),
  PURCHASE_ORDERS: (
    <ArrowLeftCircleIcon className='h-6 w-6 text-white' aria-hidden='true' />
  ),
};

const DashOverview = () => {
  // const [startDate, setStartDate] = useState("");
  // const [endDate, setEndDate] = useState("");
  const [stats, setStats] = useState<IStatisticOverview[] | undefined>();
  const { isLoading, data } = useQuery({
    queryKey: [queryKeys.statisticOverview],
    queryFn: () => getOverview(),
  });

  // const filterMutation = useMutation({ mutationFn: getOverview });

  // const filter = () => {
  //   filterMutation.mutate(`?startDate=${startDate}&endDate=${endDate}`, {
  //     onSuccess(result) {
  //       setStats(result);
  //     },
  //   });
  // };

  // const startDateChange = (value: string) => {
  //   setStartDate(value);
  //   filter();
  // };

  // const endDateChange = (value: string) => {
  //   setEndDate(value);
  //   filter();
  // };

  useEffect(() => {
    if (stats == undefined && data) {
      setStats(data);
    }
  }, [setStats, stats, data]);

  return (
    <>
      {isLoading && (
        <>
          <Loading />
        </>
      )}
      {stats && (
        <div className='pt-4'>
          <h3 className='text-base font-semibold leading-6 text-gray-900'>
            Statistics
          </h3>
          {/* <div className='flex space-x-4'>
            <TextBox label='Start Date' type='date' onChange={startDateChange} />
            <TextBox label='End Date' type='date' onChange={endDateChange} />
          </div> */}

          <dl className='mt-5 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3'>
            {stats.map((item, index) => (
              <div
                key={index}
                className='relative overflow-hidden rounded-lg bg-white px-4 pt-5 shadow sm:px-6 sm:pt-6'
              >
                <dt>
                  <div className='absolute rounded-md bg-indigo-500 p-3'>
                    {icons[item.slug]}
                  </div>
                  <p className='ml-16 truncate text-sm font-medium text-gray-500'>
                    {item.slug.replace("_", " ")}
                  </p>
                </dt>
                <dd className='ml-16 flex items-baseline pb-6 sm:pb-7'>
                  <p className='text-2xl font-semibold text-gray-900'>
                    {item.slug == "PURCHASES" || item.slug == "SALES" ? "$" : ""}
                    {item.number}
                  </p>

                  {/* <div className='absolute inset-x-0 bottom-0 bg-gray-50 px-4 py-4 sm:px-6'>
                    <div className='text-sm'>
                      <a
                        href='#'
                        className='font-medium text-indigo-600 hover:text-indigo-500'
                      >
                        View all<span className='sr-only'> {item.link} stats</span>
                      </a>
                    </div>
                  </div> */}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      )}
    </>
  );
};

export default DashOverview;
