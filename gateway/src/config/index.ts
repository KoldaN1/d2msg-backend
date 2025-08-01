import dotenv from "dotenv";
dotenv.config();

export const config = {
  name: process.env.NAME || "d2msg-gateway",
  host: process.env.HOST || "localhost",
  port: parseInt(process.env.PORT || "3000", 10),
  jwtSecret: process.env.JWT_SECRET! || "default_secret",
  rabbitUrl: process.env.RABBITMQ_URL! || "amqp://localhost",
  isDev: process.env.NODE_ENV !== "production",
  clientUrl: process.env.CLIENT_URL || "http://localhost:3000",
  redisUrl: process.env.REDIS_URL || "redis://redis:6379",
  metricsToken: process.env.METRICS_TOKEN || "default_metrics_token",
  AUTH_URL: process.env.AUTH_URL || "http://auth-service:3001",
};
