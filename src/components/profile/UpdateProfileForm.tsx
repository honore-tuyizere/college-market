import { FC, Dispatch, SetStateAction } from "react";
import TextBox from "../common/inputs/TextBox";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Button from "../common/Button";
import toast from "react-hot-toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { queryKeys } from "../../utils/queryKeys";
import {
  createProfileSchema,
  createProfileSchemaType,
} from "../../utils/schemas/userProfile.schema";
import { updateUserProfile } from "../../apis/user";
import { IUser } from "../../types";

interface IUserProfileForm {
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  profileInfo: IUser;
}

const UpdateProfileForm: FC<IUserProfileForm> = ({ setIsOpen, profileInfo }) => {
  const queryClient = useQueryClient();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<createProfileSchemaType>({
    resolver: zodResolver(createProfileSchema),
    defaultValues: {
      bankAccount: profileInfo.bankAccount,
      bankName: profileInfo.bankName,
      phone: profileInfo.phone,
    },
  });

  const profileMutation = useMutation({ mutationFn: updateUserProfile });

  const submit = async (data: createProfileSchemaType) => {
    try {
      await profileMutation.mutateAsync(
        { ...data, id: profileInfo._id },
        {
          onSuccess() {
            setIsOpen(false);
            toast.success(`update profile successful`);
            queryClient.invalidateQueries({
              queryKey: queryKeys.userInDashboard,
            });
            reset();
          },
        },
      );
    } catch (error) {
      toast.error((error as Error).message);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit(submit)} className='flex flex-col gap-4 w-full'>
        <div className='w-full space-y-4 sm:space-y-0 sm:flex sm:space-x-5'>
          <TextBox
            label='Bank Name'
            type='text'
            error={errors.bankName?.message}
            register={register("bankName")}
          />
        </div>
        <div className='w-full space-y-4 sm:space-y-0 sm:flex sm:space-x-5'>
          <TextBox
            label='Bank Account'
            type='text'
            error={errors.bankAccount?.message}
            register={register("bankAccount")}
          />
        </div>
        <div className='w-full space-y-4 sm:space-y-0 sm:flex sm:space-x-5'>
          <TextBox
            label='Telephone Number'
            type='text'
            error={errors.phone?.message}
            register={register("phone")}
          />
        </div>
        <Button label='Submit' type='submit' isLoading={profileMutation.isPending} />
      </form>
    </>
  );
};

export default UpdateProfileForm;
