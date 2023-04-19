import React from "react";

interface Props {
  label: string;
  type: string;
  name: string;
  register: any;
  errors: any;
  placeholder: string;
}

const FormInput = ({
  label,
  type,
  name,
  register,
  errors,
  placeholder,
}: Props) => (
  <div className="mb-4">
    <label className="block text-gray-700 font-bold mb-2" htmlFor={type}>
      {label}
    </label>
    <input
      className={`shadow appearance-none border w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
        errors[type] ? "border-red-500" : ""
      }`}
      type={type}
      name={name}
      {...register(name)}
      autoComplete="off"
      placeholder={placeholder}
    />
    {errors[type] && (
      <p className="mt-2 text-xs text-red-500 font-semibold">
        {errors[type].message}
      </p>
    )}
  </div>
);

export default FormInput;
