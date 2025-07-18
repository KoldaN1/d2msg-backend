import { FastifyInstance } from "fastify";
import { registerUser, loginUser, updateProfile } from "../handlers/profile";
import { zodValidate } from "../middlewares/zodValidate";
import { registerSchema, loginSchema, updateSchema } from "../schemas/profile";
import { checkAuth } from "../middlewares/checkAuth";

export const profileRoutes = async (app: FastifyInstance) => {
  app.post("/register", { preHandler: [zodValidate(registerSchema)] }, registerUser);
  app.post("/login", { preHandler: [zodValidate(loginSchema)] }, loginUser);
  app.put(
    "/me",
    {
      preHandler: [checkAuth, zodValidate(updateSchema)],
    },
    updateProfile
  );
};
