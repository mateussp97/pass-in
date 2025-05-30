import { useAtom } from "jotai";
import { Fragment, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { twMerge } from "tailwind-merge";
import { EventSchema } from "../../../../types/types";
import { Attendee } from "../../../api/Attendees";
import { Events } from "../../../api/Events";
import { EventsAtom } from "../../../atoms/EventsAtom";

interface RegisterListProps {
  name: string;
  email: string;
}

export default function RegisterList({ email, name }: RegisterListProps) {
  const [events, setEvents] = useAtom(EventsAtom);
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    (async () => {
      const response = await Events.get();
      setEvents(response.events);
    })();
  }, []);

  async function onSelectEvent(event: EventSchema) {
    const { id, title } = event;

    try {
      setIsLoading(true);

      const { attendeeId } = await Attendee.registerForEvent({
        name,
        email,
        eventId: id,
      });

      toast(`You have been registered as a attendee of the ${title} event`, {
        theme: "dark",
        type: "success",
      });

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
    <Fragment>
      <p className="text-gray-200 text-center text-xl mb-8">
        Select the event you want to register for.
      </p>
      <div className="w-full px-8 grid grid-cols-1 gap-4">
        {events.map((event) => (
          <div
            key={event.id}
            onClick={async () => await onSelectEvent(event)}
            className={twMerge(
              "w-full p-4 flex flex-col items-start rounded-2xl border border-white border-opacity-10 cursor-pointer",
              isLoading || event.attendeesAmout === event.maximumAttendees
                ? "opacity-50 pointer-events-none"
                : "hover:border-orange-400"
            )}
          >
            <p className="text-gray-200 font-bold text-lg">{event.title}</p>
            <p className="text-gray-300 text-base mt-1 mb-2">{event.details}</p>
            <p className="text-gray-400 text-xs">
              Limit of attendees: {event.attendeesAmout}/
              {event.maximumAttendees}
            </p>
          </div>
        ))}
      </div>
    </Fragment>
  );
}
