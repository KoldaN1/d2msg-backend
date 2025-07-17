import dotenv from "dotenv";
dotenv.config();

export const config = {
  port: parseInt(process.env.PORT || "3000", 10),
  jwtSecret: process.env.JWT_SECRET!,
  rabbitUrl: process.env.RABBITMQ_URL!,
  isDev: process.env.NODE_ENV !== "production",
  clientUrl: process.env.CLIENT_URL || "http://localhost:3000",
  redisUrl: process.env.REDIS_URL || "redis://localhost:6379",
};

export const corsOptions = {
  origin: process.env.NODE_ENV === "development" ? "*" : process.env.CLIENT_URL,
  allowedHeaders: ["Content-Type", "Authorization"],
};
