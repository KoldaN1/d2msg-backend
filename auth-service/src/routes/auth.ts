import { FastifyInstance } from "fastify";
import { registerUser, loginUser } from "../handlers/auth";
import { zodValidate } from "../middlewares/zodValidate";
import { Auth } from "@d2msg/schemas";

export const authRoutes = async (app: FastifyInstance) => {
  app.post("/register", { preHandler: [zodValidate(Auth.registerInputSchema)] }, registerUser);
  app.post("/login", { preHandler: [zodValidate(Auth.loginInputSchema)] }, loginUser);
};
