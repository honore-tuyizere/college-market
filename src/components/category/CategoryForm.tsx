import { FC, Dispatch, SetStateAction } from "react";
import TextBox from "../common/inputs/TextBox";
import { createCategory } from "../../apis/category";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  createCategorySchema,
  createCategorySchemaType,
} from "../../utils/schemas/category.schema";
import Button from "../common/Button";
import toast from "react-hot-toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { queryKeys } from "../../utils/queryKeys";

interface ICategoryForm {
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}

const CategoryForm: FC<ICategoryForm> = ({ setIsOpen }) => {
  const queryClient = useQueryClient();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<createCategorySchemaType>({
    resolver: zodResolver(createCategorySchema),
  });

  const categoryMutation = useMutation({ mutationFn: createCategory });

  const submit = async (data: createCategorySchemaType) => {
    try {
      await categoryMutation.mutateAsync(data, {
        onSuccess(category) {
          setIsOpen(false);
          toast.success(`Category ${category.name} created`);
          console.log(`Category ${category.name} created`);
          queryClient.invalidateQueries({
            queryKey: queryKeys.categoriesInForm,
          });
          reset();
        },
      });
    } catch (error) {
      toast.error((error as Error).message);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit(submit)} className='flex flex-col gap-4 w-full'>
        <div className='w-full space-y-4 sm:space-y-0 sm:flex sm:space-x-5'>
          <TextBox
            label='Category name'
            type='text'
            error={errors.name?.message}
            register={register("name")}
          />
        </div>
        <Button label='Submit' type='submit' />
      </form>
    </>
  );
};

export default CategoryForm;
