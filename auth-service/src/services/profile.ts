// import * as repo from "../repositories/auth";
import { hashPassword, comparePasswords } from "../utils/hash";
import { createJwt } from "../utils/jwt";
import { createHttpError } from "../errors/httpErrors";
import { DecodedToken } from "../types/fastify";

export const register = async (email: string, password: string, name?: string) => {
  // const exists = await repo.findUserByEmail(email);
  // if (exists) throw createHttpError(409, "User already exists");
  // const hashed = await hashPassword(password);
  // return await repo.createUser(email, hashed, name);
  console.log(1);
  return { test: "test" }; // Temporary return for testing
};

export const login = async (email: string, password: string) => {
  // const user = await repo.findUserByEmail(email);
  // if (!user || !(await comparePasswords(password, user.password))) {
  // throw createHttpError(401, "Invalid credentials");
  // }
  // return createJwt({ userId: user.id } as DecodedToken, "1h");
};
