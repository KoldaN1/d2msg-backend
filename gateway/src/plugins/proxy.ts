import fp from "fastify-plugin";
import fastifyHttpProxy from "@fastify/http-proxy";
import { config } from "../config";

export const proxyPlugin = fp(async (fastify) => {
  fastify.register(fastifyHttpProxy, {
    upstream: config.AUTH_URL,
    prefix: "/api/auth",
    rewritePrefix: "/",
  });
});
