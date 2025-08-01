import { logger } from "../logger";
import { config } from "../../config";
import { FastifyInstance, FastifyRequest } from "fastify";
import { httpRequestCounter, httpRequestDuration } from "../metrics";

const getRoute = (request: FastifyRequest) => {
  return request.routeOptions?.url || request.url;
};

const observeMetrics = (method: string, route: string, statusCode: number, durationMs?: number) => {
  httpRequestCounter.inc({ method, route, status_code: statusCode });
  if (durationMs !== undefined) {
    httpRequestDuration.observe({ method, route, status_code: statusCode }, durationMs);
  }
};

export const registerRequestLogger = (fastify: FastifyInstance) => {
  // Log incoming requests
  fastify.addHook("onRequest", (request, _, done) => {
    if (config.isDev) {
      logger.info({
        type: "http",
        event: "incoming_request",
        method: request.method,
        url: request.url,
      });
    }

    done();
  });

  // Log response details
  fastify.addHook("onResponse", (request, reply, done) => {
    const rt = reply.elapsedTime;
    const route = getRoute(request);

    observeMetrics(request.method, route, reply.statusCode, rt);

    const logData = {
      type: "http",
      event: "response_sent",
      method: request.method,
      url: request.url,
      statusCode: reply.statusCode,
      responseTime: rt,
    };

    if (reply.statusCode >= 400 || rt > 1000) {
      logger.warn(logData);
    } else if (config.isDev) {
      logger.info(logData);
    }

    done();
  });

  // Handle errors
  fastify.setErrorHandler((error, request, reply) => {
    const rt = reply.elapsedTime;
    const statusCode = reply.statusCode >= 400 ? reply.statusCode : 500;
    const route = getRoute(request);

    observeMetrics(request.method, route, statusCode);

    logger.error({
      type: "http",
      event: "error",
      method: request.method,
      url: request.url,
      statusCode,
      message: error.message,
      stack: error.stack,
      responseTime: rt,
    });

    reply.status(statusCode).send({ error: "Internal server error" });
  });

  // Handle 404 Not Found
  fastify.setNotFoundHandler((request, response) => {
    const rt = response.elapsedTime;
    const route = getRoute(request);

    observeMetrics(request.method, route, 404, rt);

    logger.warn({
      type: "http",
      event: "not_found",
      method: request.method,
      url: request.url,
      statusCode: 404,
      responseTime: rt,
    });

    response.status(404).send({ error: "Not Found" });
  });
};
