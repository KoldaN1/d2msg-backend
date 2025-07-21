import bcrypt from "bcrypt";

export const hashPassword = async (plain: string): Promise<string> => {
  return await bcrypt.hash(plain, 10);
};

export const comparePasswords = async (plain: string, hash: string): Promise<boolean> => {
  return await bcrypt.compare(plain, hash);
};
