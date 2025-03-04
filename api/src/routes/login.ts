import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import z from "zod";
import { prisma } from "../lib/prisma";
import { BadRequest } from "./_errors/bad-request";
import bcrypt from "bcryptjs";
import { JwtPayload } from "../auth/jwt";

export async function login(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().post(
    "/login",
    {
      schema: {
        summary: "Authenticate user",
        tags: ["auth"],
        body: z.object({
          email: z.string().email(),
          password: z.string(),
        }),
        response: {
          200: z.object({
            token: z.string(),
          }),
        },
      },
    },
    async (request, reply) => {
      const { email, password } = request.body;

      const user = await prisma.user.findUnique({
        where: {
          email,
        },
      });

      if (!user) {
        throw new BadRequest("Invalid credentials.");
      }

      const passwordMatch = await bcrypt.compare(password, user.password);

      if (!passwordMatch) {
        throw new BadRequest("Invalid credentials.");
      }

      const payload: JwtPayload = {
        id: user.id,
        email: user.email,
        role: user.role,
      };

      const token = app.jwt.sign(payload);

      return { token };
    }
  );
}