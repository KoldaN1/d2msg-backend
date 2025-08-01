import { createFastify } from "./server/fastify";
import { config } from "./config";
import { logger } from "./utils/logger";
// import { prisma } from "./utils/prisma";
import { closeRabbit, initRabbit } from "./server/rabbit";

export const startApp = async () => {
  const fastify = createFastify();

  try {
    // await prisma.$connect();
    logger.info("🔗 Prisma database running");

    await initRabbit();
    logger.info("🐰 Connected to RabbitMQ");

    await fastify.listen({ port: config.port, host: config.host });
    logger.info(`🚀 Auth-service running on http://localhost:${config.port}`);

    const shutdown = async () => {
      logger.info("💥 Shutting down Auth-service...");
      await fastify.close();
      // await prisma.$disconnect();
      await closeRabbit();
      process.exit(0);
    };

    process.on("SIGINT", shutdown);
    process.on("SIGTERM", shutdown);
  } catch (err) {
    logger.error(err);
    process.exit(1);
  }
};
