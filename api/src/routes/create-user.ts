import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import z from "zod";
import { prisma } from "../lib/prisma";
import { BadRequest } from "./_errors/bad-request";
import bcrypt from "bcryptjs";

export async function createUser(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().post(
    "/users",
    {
      schema: {
        summary: "Create a new user",
        tags: ["users"],
        body: z.object({
          name: z.string().min(3),
          email: z.string().email(),
          password: z.string().min(8),
          role: z.enum(["ADMIN", "VIEWER"]).optional().default("VIEWER"),
        }),
        response: {
          201: z.object({
            userId: z.string().uuid(),
          }),
        },
      },
    },
    async (request, reply) => {
      const { name, email, password, role } = request.body;

      const userWithSameEmail = await prisma.user.findUnique({
        where: {
          email,
        },
      });

      if (userWithSameEmail) {
        throw new BadRequest("User with same email already exists.");
      }

      const hashedPassword = await bcrypt.hash(password, 10);

      const user = await prisma.user.create({
        data: {
          name,
          email,
          password: hashedPassword,
          role,
        },
      });

      return reply.status(201).send({ userId: user.id });
    }
  );
}
