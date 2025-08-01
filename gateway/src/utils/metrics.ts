import client from "prom-client";
import { config } from "../config";

export const register = new client.Registry();
register.setDefaultLabels({ app: config.name });

export const httpRequestCounter = new client.Counter({
  name: "http_requests_total",
  help: "Total number of HTTP requests",
  labelNames: ["method", "route", "status_code"],
});

export const httpRequestDuration = new client.Histogram({
  name: "http_request_duration_ms",
  help: "Duration of HTTP requests in ms",
  labelNames: ["method", "route", "status_code"],
  buckets: [50, 100, 300, 500, 1000, 3000],
});

export const activeWsConnections = new client.Gauge({
  name: "socket_io_active_connections",
  help: "Number of active WebSocket connections",
});

register.registerMetric(httpRequestCounter);
register.registerMetric(httpRequestDuration);
register.registerMetric(activeWsConnections);
