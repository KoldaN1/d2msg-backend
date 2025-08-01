import dotenv from "dotenv";
dotenv.config();

export const config = {
  name: process.env.NAME || "d2msg-auth",
  host: process.env.HOST || "localhost",
  port: parseInt(process.env.PORT || "3000", 10),
  jwtSecret: process.env.JWT_SECRET,
  isDev: process.env.NODE_ENV !== "production",
  rabbitUrl: process.env.RABBITMQ_URL || "amqp://localhost",
  databaseUrl: process.env.MONGO_URL,
  redisUrl: process.env.REDIS_URL || "redis://redis:6379",
};
