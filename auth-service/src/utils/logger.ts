import winston from "winston";
import { config } from "../config";

export const logger = winston.createLogger({
  level: config.isDev ? "debug" : "info",
  format: config.isDev ? winston.format.combine(winston.format.colorize(), winston.format.simple()) : winston.format.json(),
  transports: [new winston.transports.Console(), ...(config.isDev ? [] : [new winston.transports.File({ filename: "combined.log" })])],
});
