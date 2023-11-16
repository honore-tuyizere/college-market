import { Popover, Transition } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import { zodResolver } from "@hookform/resolvers/zod";
import { Dispatch, FC, Fragment, SetStateAction } from "react";
import { UseFormRegisterReturn, useForm } from "react-hook-form";
import {
  filterProductSchema,
  filterProductSchemaType,
} from "../../utils/schemas/product.schema";
import { useMutation, useQuery } from "@tanstack/react-query";
import { getCategories } from "../../apis/category";
import { queryKeys } from "../../utils/queryKeys";
import { getColleges } from "../../apis/college";
import { filterProducts } from "../../apis/products";
import { IProduct } from "../../types";
import Checkbox from "../common/inputs/Checkbox";
import { FadeLoader } from "react-spinners";

interface IFilterProps {
  setData: Dispatch<SetStateAction<IProduct[] | undefined>>;
}

type IData = {
  _id: string;
  name: string;
};
interface IFilterProps {
  setData: Dispatch<SetStateAction<IProduct[] | undefined>>;
}

interface IFilterComponent {
  data: IData[];
  label: string;
  error?: string;
  register: UseFormRegisterReturn;
}

const FiltersComponent: FC<IFilterComponent> = ({
  data,
  label,
  register,
  error,
}) => {
  return (
    <Popover className='relative w-full xs:w-auto'>
      {({ open }) => (
        <>
          <Popover.Button
            className={`
                group inline-flex w-full items-center px-4 py-2 justify-between text-sm sm:text-base font-medium border rounded-md outline-none text-gray-600 border-gray-400 w-48`}
          >
            <span>{label}</span>
            <ChevronDownIcon
              className={`${open ? " transform rotate-180" : ""}
                  ml-2 h-5 w-5 transition duration-150 ease-in-out`}
              aria-hidden='true'
            />
          </Popover.Button>
          <Transition
            as={Fragment}
            enter='transition ease-out duration-200'
            enterFrom='opacity-0 translate-y-1'
            enterTo='opacity-100 translate-y-0'
            leave='transition ease-in duration-150'
            leaveFrom='opacity-100 translate-y-0'
            leaveTo='opacity-0 translate-y-1'
          >
            <Popover.Panel className='absolute z-10 mt-2 rounded'>
              <div className='p-4 min-w-[220px] bg-white flex flex-col gap-2 shadow-2xl rounded border'>
                {data && (
                  <>
                    {data.map((data: IData) => (
                      <Checkbox
                        key={data._id}
                        value={data._id}
                        id={data._id}
                        label={data.name}
                        register={register}
                      />
                    ))}
                  </>
                )}
              </div>
              <span className='text-red-400'>{error}</span>
            </Popover.Panel>
          </Transition>
        </>
      )}
    </Popover>
  );
};

const Filters: FC<IFilterProps> = ({ setData }) => {
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm<filterProductSchemaType>({
    resolver: zodResolver(filterProductSchema),
  });

  const { data: colleges } = useQuery({
    queryFn: () => getColleges(),
    queryKey: queryKeys.collegesInForm,
  });

  const { data: categories } = useQuery({
    queryFn: () => getCategories(),
    queryKey: queryKeys.categoriesInForm,
  });

  const filterMutation = useMutation({ mutationFn: filterProducts });

  const handleFilter = (data: filterProductSchemaType) => {
    filterMutation.mutate(data, {
      onSuccess(result) {
        setData(result);
      },
    });
  };
  const handleInputChange = () => {
    handleFilter(getValues());
  };

  return (
    <>
      {filterMutation.isPending && (
        <div
          className='w-screen h-screen fixed top-0 bg-[rgba(0,0,0,0.41)] right-0 left-0 bottom-0'
          style={{ zIndex: 1000 }}
        >
          <div className='w-full h-full items-center justify-center flex'>
            <FadeLoader color='#fff' />
          </div>
        </div>
      )}
      <form
        className='w-full flex space-x-4'
        onSubmit={handleSubmit(handleFilter)}
        onChange={handleInputChange}
      >
        {categories && (
          <FiltersComponent
            data={categories as IData[]}
            label='Category'
            register={register("categories")}
            error={errors.categories?.message}
          />
        )}
        {colleges && (
          <FiltersComponent
            data={colleges as IData[]}
            label='College'
            register={register("colleges")}
            error={errors.colleges?.message}
          />
        )}
      </form>
    </>
  );
};
export default Filters;
