import { AttendeeSchema } from "../../types/types";

const get = async ({
  eventId,
  pageIndex = 0,
  query = "",
}: {
  eventId: string;
  pageIndex?: number;
  query?: string;
}): Promise<{ attendees: AttendeeSchema[]; total: number }> => {
  const url = new URL(`http://localhost:3333/events/${eventId}/attendees`);
  url.searchParams.set("pageIndex", String(pageIndex));

  if (query) {
    url.searchParams.set("query", query);
  }

  const response = await fetch(url.toString(), {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error(`Error fetching attendees: ${response.statusText}`);
  }

  return response.json();
};

export const Attendee = {
  get,
};
