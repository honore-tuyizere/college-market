import { FC, Dispatch, SetStateAction } from "react";
import TextBox from "../common/inputs/TextBox";
import { createPurpose } from "../../apis/purpose";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  createPurposeSchema,
  createPurposeSchemaType,
} from "../../utils/schemas/purpose.schema";
import Button from "../common/Button";
import toast from "react-hot-toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { queryKeys } from "../../utils/queryKeys";

interface IPurposeForm {
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}

const PurposeForm: FC<IPurposeForm> = ({ setIsOpen }) => {
  const queryClient = useQueryClient();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<createPurposeSchemaType>({
    resolver: zodResolver(createPurposeSchema),
  });

  const purposeMutation = useMutation({ mutationFn: createPurpose });

  const submit = async (data: createPurposeSchemaType) => {
    try {
      const purposeData = {
        ...data,
        slug: data.name.toLowerCase().replace(/\s+/g, "-"),
      };
      purposeMutation.mutateAsync(purposeData, {
        onSuccess() {
          setIsOpen(false);
          toast.success(`Purpose ${purposeData.name} created`);
          console.log(`Purpose ${purposeData.name} created`);
          queryClient.invalidateQueries({
            queryKey: queryKeys.purposesInForm,
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
            label='Purpose name'
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

export default PurposeForm;
