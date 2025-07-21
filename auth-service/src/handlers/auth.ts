import { FastifyRequest, FastifyReply } from "fastify";
import * as profileService from "../services/profile";
import { RegisterInput, LoginInput } from "../schemas/auth";

export const registerUser = async (req: FastifyRequest, reply: FastifyReply) => {
  const { email, password, name } = req.body as RegisterInput;
  const user = await profileService.register(email, password, name);
  reply.code(201).send({ user });
};

export const loginUser = async (req: FastifyRequest, reply: FastifyReply) => {
  const { email, password } = req.body as LoginInput;
  const token = await profileService.login(email, password);
  reply.send({ token });
};
