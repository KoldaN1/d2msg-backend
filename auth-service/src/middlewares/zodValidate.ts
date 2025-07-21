import { ZodSchema, ZodError } from "zod";
import { FastifyReply, FastifyRequest } from "fastify";

export const zodValidate = (schema: ZodSchema) => {
  return (req: FastifyRequest, reply: FastifyReply, done: (err?: Error) => void) => {
    try {
      req.body = schema.parse(req.body);
      done();
    } catch (err: ZodError | any) {
      reply.status(400).send({
        error: "Validation failed",
        details: err.issues.map((issue: any) => ({
          message: issue.message,
          path: issue.path,
        })),
      });
    }
  };
};
