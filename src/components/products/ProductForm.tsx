import { useMutation, useQueryClient, useQuery } from "@tanstack/react-query";
import TextBox from "../common/inputs/TextBox";
import SelectOption from "../common/inputs/SelectOption";
import FileInput from "../common/inputs/FileInput";
import { getCategories } from "../../apis/category";
import { getConditions } from "../../apis/condition";
import { createProduct } from "../../apis/products";
import { uploadFiles } from "../../apis/assets";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  createProductSchema,
  createProductSchemaType,
} from "../../utils/schemas/product.schema";
import Button from "../common/Button";
import toast from "react-hot-toast";
import { ChangeEvent, Dispatch, FC, SetStateAction, useState } from "react";
import { queryKeys } from "../../utils/queryKeys";
import { ICondition, ICategory } from "../../types";
import TextArea from "../common/inputs/TextArea";
import { XMarkIcon } from "@heroicons/react/24/outline";

interface IPRoductForm {
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}

const ProductForm: FC<IPRoductForm> = ({ setIsOpen }) => {
  const queryClient = useQueryClient();
  const [galleryPreview, setGalleryPreview] = useState<
    { url: string; index: number; img: File }[]
  >([]);
  const [thumbnailPreview, setThumbnailPreview] = useState<string | undefined>(
    undefined,
  );

  const {
    register,
    handleSubmit,
    reset,
    setError,
    setValue,
    getValues,
    formState: { errors },
  } = useForm<createProductSchemaType>({
    resolver: zodResolver(createProductSchema),
  });

  const { data: conditions } = useQuery({
    queryFn: () => getConditions(),
    queryKey: queryKeys.conditionsInForm,
  });

  const { data: categories } = useQuery({
    queryFn: () => getCategories(),
    queryKey: queryKeys.categoriesInForm,
  });

  const productMutation = useMutation({ mutationFn: createProduct });
  const uploadAssets = useMutation({ mutationFn: uploadFiles });

  const galleryImages = () => {
    const images = galleryPreview.map((item) => item.img);
    setValue("gallery", images);
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
      galleryImages();
    }
  };

  const removeFromGallery = (index: number) => {
    const newGallery = galleryPreview.filter((_, i) => i !== index);
    setGalleryPreview(newGallery);
    setValue(
      "gallery",
      getValues().gallery.filter((_: File, i: number) => i !== index),
    );
    galleryImages();
  };

  const previewThumbnail = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const file = e.target.files[0];
      const link = URL.createObjectURL(file);
      setThumbnailPreview(link);
      setValue("thumbnail", file);
    }
  };

  // console.log(galleryPreview, getValues("gallery"));

  const submit = (data: createProductSchemaType) => {
    const ValidResult = createProductSchema.safeParse(data);
    // console.log(galleryImages());

    if (ValidResult.success) {
      if (data.thumbnail?.length == 0) {
        setError("thumbnail", {
          type: "manual",
          message: "Thumbnail is required for a product",
        });
      } else {
        const form = document.querySelector("#productForm") as HTMLFormElement;
        if (form) {
          const thumbnailData = new FormData();

          thumbnailData.append("assets", getValues().thumbnail);
          uploadAssets.mutate(thumbnailData, {
            onSuccess(thumbnailResult: Array<string>) {
              const galleryData = new FormData(),
                files = galleryImages();
              for (let i = 0; i < files.length; i++) {
                galleryData.append("assets", files[i]);
              }
              uploadAssets.mutate(galleryData, {
                onSuccess(galleryResult) {
                  const formData = {
                    ...data,
                    gallery: galleryResult,
                    thumbnail: thumbnailResult,
                  };

                  productMutation.mutate(formData, {
                    onSuccess() {
                      setIsOpen(false);
                      toast.success("New product created!");
                      queryClient.invalidateQueries({
                        queryKey: queryKeys.productsInDashboard,
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
    }
  };
  return (
    <>
      <form
        onSubmit={handleSubmit(submit)}
        id='productForm'
        className='w-full space-y-3'
        encType='multipart/form,-data'
      >
        <div className='w-full space-y-4 sm:space-y-0 sm:flex sm:space-x-5'>
          <TextBox
            label='Product name'
            type='text'
            error={errors.name?.message}
            register={register("name")}
          />
          <TextBox
            label='Product price ($)'
            type='number'
            error={errors.price?.message}
            register={register("price")}
          />
        </div>

        <div className='w-full space-y-4 sm:space-y-0 sm:flex sm:space-x-5'>
          <div className='image-previews relative border border-gray-300 border-dashed rounded-xl w-full flex flex-col space-y-2'>
            <div className='p-4 w-full flex flex-wrap space-x-3'>
              <FileInput
                label='Thumbnail'
                id='thumbnail'
                withPreview={true}
                register={register("thumbnail", {
                  onChange: (e) => {
                    previewThumbnail(e);
                  },
                })}
              />
              {thumbnailPreview && (
                <img
                  src={thumbnailPreview}
                  alt='Image preview'
                  className='w-24 h-24 rounded-md my-2'
                />
              )}
            </div>
            <div className='block w-full px-3 pt-0 absolute bottom-0 left-0'>
              {errors.thumbnail?.message && (
                <div className='block text-sm leading-6 text-red-500'>
                  {errors.thumbnail.message as string}
                </div>
              )}
            </div>
          </div>
          <div className='w-full flex flex-col space-y-2'>
            {conditions && (
              <SelectOption
                error={errors.condition?.message}
                register={register("condition")}
                label='Condition'
                options={conditions.map((condition: ICondition) => ({
                  value: condition._id,
                  label: condition.name,
                }))}
              />
            )}
            {categories && (
              <SelectOption
                error={errors.category?.message}
                register={register("category")}
                label='Category'
                options={categories.map((category: ICategory) => ({
                  value: category._id,
                  label: category.name,
                }))}
              />
            )}
          </div>
        </div>
        <div className='image-previews flex flex-wrap space-x-5 border border-gray-300 border-dashed rounded-xl p-4'>
          <FileInput
            label='Gallery'
            id='gallery'
            withPreview={true}
            allowMultiple={true}
            register={register("gallery", {
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

        <Button label='Submit' isLoading={productMutation.isPending} type='submit' />
      </form>
    </>
  );
};

export default ProductForm;
