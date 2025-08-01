import { createLogger, format, transports } from "winston";
import { config } from "../config";

export const logger = createLogger({
  level: config.isDev ? "debug" : "info",
  format: format.combine(format.timestamp(), format.json()),
  transports: [new transports.Console()],
});
