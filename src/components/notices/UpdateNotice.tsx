import { useMutation, useQueryClient } from "@tanstack/react-query";
import TextBox from "../common/inputs/TextBox";
import FileInput from "../common/inputs/FileInput";
import { uploadFiles } from "../../apis/assets";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Button from "../common/Button";
import toast from "react-hot-toast";
import { ChangeEvent, Dispatch, FC, SetStateAction, useState } from "react";
import { queryKeys } from "../../utils/queryKeys";
import TextArea from "../common/inputs/TextArea";
import {
  createNoticeSchema,
  createNoticeSchemaType,
} from "../../utils/schemas/notice.shema";
import { updateNotice } from "../../apis/notice";
import { INotice } from "../../types";

interface INoticeForm {
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  notice: INotice;
}

const UpdateNoticeForm: FC<INoticeForm> = ({ setIsOpen, notice }) => {
  const queryClient = useQueryClient();
  const [photoPreview, setPhotoPreview] = useState<string | undefined>(undefined);

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    getValues,
    formState: { errors },
  } = useForm<createNoticeSchemaType>({
    resolver: zodResolver(createNoticeSchema),
    defaultValues: {
      name: notice.name,
      description: notice.description,
    },
  });

  const oldThumbnail = notice.photo;

  const noticeMutation = useMutation({ mutationFn: updateNotice });
  const uploadAssets = useMutation({ mutationFn: uploadFiles });

  const previewPhoto = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const file = e.target.files[0];
      const link = URL.createObjectURL(file);
      setPhotoPreview(link);
      setValue("photo", file);
    }
  };

  const submit = (data: createNoticeSchemaType) => {
    const form = document.querySelector("#noticeForm") as HTMLFormElement;

    if (form) {
      const photoData = new FormData();
      if (data.photo) {
        photoData.append("assets", getValues().photo);
      }

      uploadAssets.mutate(photoData, {
        onSuccess(thumbnailResult) {
          uploadAssets.mutate(photoData, {
            onSuccess() {
              const formData = {
                ...data,
                photo: thumbnailResult ? thumbnailResult[0] : oldThumbnail,
                id: notice._id,
              };

              noticeMutation.mutate(formData, {
                onSuccess() {
                  setIsOpen(false);
                  toast.success("Notice updated!");
                  queryClient.invalidateQueries({
                    queryKey: queryKeys.noticesInDashboard,
                  });
                  reset();
                },
              });
            },
          });
        },
      });
    }
  };

  return (
    <>
      <form
        onSubmit={handleSubmit(submit)}
        id='noticeForm'
        className='w-full space-y-3'
        encType='multipart/form,-data'
      >
        <div className='w-full space-y-4 sm:space-y-0 sm:flex sm:space-x-5'>
          <TextBox
            label='Notice name'
            type='text'
            error={errors.name?.message}
            register={register("name")}
          />
        </div>

        <div className='w-full space-y-4 sm:space-y-0 sm:flex sm:space-x-5'>
          <div className='image-previews relative border border-gray-300 border-dashed rounded-xl w-full flex flex-col space-y-2'>
            <div className='p-4 w-full flex flex-wrap space-x-3'>
              <FileInput
                label='Image'
                id='photo'
                withPreview={true}
                register={register("photo", {
                  onChange: (e) => {
                    previewPhoto(e);
                  },
                })}
              />
              {(oldThumbnail || photoPreview) && (
                <img
                  src={photoPreview || oldThumbnail}
                  alt='Image preview'
                  className='w-24 h-24 rounded-md my-2'
                />
              )}
            </div>
            <div className='block w-full px-3 pt-0 absolute bottom-0 left-0'>
              {errors.photo?.message && (
                <div className='block text-sm leading-6 text-red-500'>
                  {errors.photo.message as string}
                </div>
              )}
            </div>
          </div>
        </div>

        <div className='w-full'>
          <TextArea
            label='Description'
            error={errors.description?.message}
            register={register("description")}
          />
        </div>
        <Button
          label='Update'
          isLoading={uploadAssets.isPending || noticeMutation.isPending}
          type='submit'
        />
      </form>
    </>
  );
};

export default UpdateNoticeForm;
