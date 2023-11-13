import { FC } from "react";
import { UseFormRegisterReturn } from "react-hook-form";

interface ICheckbox {
  label: string;
  value?: string;
  register: UseFormRegisterReturn;
  checked?: boolean;
  id?: string;
}
const Checkbox: FC<ICheckbox> = ({
  label,
  value,
  register,
  checked = false,
  id = (Math.random() * 100).toString(),
}) => {
  return (
    <div className='flex items-center space-x-2'>
      <input
        type='checkbox'
        id={id}
        {...register}
        defaultValue={value}
        defaultChecked={checked}
        className='h-5 w-5 checkbox custom rounded cursor-pointer'
      />
      <label className='text-gray-700 cursor-pointer capitalize' htmlFor={id}>
        {label}
      </label>
    </div>
  );
};

export default Checkbox;
