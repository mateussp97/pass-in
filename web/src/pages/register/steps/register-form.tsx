import { zodResolver } from "@hookform/resolvers/zod";
import { AtSign, Users } from "lucide-react";
import { Dispatch, SetStateAction } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { z } from "zod";
import StyledInput from "../../../components/forms/styled-input";
import { ERegisterSteps, RegisterProps } from "../register";

const onRegisterFormSchema = z.object({
  name: z
    .string()
    .min(1, { message: "This field is required" })
    .min(6, { message: "This field must contain at least 6 characters" }),
  email: z
    .string()
    .min(1, { message: "This field is required" })
    .email({ message: "Please enter a valid email address" }),
});

type IRegisterForm = z.infer<typeof onRegisterFormSchema>;

interface RegisterListProps {
  setRegister: Dispatch<SetStateAction<RegisterProps>>;
}

export default function RegisterForm({ setRegister }: RegisterListProps) {
  const { handleSubmit, ...rest } = useForm<IRegisterForm>({
    resolver: zodResolver(onRegisterFormSchema),
  });

  function onRegister(data: IRegisterForm) {
    const { email, name } = data;
    setRegister({
      name,
      email,
      step: ERegisterSteps.LIST,
    });
  }

  return (
    <FormProvider handleSubmit={handleSubmit} {...rest}>
      <form onSubmit={handleSubmit(onRegister)} className="w-full px-8">
        <StyledInput
          icon={<Users className="size-4 text-emerald-300" />}
          name="name"
          placeholder="Full name"
        />

        <div className="w-full h-fit my-3">
          <StyledInput
            icon={<AtSign className="size-4 text-emerald-300" />}
            name="email"
            placeholder="Email"
          />
        </div>

        <button
          type="submit"
          className="w-full h-fit py-3.5 bg-tangerine-400 text-firefly-950 font-bold text-sm uppercase rounded-xl"
        >
          Register
        </button>
        <Link to="/get-ticket">
          <button className="w-full h-fit mt-3.5 py-3.5 bg-transparent text-gray-200 font-bold text-base rounded-xl">
            Already have a ticket?
          </button>
        </Link>
      </form>
    </FormProvider>
  );
}
