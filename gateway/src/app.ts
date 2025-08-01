import { createFastify } from "./server/fastify";
import { createSocketServer } from "./server/socket";
import { initRabbit, closeRabbit } from "./server/rabbit";
import { registerSocketHandlers } from "./sockets/socketHandler";
import { config } from "./config";
import { logger } from "./utils/logger";

export const startApp = async () => {
  const fastify = createFastify();
  const io = await createSocketServer(fastify.server);

  registerSocketHandlers(io);

  const shutdown = async () => {
    logger.info({
      type: "server",
      message: "💥 Shutting down Gateway...",
    });
    await fastify.close();
    await io.close();
    await closeRabbit();
    process.exit(0);
  };

  process.on("SIGINT", shutdown);
  process.on("SIGTERM", shutdown);

  try {
    await initRabbit();
    await fastify.listen({ port: config.port, host: config.host });
    logger.info({
      type: "server",
      message: `🚀 Gateway running on http://localhost:${config.port}`,
    });
  } catch (err) {
    logger.error(err);
    process.exit(1);
  }
};
