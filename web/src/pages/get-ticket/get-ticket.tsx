import { zodResolver } from "@hookform/resolvers/zod";
import { Ticket } from "lucide-react";
import { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { twMerge } from "tailwind-merge";
import { z } from "zod";
import { Attendee } from "../../api/Attendees";
import StyledInput from "../../components/forms/styled-input";
import MobileFormLayout from "../../components/layouts/mobile-form-layout";

const onGetTicketFormSchema = z.object({
  attendeeId: z
    .string()
    // First, it checks that the string is a valid integer.
    .refine((value) => /^\d+$/.test(value), {
      message: "This field only accepts numbers",
    })
    // After the initial validation, it transforms the value into a number.
    .transform((value) => parseInt(value, 10)),
});

type IGetTicketForm = z.infer<typeof onGetTicketFormSchema>;

export default function GetTicket() {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const { handleSubmit, ...rest } = useForm<IGetTicketForm>({
    resolver: zodResolver(onGetTicketFormSchema),
  });

  async function onGetTicket(data: IGetTicketForm) {
    const { attendeeId } = data;

    try {
      setIsLoading(true);

      await Attendee.getBadge(Number(attendeeId));

      navigate(`/ticket?attendeeId=${attendeeId}`);
    } catch (error: any) {
      toast(error.message, {
        theme: "dark",
        type: "error",
      });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <MobileFormLayout>
      <FormProvider handleSubmit={handleSubmit} {...rest}>
        <form onSubmit={handleSubmit(onGetTicket)} className="w-full px-8">
          <div className="w-full h-fit mb-3">
            <StyledInput
              icon={<Ticket className="size-4 text-emerald-300" />}
              name="attendeeId"
              placeholder="Código do ingresso"
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full h-fit py-3.5 bg-tangerine-400 text-firefly-950 font-bold text-sm uppercase rounded-xl"
          >
            Acessar Credencial
          </button>
          <Link
            to="/register"
            className={twMerge(
              isLoading ? "pointer-events-none" : "pointer-events-auto"
            )}
          >
            <button className="w-full h-fit mt-3.5 py-3.5 bg-transparent text-gray-200 font-bold text-base rounded-xl">
              Ainda não possui ingresso?
            </button>
          </Link>
        </form>
      </FormProvider>
    </MobileFormLayout>
  );
}
