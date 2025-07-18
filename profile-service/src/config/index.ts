import dotenv from "dotenv";
dotenv.config();

export const config = {
  port: parseInt(process.env.PORT || "3000", 10),
  jwtSecret: process.env.JWT_SECRET!,
  isDev: process.env.NODE_ENV !== "production",
  redisUrl: process.env.REDIS_URL || "redis://localhost:6379",
  rabbitUrl: process.env.RABBITMQ_URL || "amqp://localhost",
  databaseUrl: process.env.DATABASE_URL,
};
