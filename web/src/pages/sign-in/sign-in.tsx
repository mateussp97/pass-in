import { zodResolver } from "@hookform/resolvers/zod";
import { AtSign, Blocks } from "lucide-react";
import { FormProvider, useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { z } from "zod";
import StyledInput from "../../components/forms/styled-input";
import MobileFormLayout from "../../components/layouts/mobile-form-layout";
import { User } from "../../api/User";
import { toast } from "react-toastify";

const onRegisterFormSchema = z.object({
  email: z
    .string()
    .min(1, { message: "This field is required" })
    .email({ message: "Please enter a valid email address" }),
  password: z
    .string()
    .min(1, { message: "This field is required" })
    .min(6, { message: "This field must contain at least 6 characters" }),
});

type IRegisterForm = z.infer<typeof onRegisterFormSchema>;

export default function SignIn() {
  const { handleSubmit, ...rest } = useForm<IRegisterForm>({
    resolver: zodResolver(onRegisterFormSchema),
  });
  const navigate = useNavigate();

  async function onRegister(data: IRegisterForm) {
    try {
      const response = await User.login(data);

      localStorage.setItem("@pass-in/token", response.token);

      navigate("/dashboard");
    } catch (e: unknown) {
      toast((e as Error).message, {
        theme: "dark",
        type: "error",
      });
    }
  }

  return (
    <MobileFormLayout>
      <FormProvider handleSubmit={handleSubmit} {...rest}>
        <form onSubmit={handleSubmit(onRegister)} className="w-full px-8">
          <p className="text-gray-200 text-center text-xl mb-8">
            Enter your information to access <br /> our admin panel.
          </p>

          <StyledInput
            icon={<AtSign className="size-4 text-emerald-300" />}
            name="email"
            placeholder="Email"
          />

          <div className="w-full h-fit my-3">
            <StyledInput
              type="password"
              icon={<Blocks className="size-4 text-emerald-300" />}
              name="password"
              placeholder="Password"
            />
          </div>

          <button
            type="submit"
            className="w-full h-fit py-3.5 bg-tangerine-400 hover:bg-tangerine-300 text-firefly-950 font-bold text-sm uppercase rounded-xl"
          >
            Sign in
          </button>
          <Link to="/get-ticket">
            <button className="w-full h-fit mt-3.5 py-3.5 bg-transparent text-gray-200 font-bold text-base rounded-xl">
              Access as attendee
            </button>
          </Link>
        </form>
      </FormProvider>
    </MobileFormLayout>
  );
}
