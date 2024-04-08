import { useFormContext } from "react-hook-form";
import { twMerge } from "tailwind-merge";

interface StyledInputProps {
  name: string;
  placeholder: string;
  icon: JSX.Element;
}

export default function StyledInput({
  name,
  placeholder,
  icon,
}: StyledInputProps) {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  const errorMessage = errors[name]?.message;

  return (
    <div className="w-full flex flex-col items-start gap-1">
      <div
        className={twMerge(
          "px-3 w-full py-4 border rounded-lg flex items-center gap-3",
          errorMessage ? "border-red-500" : "border-white/10"
        )}
      >
        {icon}
        <input
          {...register(name)}
          className="bg-transparent focus:ring-0 flex-1 outline-none border-0 p-0 text-sm placeholder:text-gray-300"
          placeholder={placeholder}
        />
      </div>
      {!!errorMessage && (
        <p className="text-red-500 text-sm">{errorMessage.toString()}</p>
      )}
    </div>
  );
}
