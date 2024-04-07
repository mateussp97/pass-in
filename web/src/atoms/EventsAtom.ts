import { atom } from "jotai";
import { EventSchema } from "../../types/types";

export const EventsAtom = atom<EventSchema[]>([]);
