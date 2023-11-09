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
import { Dispatch, FC, SetStateAction } from "react";
import { queryKeys } from "../../utils/queryKeys";
import { createOrder } from "../../apis/orders";
import { IProduct } from "../../types";
import TextBox from "../common/inputs/TextBox";
interface IOrderForm {
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  product: IProduct;
}

const OrderForm: FC<IOrderForm> = ({ setIsOpen, product }) => {
  const queryClient = useQueryClient();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<orderSchemaType>({
    resolver: zodResolver(orderSchema),
  });

  const orderMutation = useMutation({ mutationFn: createOrder });

  const submit = (data: orderSchemaType) => {
    const formData = {
      ...data,
    };

    orderMutation.mutate(formData, {
      onSuccess() {
        setIsOpen(false);
        toast.success("Order created!");
        queryClient.invalidateQueries({
          queryKey: queryKeys.orders,
        });
        reset();
      },
    });
  };
  return (
    <>
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
              className='w-24 h-24 rounded-md'
              alt={product.name}
            />
          </div>
          <div>
            <div className='text-xl font-bold text-gray-800'>{product.name}</div>
            <div className='text md font-semibold uppercase text-gray-500'>
              {product.category.name}
            </div>
          </div>
        </div>
        <div className='w-full space-y-4 sm:space-y-0 sm:flex sm:space-x-5'>
          <TextBox
            label='Phone'
            type='tel'
            error={errors.phone?.message}
            register={register("phone")}
          />
        </div>

        <Button label='Submit' isLoading={orderMutation.isPending} type='submit' />
      </form>
    </>
  );
};

export default OrderForm;
