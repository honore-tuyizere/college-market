import { useMutation, useQueryClient } from "@tanstack/react-query";
// import TextBox from "../common/inputs/TextBox";
// import SelectOption from "../common/inputs/SelectOption";
// import FileInput from "../common/inputs/FileInput";
// import { getCategories } from "../../apis/category";
// import { createProduct } from "../../apis/products";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { orderSchema, orderSchemaType } from "../../utils/schemas/order.schema";
import Button from "../common/Button";
import toast from "react-hot-toast";
import { Dispatch, FC, SetStateAction, useState } from "react";
import { queryKeys } from "../../utils/queryKeys";
import { createOrder } from "../../apis/orders";
import { IProduct } from "../../types";
import TextArea from "../common/inputs/TextArea";
import { MinusCircleIcon, PlusCircleIcon } from "@heroicons/react/24/outline";
// import TextBox from "../common/inputs/TextBox";

interface IOrderForm {
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  product: IProduct;
}

interface DaysProps {
  days: number;
  onAdd: () => void;
  onMinus: () => void;
}

const DaysSelector: FC<DaysProps> = ({ days, onAdd, onMinus }) => {
  return (
    <div className='days-selector flex space-x-6 items-center'>
      <MinusCircleIcon onClick={onMinus} className='w-5 w-5' />
      <span className='font-bold text-2xl'>{days}</span>
      <PlusCircleIcon onClick={onAdd} className='w-5 w-5' />
    </div>
  );
};

const OrderForm: FC<IOrderForm> = ({ setIsOpen, product }) => {
  const [total, setTotal] = useState(product.price);
  const queryClient = useQueryClient();
  const {
    register,
    handleSubmit,
    reset,
    getValues,
    setValue,
    formState: { errors },
  } = useForm<orderSchemaType>({
    resolver: zodResolver(orderSchema),
    defaultValues: {
      days: 1,
    },
  });

  const orderMutation = useMutation({ mutationFn: createOrder });

  const submit = (data: orderSchemaType) => {
    const formData = {
      ...data,
    };
    orderMutation.mutate(formData, {
      onSuccess(paymentUrl: string) {
        window.location.href = paymentUrl;
        setIsOpen(false);
        toast.success("Order created!");
        queryClient.invalidateQueries({
          queryKey: queryKeys.orders,
        });
        reset();
      },
    });
  };
  const handleTotalCalculation = (days: number) => {
    // const days = Number(dayString);
    if (days > 0) {
      setValue("days", days);
      setTotal(days * product.price);
    } else {
      setValue("days", 1);
    }
  };
  return (
    <form
      onSubmit={handleSubmit(submit)}
      id='OrderForm'
      className='w-full space-y-3'
      encType='multipart/form,-data'
    >
      <div className='flex space-x-6'>
        <div>
          <img
            src={product.thumbnail}
            className='w-30 h-30 rounded-md'
            alt={product.name}
          />
        </div>
        <div>
          <div className='font-bold text-gray-800'>{product.name}</div>
          <div className='font-semibold uppercase text-gray-500 mb-4'>
            {product.category.name}
          </div>
          <div className='font-semibold text-gray-500'>
            Unit Price:
            <span className='font-bold text-gray-700'>${product.price}</span>
          </div>
          <div className='font-semibold text-gray-500'>
            Total Price: <span className='font-bold text-gray-700'>${total}</span>
          </div>
        </div>
      </div>
      <div className='hidden'>
        <TextArea
          label='product'
          value={product._id}
          error={errors.product?.message}
          register={register("product")}
        />
      </div>
      {/* {product.purpose?.slug.includes("RENT") && (
        <div className='flex'>
          <TextBox
            type='number'
            label='Rent Days'
            error={errors.days?.message}
            register={register("days")}
            onChange={handleTotalCalculation}
          />
        </div>
      )} */}

      {product.purpose?.slug.includes("RENT") && (
        <div className='flex'>
          <label className='w-36'>Days</label>
          <DaysSelector
            days={getValues("days") || 1} // Assuming "days" is the field name
            onAdd={() => {
              handleTotalCalculation((getValues("days") || 1) + 1);
            }}
            onMinus={() => {
              if ((getValues("days") || 1) > 1) {
                handleTotalCalculation((getValues("days") || 1) - 1);
              }
            }}
          />
          {errors.days && <span>{errors.days.message}</span>}
        </div>
      )}
      {/* <div className='w-full space-y-4 sm:space-y-0 sm:flex sm:space-x-5 mt-3 hidden'>
        <TextArea
          label='Shipping address'
          value='any addres'
          error={errors.address?.message}
          register={register("address")}
        />
      </div> */}

      <Button
        label='Submit order'
        isLoading={orderMutation.isPending}
        type='submit'
      />
    </form>
  );
};

export default OrderForm;
