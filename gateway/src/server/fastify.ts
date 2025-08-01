import Fastify from "fastify";
import helmet from "@fastify/helmet";
import { config } from "../config";
import { registerRequestLogger } from "../utils/hooks/request-logger";
import { metricsRoutes } from "../routes/metricsRoutes";
import { proxyPlugin } from "../plugins/proxy";

export const createFastify = () => {
  const fastify = Fastify({ logger: config.isDev });

  fastify.register(helmet);
  fastify.register(metricsRoutes);
  fastify.register(proxyPlugin);

  registerRequestLogger(fastify);

  return fastify;
};
