import { Server } from "socket.io";
import type { FastifyInstance } from "fastify";
import { corsOptions, config } from "../config";
import { createClient } from "redis";
import { createAdapter } from "@socket.io/redis-adapter";

export const createSocketServer = async (server: FastifyInstance["server"]) => {
  const io = new Server(server, {
    cors: corsOptions,
  });

  const pubClient = createClient({ url: config.redisUrl });
  const subClient = pubClient.duplicate();

  await Promise.all([pubClient.connect(), subClient.connect()]);
  io.adapter(createAdapter(pubClient, subClient));

  return io;
};
