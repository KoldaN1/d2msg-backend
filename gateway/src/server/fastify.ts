import Fastify from "fastify";
import helmet from "@fastify/helmet";
import cors from "@fastify/cors";
import { config, corsOptions } from "../config";
import { logger } from "../utils/logger";

export const createFastify = () => {
  const fastify = Fastify({ logger: config.isDev });

  fastify.register(helmet);
  fastify.register(cors, corsOptions);

  fastify.setErrorHandler((error, request, reply) => {
    logger.error(`[${request.method} ${request.url}] - ${error.message}`);
    reply.status(500).send({ error: "Internal server error" });
  });

  return fastify;
};
