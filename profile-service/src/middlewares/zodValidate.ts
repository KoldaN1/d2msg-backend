import { ZodSchema } from "zod";
import { FastifyReply, FastifyRequest } from "fastify";

export const zodValidate = (schema: ZodSchema) => {
  return (req: FastifyRequest, reply: FastifyReply, done: (err?: Error) => void) => {
    try {
      req.body = schema.parse(req.body);
      done();
    } catch (err: any) {
      reply.status(400).send({ error: err.errors });
    }
  };
};
