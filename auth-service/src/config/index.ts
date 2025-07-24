import dotenv from "dotenv";
dotenv.config();

export const config = {
  host: process.env.HOST || "localhost",
  port: parseInt(process.env.PORT || "3000", 10),
  jwtSecret: process.env.JWT_SECRET || "default_secret",
  isDev: process.env.NODE_ENV !== "production",
  rabbitUrl: process.env.RABBITMQ_URL || "amqp://localhost",
  databaseUrl: process.env.DATABASE_URL,
};
