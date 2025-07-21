import { prisma } from "../utils/prisma";

export const findUserByEmail = (email: string) => prisma.user.findUnique({ where: { email } });

export const createUser = (email: string, password: string, name?: string) => prisma.user.create({ data: { email, password, name } });
