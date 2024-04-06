import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import z from "zod";
import { prisma } from "../lib/prisma";

export async function getEvents(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().get(
    "/events",
    {
      schema: {
        summary: "Get events",
        tags: ["events"],
        response: {
          200: z.object({
            events: z.array(
              z.object({
                id: z.string(),
                details: z.string().nullable(),
                title: z.string(),
                slug: z.string(),
                maximumAttendees: z.number().nullable(),
                attendeesAmout: z.number(),
              })
            ),
          }),
        },
      },
    },
    async (request, reply) => {
      const events = await prisma.event.findMany({
        select: {
          id: true,
          details: true,
          title: true,
          slug: true,
          maximumAttendees: true,
          _count: {
            select: {
              attendees: true,
            },
          },
        },
      });

      return reply.send({
        events: events.map((event) => {
          return {
            id: event.id,
            details: event.details,
            title: event.title,
            slug: event.slug,
            maximumAttendees: event.maximumAttendees,
            attendeesAmout: event._count.attendees,
          };
        }),
      });
    }
  );
}
