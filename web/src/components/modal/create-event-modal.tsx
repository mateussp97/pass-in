import { Dialog } from "@headlessui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSetAtom } from "jotai";
import { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { z } from "zod";
import { Events } from "../../api/Events";
import { EventsAtom } from "../../atoms/EventsAtom";
import { useQueryFilters } from "../../hooks/useQueryFilters";
import { generateSlug } from "../../utils/generate-slug";
import StyledInput from "../forms/styled-input";
import StyledTextArea from "../forms/styled-textarea";

const onRegisterFormSchema = z.object({
  title: z
    .string()
    .min(1, { message: "This field is required" })
    .min(6, { message: "This field must contain at least 6 characters" }),
  details: z.string().min(1, { message: "This field is required" }),
  maximumAttendees: z.string().min(1, { message: "This field is required" }),
});

type IRegisterForm = z.infer<typeof onRegisterFormSchema>;

interface CreateEventModalProps {
  onClose: () => void;
}

export default function CreateEventModal({ onClose }: CreateEventModalProps) {
  const { handleSubmit, ...rest } = useForm<IRegisterForm>({
    resolver: zodResolver(onRegisterFormSchema),
    defaultValues: {
      maximumAttendees: "100",
    },
  });
  const { setFilter } = useQueryFilters();
  const [isLoading, setIsLoading] = useState(false);
  const setEvents = useSetAtom(EventsAtom);

  async function onRegister(data: IRegisterForm) {
    const { details, maximumAttendees, title } = data;

    const newEvent = {
      title,
      details,
      maximumAttendees: Number(maximumAttendees),
    };

    try {
      setIsLoading(true);

      const { eventId } = await Events.create(newEvent);

      setEvents((prevArray) => [
        ...prevArray,
        {
          ...newEvent,
          id: eventId,

          slug: generateSlug(newEvent.title),
        },
      ]);

      toast("Event successfully created", {
        theme: "dark",
        type: "success",
      });

      onClose();

      setFilter("eventId", eventId);
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
    <div className="w-96 p-6 flex flex-col items-start">
      <Dialog.Title
        as="h3"
        className="text-base font-semibold leading-6 text-zinc-50 mb-10"
      >
        Create event
      </Dialog.Title>
      <FormProvider handleSubmit={handleSubmit} {...rest}>
        <form
          onSubmit={handleSubmit(onRegister)}
          className="w-full flex flex-col"
        >
          <StyledInput name="title" placeholder="Title" />

          <div className="w-full h-fit my-5">
            <StyledTextArea name="details" placeholder="Details" />
          </div>

          <div className="w-full h-fit mb-5">
            <StyledInput
              type="number"
              name="maximumAttendees"
              placeholder="Maximum Attendees"
            />
          </div>

          <div className="flex items-center justify-end gap-2.5">
            <button
              disabled={isLoading}
              type="button"
              className="inline-flex w-fit justify-center rounded-full bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
              onClick={onClose}
            >
              Cancel
            </button>
            <button
              disabled={isLoading}
              type="submit"
              className="inline-flex w-fit justify-center rounded-full bg-tangerine-400 px-3 py-2 text-sm font-semibold text-firefly-950 shadow-sm hover:bg-tangerine-300"
            >
              Create
            </button>
          </div>
        </form>
      </FormProvider>
    </div>
  );
}
