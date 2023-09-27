import { Group } from "@prisma/client";
import { FC } from "react";
import { FieldErrors, FieldValues, UseFormRegister } from "react-hook-form";

interface SelectGroupProps {
  label: string;
  id: string;
  type?: string;
  required?: boolean;
  register: UseFormRegister<FieldValues>;
  errors: FieldErrors;
  disabled?: boolean;
  options: Group[];
  name: string;
}

const SelectGroup: FC<SelectGroupProps> = ({
  register,
  options,
  name,
  id,
  label,
  ...rest
}) => {
  return (
    <>
      <label
        htmlFor={id}
        className='
          block 
          text-sm 
          font-medium 
          leading-6 
          text-gray-900
        '
      >
        {label}
      </label>
      <select
        className='w-full p-2 border-2 rounded-md '
        {...register(name)}
        {...rest}
      >
        {options.map((value) => (
          <option key={value.id} value={value.id}>
            {value.name} 
          </option>
        ))}
      </select>
    </>
  );
};

export default SelectGroup;
