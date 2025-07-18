import Fastify from "fastify";
import helmet from "@fastify/helmet";
import { config } from "../config";
import { logger } from "../utils/logger";
import { profileRoutes } from "../routes/profile";

export const createFastify = () => {
  const fastify = Fastify({ logger: config.isDev });

  fastify.register(helmet);
  fastify.register(profileRoutes, { prefix: "/api/profile" });

  fastify.setErrorHandler((error, request, reply) => {
    logger.error(`[${request.method} ${request.url}] - ${error.message}`);
    reply.status(500).send({ error: "Internal server error" });
  });

  return fastify;
};
