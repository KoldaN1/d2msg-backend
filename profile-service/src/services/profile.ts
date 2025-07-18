import * as repo from "../repositories/profile";
import { hashPassword, comparePasswords } from "../utils/hash";
import { createJwt } from "../utils/jwt";
import { createHttpError } from "../errors/httpErrors";

export const register = async (email: string, password: string, name?: string) => {
  const exists = await repo.findUserByEmail(email);
  if (exists) throw createHttpError(409, "User already exists");

  const hashed = await hashPassword(password);
  return await repo.createUser(email, hashed, name);
};

export const login = async (email: string, password: string) => {
  const user = await repo.findUserByEmail(email);
  if (!user || !(await comparePasswords(password, user.password))) {
    throw createHttpError(401, "Invalid credentials");
  }
  return createJwt({ id: user.id, email: user.email });
};

export const update = async (userId: string, updates: any) => {
  return await repo.updateUser(userId, updates);
};
