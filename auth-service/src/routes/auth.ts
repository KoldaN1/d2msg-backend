import { FastifyInstance } from "fastify";
import { registerUser, loginUser } from "../handlers/auth";
import { zodValidate } from "../middlewares/zodValidate";
import { registerSchema, loginSchema } from "../schemas/auth";

export const authRoutes = async (app: FastifyInstance) => {
  app.post("/register", { preHandler: [zodValidate(registerSchema)] }, registerUser);
  app.post("/login", { preHandler: [zodValidate(loginSchema)] }, loginUser);
};
