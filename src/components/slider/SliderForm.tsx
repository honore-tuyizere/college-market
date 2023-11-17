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
import { XMarkIcon } from "@heroicons/react/24/outline";
import { ISlider } from "../../types";
import {
  createSliderSchema,
  createSliderSchemaType,
} from "../../utils/schemas/slider.schema";
import { createSliders } from "../../apis/slider";
import SelectOption from "../common/inputs/SelectOption";

interface ISliderForm {
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}

const SliderForm: FC<ISliderForm> = ({ setIsOpen }) => {
  const queryClient = useQueryClient();
  const [galleryPreview, setGalleryPreview] = useState<
    { url: string; index: number; img: File }[]
  >([]);

  const typeValue = [
    { value: "HEROSLIDER", label: "HERO slider" },
    { value: "ADSSLIDER", label: "Ads slider" },
  ];
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    getValues,
    formState: { errors },
  } = useForm<createSliderSchemaType>({
    resolver: zodResolver(createSliderSchema),
  });

  const sliderMutation = useMutation({ mutationFn: createSliders });
  const uploadAssets = useMutation({ mutationFn: uploadFiles });

  const photo = () => {
    const images = galleryPreview.map((item) => item.img);
    setValue("photo", images);
    return images;
  };

  const previewGallery = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = e.target.files;
      const previews: { url: string; index: number; img: File }[] = [];

      for (let i = 0; i < files.length; i++) {
        const link = URL.createObjectURL(files[i]),
          imageIndex = Math.random();
        previews.push({ url: link, index: imageIndex, img: files[i] });
      }
      setGalleryPreview([...galleryPreview, ...previews]);
      photo();
    }
  };

  const removeFromGallery = (index: number) => {
    const newGallery = galleryPreview.filter((_, i) => i !== index);
    setGalleryPreview(newGallery);
    setValue(
      "photo",
      getValues().photo.filter((_: File, i: number) => i !== index),
    );
    photo();
  };

  const submit = (data: createSliderSchemaType) => {
    const ValidResult = createSliderSchema.safeParse(data);

    if (ValidResult.success) {
      const form = document.querySelector("#noticeForm") as HTMLFormElement;
      if (form) {
        const noticeData = new FormData();

        noticeData.append("assets", getValues().title);
        uploadAssets.mutate(noticeData, {
          onSuccess() {
            const galleryData = new FormData(),
              files = photo();
            galleryData.append("assets", files[0]);

            uploadAssets.mutate(galleryData, {
              onSuccess(galleryResult) {
                const formData: ISlider = {
                  ...data,
                  photo: galleryResult[0],
                };

                sliderMutation.mutate(formData, {
                  onSuccess() {
                    setIsOpen(false);
                    toast.success("New Notice created!");
                    queryClient.invalidateQueries({
                      queryKey: queryKeys.slidersInDashboard,
                    });
                    reset();
                  },
                });
              },
            });
          },
        });
      }
    }
  };
  return (
    <div className='w-full bg-white p-5  rounded-sm'>
      <form
        onSubmit={handleSubmit(submit)}
        id='noticeForm'
        className='w-full space-y-3'
        encType='multipart/form,-data'
      >
        <div className='w-full space-y-4 sm:space-y-0 sm:flex sm:space-x-5'>
          <TextBox
            label='Slider title'
            type='text'
            error={errors.title?.message}
            register={register("title")}
          />
        </div>

        <div className='image-previews flex flex-wrap space-x-5 border border-gray-300 border-dashed rounded-xl p-4'>
          <FileInput
            label='Gallery'
            id='photo'
            withPreview={true}
            allowMultiple={true}
            register={register("photo", {
              onChange: (e) => {
                previewGallery(e);
              },
            })}
          />
          {galleryPreview.length > 0 && (
            <>
              {galleryPreview.map((preview, index) => (
                <div className='relative' id={`image-${index}`} key={preview.index}>
                  <img
                    src={preview.url}
                    alt='Image preview'
                    className='w-24 h-24 rounded-md my-2'
                  />
                  <span
                    className='absolute -top-1.5 -right-3 bg-white rounded-full p-1 cursor-pointer border border-gray-300'
                    onClick={() => removeFromGallery(index)}
                  >
                    <XMarkIcon className='w-4 h-4' />
                  </span>
                </div>
              ))}
            </>
          )}
        </div>
        <div className='w-full'>
          <TextArea
            label='Description'
            error={errors.description?.message}
            register={register("description")}
          />
        </div>
        <div className='w-full'>
          <SelectOption
            error={errors.type?.message}
            register={register("type")}
            label='Type'
            options={typeValue.map((typeValue) => ({
              value: typeValue.value,
              label: typeValue.label,
            }))}
          />
        </div>

        <Button
          label='Save'
          isLoading={uploadAssets.isPending || sliderMutation.isPending}
          type='submit'
        />
      </form>
    </div>
  );
};

export default SliderForm;
