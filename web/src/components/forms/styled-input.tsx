import { ComponentProps } from "react";
import { useFormContext } from "react-hook-form";
import { twMerge } from "tailwind-merge";

interface StyledInputProps extends ComponentProps<"input"> {
  name: string;
  placeholder: string;
  icon?: JSX.Element;
}

export default function StyledInput({
  name,
  placeholder,
  icon,
  ...rest
}: StyledInputProps) {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  const errorMessage = errors[name]?.message;

  return (
    <div className="w-full h-fit">
      <div className="w-full relative flex items-center justify-center">
        {icon && (
          <div className="w-4 h-4 absolute left-3 flex items-center justify-center pointer-events-none z-50">
            {icon}
          </div>
        )}
        <input
          {...register(name)}
          type="text"
          className={twMerge(
            "w-full pr-3 py-3 block bg-transparent text-sm text-white rounded-lg appearance-none border outline-none focus:outline-none focus:ring-0 peer",
            errorMessage
              ? "border-red-600 focus:border-red-600"
              : "border-white/10 focus:border-tangerine-400",
            !!icon ? "pl-9" : "pl-3"
          )}
          placeholder=" "
          {...rest}
        />
        <label
          className={twMerge(
            "duration-300 absolute backdrop-blur-md transform z-10 origin-[0] bg-transparent text-sm text-gray-300 pointer-events-none peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 -translate-y-4 peer-focus:-translate-y-4 scale-75 peer-focus:scale-75 peer-placeholder-shown:scale-100 top-1.5 peer-focus:top-1.5 px-2 peer-focus:px-2 left-1 peer-focus:left-1",
            !!icon
              ? "peer-placeholder-shown:left-7"
              : "peer-placeholder-shown:left-1",
            errorMessage
              ? "peer-focus:text-red-500 "
              : "peer-focus:text-tangerine-400 "
          )}
        >
          {placeholder}
        </label>
      </div>
      {!!errorMessage && (
        <p className="text-red-500 text-xs mt-1 mr-auto text-left">
          {errorMessage.toString()}
        </p>
      )}
    </div>
  );
}
