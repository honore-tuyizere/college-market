import { FC } from "react";
import { UseFormRegisterReturn } from "react-hook-form";
interface IOptionFielOption {
  value: string;
  label: string;
}
interface ISelectOption {
  label?: string;
  register?: UseFormRegisterReturn;
  error?: string;
  options?: IOptionFielOption[];
  defaultValue?: string;
  required?: boolean;
  defaultLabel?: string;
}
const SelectOption: FC<ISelectOption> = ({
  label,
  options,
  register,
  error,
  defaultValue,
  required = true,
  defaultLabel,
}) => {
  return (
    <div className='block w-full'>
      {label && (
        <label className='block text-sm font-medium leading-6 text-gray-900'>
          {label}
        </label>
      )}
      <div className='mt-2'>
        <select
          {...register}
          defaultValue={defaultValue}
          className={`block w-full rounded-md bg-white border-0 py-2 px-1.5 text-gray-900 shadow-sm ring-1 ring-inset focus:ring-1 focus:ring-inset ${
            error
              ? `focus:ring-red-500 ring-red-300 placeholder:text-red-400`
              : `focus:ring-teal ring-gray-300 placeholder:text-gray-400`
          }  sm:text-sm sm:leading-6 outline-none`}
        >
          {!required && (
            <option value={""}>{defaultLabel ? defaultLabel : "Select one"}</option>
          )}
          {options?.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        <label className='block text-sm leading-6 text-red-500'>{error}</label>
      </div>
    </div>
  );
};
export default SelectOption;
