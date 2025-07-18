import { FastifyRequest, FastifyReply } from "fastify";
import * as profileService from "../services/profile";
import { RegisterInput, LoginInput, UpdateInput } from "../schemas/profile";

export const registerUser = async (req: FastifyRequest, reply: FastifyReply) => {
  try {
    const { email, password, name } = req.body as RegisterInput;
    const user = await profileService.register(email, password, name);
    reply.code(201).send({ user });
  } catch (error) {
    reply.code(500).send({ error: error.message });
  }
};

export const loginUser = async (req: FastifyRequest, reply: FastifyReply) => {
  try {
    const { email, password } = req.body as LoginInput;
    const token = await profileService.login(email, password);
    reply.send({ token });
  } catch (error) {
    reply.code(401).send({ error: error.message });
  }
};

export const updateProfile = async (req: FastifyRequest, reply: FastifyReply) => {
  try {
    const updates = req.body as UpdateInput;
    const user = await profileService.update(req.user!.id, updates);
    reply.send({ user });
  } catch (error) {
    reply.code(500).send({ error: error.message });
  }
};
