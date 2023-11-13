import { FC, Dispatch, SetStateAction } from "react";
import TextBox from "../common/inputs/TextBox";
import { createCondition } from "../../apis/condition";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  createConditionSchema,
  createConditionSchemaType,
} from "../../utils/schemas/condition.schema";
import Button from "../common/Button";
import toast from "react-hot-toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { queryKeys } from "../../utils/queryKeys";

interface IConditionForm {
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}

const ConditionForm: FC<IConditionForm> = ({ setIsOpen }) => {
  const queryClient = useQueryClient();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<createConditionSchemaType>({
    resolver: zodResolver(createConditionSchema),
  });

  const conditionMutation = useMutation({ mutationFn: createCondition });

  const submit = async (data: createConditionSchemaType) => {
    try {
      await conditionMutation.mutateAsync(data, {
        onSuccess: (condition) => {
          setIsOpen(false);
          toast.success(`Condition ${condition.name} created`);
          console.log(`Condition ${condition.name} created`);
          queryClient.invalidateQueries({
            queryKey: queryKeys.conditionsInForm,
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
            label='Condition name'
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

export default ConditionForm;
