import {
  AcademicCapIcon,
  ArrowLeftCircleIcon,
  ArrowRightCircleIcon,
  BanknotesIcon,
  CreditCardIcon,
  CurrencyDollarIcon,
  GiftIcon,
  Square3Stack3DIcon,
  TruckIcon,
  UsersIcon,
} from "@heroicons/react/24/outline";
import { useQuery, useMutation } from "@tanstack/react-query";
import { queryKeys } from "../../utils/queryKeys";
import { getOverview } from "../../apis/overview";
import Loading from "../common/Loading";
import { ReactNode, useEffect, useState } from "react";
import { IStatisticOverview } from "../../types";
import TextBox from "../common/inputs/TextBox";
import { useForm } from "react-hook-form";

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
  ONGOING_PURCHASES: (
    <TruckIcon
      className='h-6 w-6 text-white transform -scale-x-100'
      aria-hidden='true'
    />
  ),
  ONGOING_SALES: <TruckIcon className='h-6 w-6 text-white' aria-hidden='true' />,
};

const DashOverview = () => {
  const [datesError, setDatesError] = useState<string | undefined>();
  const { register, handleSubmit, getValues, setValue } = useForm();
  const [stats, setStats] = useState<IStatisticOverview[] | undefined>();
  const { isLoading, data } = useQuery({
    queryKey: [queryKeys.statisticOverview],
    queryFn: () => getOverview(),
  });

  const filterMutation = useMutation({ mutationFn: getOverview });

  const filter = () => {
    const { startDate, endDate } = getValues();
    if (startDate != "" && startDate != "" && startDate <= endDate) {
      filterMutation.mutate(`?startDate=${startDate}&endDate=${endDate}`, {
        onSuccess(result) {
          setStats(result);
        },
      });
      setDatesError(undefined);
    } else {
      if ((startDate === "") !== (endDate == "")) {
        setDatesError("Select both of them");
      } else if (!datesError && startDate > endDate) {
        setDatesError("Invalid dates range");
      } else {
        setDatesError(undefined);
      }
    }
  };
  const changeEndDate = (value: string) => {
    setValue("endDate", value);
    filter();
  };
  const changeStartDate = (value: string) => {
    setValue("startDate", value);
    filter();
  };
  useEffect(() => {
    if (stats == undefined && data) setStats(data);
  }, [data, setStats, stats]);

  return (
    <>
      {(isLoading || filterMutation.isPending) && (
        <>
          <div className='py-6'>
            <Loading />
          </div>
        </>
      )}
      {stats && !filterMutation.isPending && (
        <div className='pt-4'>
          <h3 className='text-base font-semibold leading-6 text-gray-900'>
            Statistics
          </h3>
          <div className='flex space-y-1 w-full flex-col'>
            <form
              action=''
              className='flex space-x-4 w-full'
              onSubmit={handleSubmit(filter)}
            >
              <TextBox
                label='Start Date'
                type='date'
                onChange={changeStartDate}
                register={register("startDate")}
              />
              <TextBox
                label='End Date'
                type='date'
                onChange={changeEndDate}
                register={register("endDate")}
              />
            </form>
            {datesError && (
              <>
                <span className='text-red-500 text-xs'>{datesError}</span>
              </>
            )}
          </div>

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
