import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import { register } from "../utils/metrics";
import { config } from "../config";

export const metricsRoutes = async (app: FastifyInstance) => {
  app.get("/metrics", async (request: FastifyRequest, reply: FastifyReply) => {
    const authHeader = request.headers["authorization"];
    if (authHeader !== `Bearer ${config.metricsToken}`) {
      reply.status(401).send({ error: "Unauthorized" });
      return;
    }

    reply.type("text/plain");
    return register.metrics();
  });
};
