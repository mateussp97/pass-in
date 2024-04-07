import { useAtom } from "jotai";
import { useEffect } from "react";
import { Events } from "../api/Events";
import nlwUniteIcon from "../assets/nlw-unite-icon.svg";
import { EventsAtom } from "../atoms/EventsAtom";
import { useQueryFilters } from "../hooks/useQueryFilters";
import { NavLink } from "./nav-link";

export function Header() {
  const [events, setEvents] = useAtom(EventsAtom);
  const { setFilter } = useQueryFilters();

  useEffect(() => {
    (async () => {
      const response = await Events.get();
      setEvents(response.events);
      setFilter("eventId", response.events[0].id);
    })();
  }, []);

  return (
    <div className="flex items-center gap-5 py-2">
      <img src={nlwUniteIcon} alt="NLW Unite" />

      <nav className="flex items-center gap-5">
        {events.map((event) => (
          <NavLink
            key={event.id}
            onClick={() => setFilter("eventId", event.id)}
          >
            {event.title}
          </NavLink>
        ))}
      </nav>
    </div>
  );
}
