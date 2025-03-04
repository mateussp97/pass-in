import fastifyCors from "@fastify/cors";
import fastifySwagger from "@fastify/swagger";
import fastifySwaggerUI from "@fastify/swagger-ui";
import fastify from "fastify";
import {
  jsonSchemaTransform,
  serializerCompiler,
  validatorCompiler,
} from "fastify-type-provider-zod";
import { errorHandler } from "./error-handler";
import { jwtAuth } from "./auth/jwt";
import { checkIn } from "./routes/check-in";
import { createEvent } from "./routes/create-event";
import { createUser } from "./routes/create-user";
import { getAttendeeBadge } from "./routes/get-attendee-badge";
import { getEvent } from "./routes/get-event";
import { getEventAttendees } from "./routes/get-event-attendees";
import { getEvents } from "./routes/get-events";
import { getUsers } from "./routes/get-users";
import { login } from "./routes/login";
import { registerForEvent } from "./routes/register-for-event";

const app = fastify();

app.register(fastifyCors, {
  origin: "*",
});

app.register(jwtAuth);

app.register(fastifySwagger, {
  swagger: {
    consumes: ["application/json"],
    produces: ["application/json"],
    info: {
      title: "pass.in",
      description:
        "Especificações da API para o back-end da aplicação pass.in construída durante o NLW Unite da Rocketseat.",
      version: "1.0.0",
    },
  },
  transform: jsonSchemaTransform,
});

app.register(fastifySwaggerUI, {
  routePrefix: "/docs",
});

app.setValidatorCompiler(validatorCompiler);
app.setSerializerCompiler(serializerCompiler);

// Event routes
app.register(createEvent);
app.register(registerForEvent);
app.register(getEvent);
app.register(getEvents);
app.register(getEventAttendees);
app.register(getAttendeeBadge);
app.register(checkIn);

// User and auth routes
app.register(createUser);
app.register(login);
app.register(getUsers);

app.setErrorHandler(errorHandler);

app
  .listen({ port: 3333, host: "0.0.0.0" })
  .then(() => console.log("HTTP server running!"));
