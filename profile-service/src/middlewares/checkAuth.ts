import { FastifyRequest, FastifyReply } from "fastify";
import { verifyToken } from "../utils/jwt";
import { createHttpError } from "../errors/httpErrors";

export const checkAuth = async (req: FastifyRequest, reply: FastifyReply): Promise<void> => {
  const authHeader = req.headers.authorization;
  if (!authHeader) throw createHttpError(401, "No token provided");

  const token = authHeader.split(" ")?.[1];
  if (!token) throw createHttpError(401, "No token provided");

  try {
    const user = verifyToken(token);
    req.user = user;
  } catch {
    throw createHttpError(401, "Invalid token");
  }
};
