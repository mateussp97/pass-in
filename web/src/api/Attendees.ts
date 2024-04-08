import { AttendeeSchema, BadgeAttendeeSchema } from "../../types/types";

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
    const errorBody = await response.json();
    throw new Error(errorBody.message);
  }

  return response.json();
};

const getBadge = async (
  attendeeId: number
): Promise<{
  badge: BadgeAttendeeSchema;
}> => {
  const url = new URL(`http://localhost:3333/attendees/${attendeeId}/badge`);

  const response = await fetch(url.toString(), {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    const errorBody = await response.json();
    throw new Error(errorBody.message);
  }

  return response.json();
};

const registerForEvent = async ({
  name,
  email,
  eventId,
}: {
  name: string;
  email: string;
  eventId: string;
}): Promise<{ attendeeId: number }> => {
  const url = new URL(`http://localhost:3333/events/${eventId}/attendees`);

  const response = await fetch(url.toString(), {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-type": "application/json",
    },
    body: JSON.stringify({ name, email }),
  });

  if (!response.ok) {
    const errorBody = await response.json();
    throw new Error(errorBody.message);
  }

  return response.json();
};

export const Attendee = {
  get,
  getBadge,
  registerForEvent,
};
