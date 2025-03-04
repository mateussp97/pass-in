import { EventSchema } from "../../types/types";

const get = async (): Promise<{ events: EventSchema[] }> => {
  const response = await fetch(`http://localhost:3333/events`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-type": "application/json",
    },
  });

  if (!response.ok) {
    const errorBody = await response.json();
    throw new Error(errorBody.message);
  }

  return response.json();
};

const create = async ({
  title,
  details,
  maximumAttendees,
}: {
  title: string;
  details: string;
  maximumAttendees: number;
}): Promise<{ eventId: string }> => {
  const url = new URL(`http://localhost:3333/events`);

  const response = await fetch(url.toString(), {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-type": "application/json",
    },
    body: JSON.stringify({ title, details, maximumAttendees }),
  });

  if (!response.ok) {
    const errorBody = await response.json();
    throw new Error(errorBody.message);
  }

  return response.json();
};

export const Events = {
  get,
  create,
};
