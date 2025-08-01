import Fastify from "fastify";
import helmet from "@fastify/helmet";
import { config } from "../config";
import { logger } from "../utils/logger";
import { authRoutes } from "../routes/auth";
import { HttpError } from "../errors/httpErrors";

export const createFastify = () => {
  const fastify = Fastify({ logger: config.isDev });

  fastify.register(helmet);
  fastify.register(authRoutes);

  fastify.setErrorHandler((error, request, reply) => {
    logger.error(`[${request.method} ${request.url}] - ${error.message}`);
    if (error instanceof HttpError) {
      reply.status(error.statusCode).send({ error: error.message });
    } else {
      reply.status(500).send({ error: "Internal server error" });
    }
  });

  return fastify;
};
