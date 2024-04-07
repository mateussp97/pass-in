import { EventSchema } from "../../types/types";

const get = async (): Promise<{ events: EventSchema[] }> => {
  const response = await fetch(`http://localhost:3333/events`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-type": "application/json",
    },
  });

  return response.json();
};

export const Events = {
  get,
};
