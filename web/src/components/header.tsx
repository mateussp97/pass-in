import { motion } from "framer-motion";
import { useAtom } from "jotai";
import { Fragment, useEffect } from "react";
import { Events } from "../api/Events";
import { User } from "../api/User";
import nlwUniteIcon from "../assets/nlw-unite-icon.svg";
import { EventsAtom } from "../atoms/EventsAtom";
import { useModalStore } from "../atoms/stores/useModalStore";
import { useQueryFilters } from "../hooks/useQueryFilters";
import CreateEventModal from "./modal/create-event-modal";
import { NavLink } from "./nav-link";

export function Header() {
  const [events, setEvents] = useAtom(EventsAtom);
  const { setFilter, getFilter } = useQueryFilters();
  const {
    methods: { onOpenModal, onCloseModal },
  } = useModalStore();

  useEffect(() => {
    (async () => {
      const response = await Events.get();
      setEvents(response.events);
      setFilter("eventId", response.events[0].id);
    })();
  }, []);

  return (
    <div className="w-full h-fit flex items-center justify-between gap-5 py-2">
      <div className="w-fit flex items-center gap-5">
        <img src={nlwUniteIcon} alt="NLW Unite" />

        <nav className="flex items-center gap-2.5">
          {events.map((event) => (
            <NavLink
              key={event.id}
              onClick={() => setFilter("eventId", event.id)}
            >
              <Fragment>
                {event.title}
                {getFilter("eventId") === event.id ? (
                  <motion.div
                    layoutId="underline"
                    className="w-full h-full bg-white bg-opacity-10 rounded-full absolute bottom-0"
                  />
                ) : (
                  <Fragment />
                )}
              </Fragment>
            </NavLink>
          ))}
        </nav>
      </div>

      <div className="flex items-center gap-4">
        {User.isAdmin() && (
          <button
            type="button"
            className="inline-flex w-fit justify-center rounded-full bg-tangerine-400 px-3 py-2 text-sm font-semibold text-firefly-950 shadow-sm hover:bg-tangerine-300"
            onClick={() =>
              onOpenModal({
                content: <CreateEventModal onClose={onCloseModal} />,
              })
            }
          >
            Create Event
          </button>
        )}
        <button
          type="button"
          className="inline-flex w-fit justify-center rounded-full bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500"
          onClick={() => User.logout()}
        >
          Logout
        </button>
      </div>
    </div>
  );
}
